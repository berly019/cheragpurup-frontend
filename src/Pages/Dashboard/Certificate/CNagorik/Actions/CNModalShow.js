import React from 'react';
import {  Col, Form,  Row } from "react-bootstrap";

const CNModalShow = ({data}) => {

    return (
     
                <Form className="py-5 border-top ">
                    <Row xs={1} lg={2} key={data?._id}>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                স্মারক নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.memorandum_no} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                জাতীয় পরিচয়পত্র নংঃ
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="number" defaultValue={data?.nId_no} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                হোল্ডিং নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.holding_no} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                গ্রামঃ
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="text" defaultValue={data?.village} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                আবেদনকারীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.applicant_name} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                পোস্ট অফিসঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.post_office} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                পিতা/স্বামীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.guardian_name} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ওয়ার্ড নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.word_no} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                মাতার নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.mother_name} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                বৈবাহিক স্ট্যাটাসঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.marital_status} disabled />
                            </Col>
                        </Form.Group>
                    </Row>
                </Form>
           
    );
}

export default CNModalShow;