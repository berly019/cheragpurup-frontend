import React, { useEffect, useState } from 'react';
import { Alert, Col, Form, Modal, Row } from "react-bootstrap";
import { RiDeleteBinLine } from 'react-icons/ri';
const axios = require('axios');

const TLModalShow = ({ data }) => {
    const [success, setSuccess] = useState('');
    const [warn, setWarn] = useState('');
    const id = data._id;

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/tread_license/${id}`)
    //         .then((data) => {
    //             setData(data.data);
    //             // console.log(data);
    //         })
    // }, [id]);


    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/tread_license/${id}`)
                .then((res) => {
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

        <Form key={id} className="py-5 border-top ">
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
        // {success ? <Alert className="m-2 p-2" variant='primary'>
        //     Data has been deleted successfully</Alert>
        //     : ""}
        // {warn ? <Alert className="m-2 p-2" variant='primary'>
        //     {warn}</Alert>
        //     : ""}

    );
}

export default TLModalShow;