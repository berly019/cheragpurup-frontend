import React from 'react';
import { Button, Col, Form, Modal, Row, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
const axios = require('axios');

function CNModalAdd(props) {
    const [success, setSuccess] = React.useState(false);
    const [warn, setWarn] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [maritalStatus, setSelectValue] = React.useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    const onSubmit = data => {
        if (maritalStatus === null) {
            setStatus("বৈবাহিক স্ট্যাটাস Required!")
        } else {
            data.marital_status = maritalStatus;
            axios.post('https://hasadahoup-mongo-server.herokuapp.com/up/citizen_certificate', (data), {
                headers: { Authorization: 'Bearer ' + token }
            })
                .then((res) => {
                    // handle success
                    if (res.data.affectedRows > 0) {
                        setSuccess(true);
                    } else {
                        setWarn(res.data);
                    }
                });
            reset();
        }
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
                    <p className="text-success m-0 fs-4">নাগরিক সনদপত্র</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5">
                <Form className="py-5 border-top " onSubmit={handleSubmit(onSubmit)}>
                    <Row xs={1} lg={2}>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                স্মারক নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number"  {...register("memorandum_no", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                জাতীয় পরিচয়পত্র নংঃ
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="number"  {...register("nId_no")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                হোল্ডিং নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number"  {...register("holding_no", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                গ্রামঃ
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="text"  {...register("village", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                আবেদনকারীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("applicant_name", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                পোস্ট অফিসঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("post_office", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                পিতা/স্বামীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text"  {...register("guardian_name", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ওয়ার্ড নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" {...register("word_no", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                মাতার নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("mother_name", { required: true })} />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                বৈবাহিক স্ট্যাটাসঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text"  {...register("marital_status", { required: true })} />
                            </Col>
                        </Form.Group> */}
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                বৈবাহিক স্ট্যাটাসঃ
                            </Form.Label>
                            <Form.Select aria-label="Default select example" sm="8" onChange={(e) => setSelectValue(e.target.value)}>
                                <option>সিলেক্ট করুন</option>
                                <option value="বিবাহিত">বিবাহিত</option>
                                <option value="অবিবাহিত">অবিবাহিত</option>
                            </Form.Select>
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
            {status ? <Alert className="m-2 p-2 text-center">{status}</Alert> : ''}
            {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
        </Modal>
    );
}
export default CNModalAdd;