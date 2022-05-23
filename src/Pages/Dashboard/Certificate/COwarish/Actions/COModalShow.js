import React from 'react';
import { Col, Form, Row } from "react-bootstrap";

const COModalShow = ({ data }) => {

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
                        ইউপি সদস্যের নামঃ
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue={data?.marital_status} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name1} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation1} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name2} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation2} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name3} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation3} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name4} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation4} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name5} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation5} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name6} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation6} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name7} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation7} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name8} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation8} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name9} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation9} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name10} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation10} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name11} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation11} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name12} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation12} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name13} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation13} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name14} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation14} disabled />
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
                            <Form.Control type="text" defaultValue={data?.name15} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            সম্পর্কঃ
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.relation15} disabled />
                        </Col>
                    </Form.Group>
                </div>
            </Row>
        </Form>


    );
}

export default COModalShow;