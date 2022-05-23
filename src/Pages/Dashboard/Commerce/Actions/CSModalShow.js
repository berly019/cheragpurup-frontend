import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const CSModalShow = ({ modalData }) => {
    const id = modalData._id;
    const data = modalData;

    return (
        <Form className="py-5 border-top" key={id}>
            <Row xs={1} lg={2}>
                <Col>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            হোল্ডিং নংঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" defaultValue={data?.holding_no} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            কর দাতার নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.payer_name} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            পিতা/স্বামীর নামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.guardian_name} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            ব্যাবসা প্রতিষ্ঠানঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.business_org} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            ওয়ার্ড নং
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" defaultValue={data?.word_no} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            গ্রামঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.village} disabled />
                        </Col>
                    </Form.Group>

                </Col>
                <Col>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row"  >
                        <Form.Label column sm="4">
                            পূর্বের বকেয়া করঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" defaultValue={data?.previes_areas_tax} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4" lg="4">
                            ধার্যকৃত করঃ
                        </Form.Label>
                        <Col sm="8" lg="8">
                            <Form.Control type="number" defaultValue={data?.assign_tax} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            মোট করঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" defaultValue={data?.total_tax} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            আদায়কৃত করঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" defaultValue={data?.collected_tax} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            বকেয়া করঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" defaultValue={data?.areas_tax} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                        <Form.Label column sm="4">
                            মোবাইল নাম্বারঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control title="Type number without code 0" type="number" defaultValue={data?.mobile_no} disabled />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default CSModalShow;