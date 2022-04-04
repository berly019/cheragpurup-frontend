import React, { useEffect, useState } from 'react';
import { Alert, Col, Form, Modal, Row } from "react-bootstrap";
import { RiDeleteBinLine } from 'react-icons/ri';
const axios = require('axios');

function TLModalShow(props) {
    const [success, setSuccess] = useState('');
    const [warn, setWarn] = useState('');
    const id = props.id;

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://hasadahoup-mongo-server.herokuapp.com/up/tread_license/${id}`)
            .then((data) => {
                setData(data.data);
                // console.log(data);
            })
    }, [id]);


    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`https://hasadahoup-mongo-server.herokuapp.com/up/tread_license/${id}`)
                .then((res) => {
                    if (res.data.affectedRows > 0) {
                        setSuccess(true);
                    } else {
                        setWarn(res.data);
                    }
                })
        }
    }

    if(success || warn) {
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
                <RiDeleteBinLine className="text-danger" onClick={() => handleDelete(data._id)} style={{ cursor: 'pointer' }} />
                {/* </Modal.Title> */}
            </Modal.Header>
            <Modal.Body className="px-5">
                <Form className="py-5 border-top ">
                    <Row xs={1} md={2}>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                লাইসেন্স নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.license_no} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                ব্যবসা প্রতিষ্ঠানের ঠিকানাঃ
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="text" defaultValue={data?.institute_address} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ব্যবসা প্রতিষ্ঠানের নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.institute_name} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ব্যবসার/পেশার মূলধনঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.profession_capital} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                লাইসেন্সধারীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.owner_name} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                লাইসেন্স ফি (+ভ্যাট)
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.license_fee} disabled />
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
                                বকেয়াঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.arrears} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                মাতার নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.mothers_name} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                সর্বমোটঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.total} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                ঠিকানাঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.address} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                কথায়ঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.in_words} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                ব্যবসার ধরনঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.business_type} disabled />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                            <Form.Label column sm="4">
                                মোবাইল নম্বরঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.mobile_no} disabled />
                            </Col>
                        </Form.Group>
                    </Row>
                </Form>
                {success ? <Alert className="m-2 p-2" variant='primary'>
                    Data has been deleted successfully</Alert>
                    : ""}
                {warn ? <Alert className="m-2 p-2" variant='primary'>
                    {warn}</Alert>
                    : ""}
            </Modal.Body>
            {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default TLModalShow;