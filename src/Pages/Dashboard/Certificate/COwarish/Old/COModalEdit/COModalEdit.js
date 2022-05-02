import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from 'react-hook-form';

function COModalEdit(props) {
    const id = props.id;
    const [success, setSuccess] = React.useState(false);
    const [warn, setWarn] = React.useState('');
    const [data, setData] = useState([]);
    const formRef = useRef();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/inheritance_certificate/${id}`)
            .then((data) => {
                setData(data.data);
                formRef?.current?.reset();
            })
    }, [id]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/up/inheritance_certificate/${id}`, (data))
            .then((res) => {
                // handle success
                if (res.data.affectedRows > 0) {
                    setSuccess(true)
                } else {
                    setWarn(res.data);
                }
            });
        // console.log(data)
    };

    if (success || warn) {
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
                    <p className="text-success m-0 fs-4">ওয়ারিশ সনদপত্র</p>
                    <p className="text-danger m-0">ওয়ার্ড নং {data?.word_no}</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5">
                <Form ref={formRef} className="py-5 border-top " onSubmit={handleSubmit(onSubmit)}>
                    <Row xs={1} lg={2} key={data?._id}>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                স্মারক নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.memorandum_no} {...register("memorandum_no")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                গ্রামঃ
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="text" defaultValue={data?.village} {...register("village")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                আবেদনকারীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.applicant_name} {...register("applicant_name")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                পোস্ট অফিসঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.post_office} {...register("post_office")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                পিতা/স্বামীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.guardian_name} {...register("guardian_name")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ওয়ার্ড নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.word_no} {...register("word_no")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                মাতার নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.mother_name} {...register("mother_name")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ইউপি সদস্যের নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.marital_status} {...register("marital_status")} />
                            </Col>
                        </Form.Group>
                    </Row>

                    <p className="fs-5 text-center pt-4">ওয়ারিশগন</p>
                    <Row xs={1} className="align-items-baseline justify-content-center">
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name1} {...register("name1")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation1} {...register("relation1")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>২।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name2} {...register("name2")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation2} {...register("relation2")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৩।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name3} {...register("name3")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation3} {...register("relation3")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৪।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name4} {...register("name4")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation4} {...register("relation4")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৫।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name5} {...register("name5")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation5} {...register("relation5")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৬।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name6} {...register("name6")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation6} {...register("relation6")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৭।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name7} {...register("name7")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation7} {...register("relation7")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৮।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name8}{...register("name8")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation8} {...register("relation8")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৯।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name9} {...register("name9")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation9} {...register("relation9")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১০।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name10} {...register("name10")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation10} {...register("relation10")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১১।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name11} {...register("name11")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation11} {...register("relation11")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১২।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name12} {...register("name12")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation12} {...register("relation12")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১৩।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name13} {...register("name13")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation13} {...register("relation13")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১৪।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name14} {...register("name14")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation14} {...register("relation14")} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১৫।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.name15} {...register("name15")} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.relation15} {...register("relation15")} />
                                </Col>
                            </Form.Group>
                        </div>
                        {/* <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                বৈবাহিক স্ট্যাটাসঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text"  {...register("marital_status")} />
                            </Col>
                        </Form.Group> */}
                        {/* <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                বৈবাহিক স্ট্যাটাসঃ
                            </Form.Label>
                            <Form.Select aria-label="Default select example" sm="8" onChange={(e) => setSelectValue(e.target.value)}>
                                <option>সিলেক্ট করুন</option>
                                <option value="বিবাহিত">বিবাহিত</option>
                                <option value="অবিবাহিত">অবিবাহিত</option>
                            </Form.Select>
                        </Form.Group> */}
                        {errors.exampleRequired && <span>This field is required</span>}
                    </Row>
                    <div className="mt-4 text-end">
                        <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                        {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
                    </div>
                </Form>
            </Modal.Body>
            {success ? <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert> : ''}
            {warn ? <Alert className="m-2 p-2 text-center">{warn}</Alert> : ''}
        </Modal>
    );
}

export default COModalEdit;