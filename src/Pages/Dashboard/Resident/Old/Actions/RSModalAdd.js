import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
const axios = require('axios');

function RSModal(props) {
    const formRef = useRef();
    // formRef?.current?.reset();
    formRef?.current?.focus();
    // setTimeout(() => {
    // }, 1000);


    const [assignTax, setAssignTax] = useState('');
    const [pAreasTax, setPAreasTax] = useState('');
    const [totalTax, setTotalTax] = useState('')
    const [areasTax, setAreasTax] = useState('');
    const [collectedTax, setCollectedTax] = useState('');
    const [success, setSuccess] = React.useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = data => {
        data.sms = '';
        data.assign_tax = assignTax;
        data.total_tax = totalTax;
        data.areas_tax = areasTax;
        data.collected_tax = collectedTax;
        data.previes_areas_tax = pAreasTax;
        const token = JSON.parse(sessionStorage.getItem("user")).access_token;

        axios.post(`${process.env.REACT_APP_BASE_URL}/up/resident`, (data), {
            headers: { Authorization: 'Bearer ' + token }
        })
            .then((res) => {
                // console.log(res)
                // handle success
                if (res.data) {
                    setSuccess(true)
                }
            });
        reset();
    };

    useEffect(() => {
        const aTotalTax = Number(assignTax) + Number(pAreasTax);
        setTotalTax(aTotalTax);

        const areasTax = Number(aTotalTax) - Number(collectedTax);
        setAreasTax(areasTax);
    }, [assignTax, pAreasTax, collectedTax])

    // useEffect(() => {
    //     setSuccess(false);
    // }, []);

    if (success) {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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
                    <p className="text-success m-0 fs-4">?????????????????? ??????????????????</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5">
                <Form ref={formRef} className="py-5 border-top " onSubmit={handleSubmit(onSubmit)}>
                    <Row xs={1} md={2}>
                        <Col>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ????????????????????? ?????????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number"  {...register("holding_no", { required: true })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ?????? ??????????????? ????????????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("payer_name", { required: true })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ????????????/????????????????????? ????????????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text"  {...register("guardian_name", { required: true })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ?????????????????? ??????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" {...register("word_no", { required: true })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ??????????????????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("village", { required: true })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ?????????????????? ????????????????????????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" {...register("mobile_no", { required: false })} />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row"  >
                                <Form.Label column sm="4">
                                    ????????????????????? ??????????????? ?????????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" onBlur={(e) => setPAreasTax(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4" lg="4">
                                    ???????????????????????? ?????????
                                </Form.Label>
                                <Col sm="8" lg="8">
                                    <Form.Control type="number" onBlur={(e) => setAssignTax(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ????????? ?????????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" value={totalTax ? totalTax : 0} disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ????????????????????? ?????????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" onBlur={(e) => setCollectedTax(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                <Form.Label column sm="4">
                                    ??????????????? ?????????
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" value={areasTax ? areasTax : 0} disabled />
                                </Col>
                            </Form.Group>
                        </Col>
                        {errors.exampleRequired && <span>This field is required</span>}
                    </Row>
                    <div className="mt-4 text-end">
                        <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
                    </div>
                </Form>
                {success ?
                    <Alert className="m-2 p-2 text-center">?????????????????? ????????? ???????????? ???????????????????????? ???????????????????????? ??????????????????</Alert>
                    : ''}
            </Modal.Body>
            {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

// function App() {
//     const [modalShow, setModalShow] = React.useState(false);

//     return (
//         <>
//             <Button variant="success" onClick={() => setModalShow(true)}>
//                 Launch vertically centered modal
//             </Button>

//             <MyVerticallyCenteredModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </>
//     );
// }

export default RSModal;