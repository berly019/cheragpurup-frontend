import React from 'react';
import { Button, Col, Form, Modal, Row, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
const axios = require('axios');

function TLModalAdd(props) {
    const [success, setSuccess] = React.useState(false);
    const [warn, setWarn] = React.useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    const onSubmit = data => {
        axios.post('https://khadimpur-mongoose-backend.herokuapp.com/up/tread_license', (data), {
            headers: { Authorization: 'Bearer ' + token }
        })
            .then((res) => {
                // handle success
                if (res.data.affectedRows > 0) {
                    setSuccess(true);
                } else {
                    setWarn(res.data);
                }
                // console.log(res);
            });
        reset();
    };

    if (success || warn) {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
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
                <Form className="py-5 border-top " onSubmit={handleSubmit(onSubmit)}>
                    <Row xs={1} md={2}>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                লাইসেন্স নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number"  {...register("license_no", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                ব্যবসা প্রতিষ্ঠানের ঠিকানাঃ
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="text"  {...register("institute_address", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ব্যবসা প্রতিষ্ঠানের নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("institute_name", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ব্যবসার/পেশার মূলধনঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" {...register("profession_capital", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                লাইসেন্সধারীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text"  {...register("owner_name", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                লাইসেন্স ফি (+ভ্যাট)
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" {...register("license_fee", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                পিতা/স্বামীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("guardian_name", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                বকেয়াঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number"  {...register("arrears", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                মাতার নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("mothers_name", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                সর্বমোটঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" {...register("total", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                ঠিকানাঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("address", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                কথায়ঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("in_words", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                ব্যবসার ধরনঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("business_type", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                মোবাইল নম্বরঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" {...register("mobile_no", { required: true })} />
                            </Col>
                        </Form.Group>
                        {errors.exampleRequired && <span>This field is required</span>}
                    </Row>
                    <div className="mt-4 text-end">
                        <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
                    </div>
                </Form>
            </Modal.Body>
            
            {success ? <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে সংরক্ষিত হয়েছে।</Alert> : ''}
            {warn ? <Alert className="m-2 p-2 text-center">{warn}</Alert> : ''}
            {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default TLModalAdd;