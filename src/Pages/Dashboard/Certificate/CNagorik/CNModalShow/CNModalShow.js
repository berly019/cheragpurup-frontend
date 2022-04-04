import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Col, Form, Modal, Row } from "react-bootstrap";
import { RiDeleteBinLine } from 'react-icons/ri';

function CNModalShow(props) {
    const [success, setSuccess] = useState(false);
    const [warn, setWarn] = useState('');
    const id = props.id;
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://hasadahoup-mongo-server.herokuapp.com/up/citizen_certificate/${id}`)
            .then((data) => {
                setData(data.data);
                // console.log(data);
            })
    }, [id]);

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`https://hasadahoup-mongo-server.herokuapp.com/up/citizen_certificate/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data.affectedRows > 0) {
                        setSuccess(true);
                    } else {
                        setWarn(res.data);
                    }
                })
        }
    }

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
                    <p className="text-success m-0 fs-4">নাগরিক সনদপত্র</p>
                    <p className="text-danger m-0">ওয়ার্ড নং {data?.word_no}</p>
                </div>
                <RiDeleteBinLine className="text-danger" onClick={() => handleDelete(data._id)} style={{ cursor: 'pointer' }} />
                {/* </Modal.Title> */}
            </Modal.Header>
            <Modal.Body className="px-5">
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
                {success ? <Alert className="m-2 p-2" variant='primary'>Data has been deleted successfully</Alert> : ''}
                {warn ? <Alert className="m-2 p-2" variant='primary'>{warn}</Alert> : ''}
            </Modal.Body>
            {/* <Modal.Footer style={{ border: "0" }}>
            <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
        </Modal.Footer> */}
        </Modal>
    );
}

export default CNModalShow;