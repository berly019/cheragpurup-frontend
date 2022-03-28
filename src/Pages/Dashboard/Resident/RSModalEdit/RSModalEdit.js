import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from 'react-hook-form';

function RSModalEdit(props) {
    const id = props.id;
    const [success, setSuccess] = React.useState(false);
    const [data, setData] = useState({});
    const formRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        if (id) {
            fetch(`https://khadimpur-mongoose-backend.herokuapp.com/resident/single/${id}`)
                .then(res => res.json())
                .then(data => {
                    formRef?.current?.reset();
                    formRef?.current?.focus();
                    console.log(data)
                    if (data?.data) setData(data.data);
                })
        }
        setIsLoading(false)
    }, [id, data?._id, isLoading, props?.number]);

    // console.log(data)
    const [assignTax, setAssignTax] = useState('');
    const [areasTax, setAreasTax] = useState('');
    const [pAreasTax, setPAreasTax] = useState('');
    // const [pPAreasTax, setPPAreasTax] = useState('');
    const [collectedTax, setCollectedTax] = useState('');
    const [totalTax, setTotalTax] = useState('');
    const [dTotalTax, setDTotalTax] = useState('');

    const db_assign = data?.assign_tax;
    const db_pAreas = data?.previes_areas_tax;
    // console.log({ assignTax: assignTax, areasTax: areasTax, pAreasTax: pAreasTax, collectedTax: collectedTax, totalTax: totalTax });

    // calculate
    useEffect(() => {
        const aTotalTax = (Number(assignTax ? assignTax : data?.assign_tax) + Number(pAreasTax ? pAreasTax : data?.previes_areas_tax));
        setTotalTax(aTotalTax);

        // console.log(aTotalTax);

        const areasTax = Number(totalTax) - Number(collectedTax ? collectedTax : data?.collected_tax);
        setAreasTax(areasTax);
        // console.log(areasTax);

        setDTotalTax(Number(assignTax ? assignTax : data?.assign_tax) + (Number(pAreasTax ? pAreasTax : data?.previes_areas_tax)))
        // const pPAreasTax = Number(data?.areas_tax);
        // setPPAreasTax(pPAreasTax);
    }, [assignTax, pAreasTax, collectedTax, totalTax, data?.previes_areas_tax, data?.assign_tax, areasTax, data?.collected_tax]);

    // const [dAssignTax, setDAssignTax] = useState('');
    // const [dPAreasTax, setDPAreasTax] = useState('');
    // const [dCollectedTax, setDCollectedTax] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        data.assign_tax = assignTax ? assignTax : db_assign;
        data.total_tax = dTotalTax;
        data.collected_tax = collectedTax;
        data.areas_tax = areasTax;
        data.previes_areas_tax = pAreasTax ? pAreasTax : db_pAreas;

        fetch(`https://khadimpur-mongoose-backend.herokuapp.com/resident/single/update/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setData(data?.data)
                setSuccess(true);
                reset();
            })

        // console.log(data)
    };

    // useEffect(() => {
    //     const aTotalTax = Number(assignTax) + Number(pAreasTax ? pAreasTax : data?.previes_areas_tax);
    //     setTotalTax(aTotalTax);

    //     const areasTax = Number(totalTax) - Number(collectedTax);
    //     setAreasTax(areasTax);
    // }, [assignTax, pAreasTax, totalTax, collectedTax, data?.previes_areas_tax])

    // useEffect(() => {
    //     setSuccess(false);
    // }, [id]);

    if (success) {
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    return (
        <Modal className="overflow-auto"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ top: '50px', height: '90vh' }} scrollable="true"
        >
            <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">আবাসিক করদাতা</p>
                    <p className="text-danger m-0">ওয়ার্ড নং {data?.word_no}</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5" >
                <Form ref={formRef} key={data?._id} className="py-5 border-top " onSubmit={handleSubmit(onSubmit)}>
                    <Row xs={1} md={2}>
                        <Col>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    হোল্ডিং নংঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" min="0" defaultValue={data?.holding_no} {...register("holding_no", { min: 0 })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    কর দাতার নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.payer_name} {...register("payer_name", { min: 0 })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    পিতা/স্বামীর নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.guardian_name} {...register("guardian_name", { min: 0 })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ওয়ার্ড নং
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" min="0" defaultValue={data?.word_no} {...register("word_no", { min: 0 })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    গ্রামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.village} {...register("village", { min: 0 })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    মোবাইল নাম্বারঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" min="0" defaultValue={data?.mobile_no} {...register("mobile_no", { min: 0 })} />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row">
                                <Form.Label column sm="4">
                                    পূর্বের বকেয়া করঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control title={data?.previes_areas_tax} type="number" min="0" defaultValue={data?.previes_areas_tax} onBlur={(e) => { setPAreasTax(e.target.value) }} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4" lg="4">
                                    ধার্যকৃত করঃ
                                </Form.Label>
                                <Col sm="8" lg="8">
                                    <Form.Control type="number" min="0" title={data?.assign_tax} defaultValue={data?.assign_tax} onBlur={(e) => { setAssignTax(e.target.value) }} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    মোট করঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" min="0" title={data?.total_tax} defaultValue={totalTax ? totalTax : data?.total_tax} disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    আদায়কৃত করঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" min="0" title={data?.collected_tax} defaultValue={data?.collected_tax} onBlur={(e) => { setCollectedTax(e.target.value) }} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    বকেয়া করঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" min="0" title={data?.areas_tax} defaultValue={areasTax ? areasTax : data?.areas_tax} disabled />
                                </Col>
                            </Form.Group>
                        </Col>
                        {errors.exampleRequired && <span>This field is required</span>}
                    </Row>
                    <div className="mt-4 text-end">
                        <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                        {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
                    </div>
                </Form>
            </Modal.Body>
            {success ?
                <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert>
                : ''}
        </Modal>
    );
}

// function App() {
//     const [modalShow, setModalShow] = React.useState(false);

//     return (
//         <>
//             <Button variant="success" 
// onClick={() => setModalShow(true)}>
//                 Launch vertically centered modal
//             </Button>

//             <MyVerticallyCenteredModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </>
//     );
// }

export default RSModalEdit;