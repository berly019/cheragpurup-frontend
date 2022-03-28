import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
const axios = require('axios');

function TLModalEdit(props) {
    const id = props.id;
    const [success, setSuccess] = React.useState(false);
    const [warn, setWarn] = React.useState(false);
    const [data, setData] = useState([]);
    const formRef = useRef();

    useEffect(() => {
        axios.get(`https://khadimpur-mongoose-backend.herokuapp.com/up/tread_license/${id}`)
            .then((data) => {
                setData(data.data);
                formRef?.current?.reset();
                // console.log(data);
            })
    }, [id]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.put(`https://khadimpur-mongoose-backend.herokuapp.com/up/tread_license/${id}`, (data))
            .then((res) => {
                // handle success
                if (res.data.affectedRows > 0) {
                    setSuccess(true);
                } else {
                    setWarn(res.data);
                }
            });
        // console.log(data)
    };

    useEffect(() => {
        setSuccess(false);
    }, [id]);

    if (success || warn) {
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
                    <p className="text-success m-0 fs-4">ট্রেড লাইসেন্স</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5">
                <Form ref={formRef} className="py-5 border-top " onSubmit={handleSubmit(onSubmit)}>
                    <Row xs={1} md={2}>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                লাইসেন্স নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.license_no} {...register("license_no")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                ব্যবসা প্রতিষ্ঠানের ঠিকানাঃ
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="text" defaultValue={data?.institute_address} {...register("institute_address")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ব্যবসা প্রতিষ্ঠানের নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.institute_name} {...register("institute_name")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ব্যবসার/পেশার মূলধনঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.profession_capital} {...register("profession_capital")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                লাইসেন্সধারীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.owner_name} {...register("owner_name")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                লাইসেন্স ফি (+ভ্যাট)
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.license_fee} {...register("license_fee")} />
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
                                বকেয়াঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.arrears} {...register("arrears")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                মাতার নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.mothers_name} {...register("mothers_name")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                সর্বমোটঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.total} {...register("total")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                ঠিকানাঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.address} {...register("address")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                কথায়ঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.in_words} {...register("in_words")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                ব্যবসার ধরনঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.business_type} {...register("business_type")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                মোবাইল নম্বরঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.mobile_no} {...register("mobile_no")} />
                            </Col>
                        </Form.Group>
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
            {warn ?
                <Alert className="m-2 p-2 text-center">{warn}</Alert>
                : ''}
        </Modal>
    );
}

export default TLModalEdit;