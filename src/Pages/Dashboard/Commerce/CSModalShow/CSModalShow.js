import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Alert, Col, Form, Modal, Row } from "react-bootstrap";
import { RiDeleteBinLine } from 'react-icons/ri';

function CSModalShow(props) {
    const [success, setSuccess] = useState('');
    const id = props.id;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const formRef = useRef();

    useEffect(() => {
        setIsLoading(true)
        if (id) {
            fetch(`https://hasadahoup-mongo-server.herokuapp.com/commerce/single/${id}`)
                .then(res => res.json())
                .then(data => {
                    formRef?.current?.reset();
                    formRef?.current?.focus();
                    // console.log(data)
                    if (data?.data) setData(data.data);
                })
        }
        setIsLoading(false)
    }, [id, data?._id, isLoading, props?.number]);

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`https://hasadahoup-mongo-server.herokuapp.com/up/commerce/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        setSuccess(true);
                        // const remainingOrders = users.filter(user => user.id !== id);
                        // setUsers(remainingOrders);
                    }
                })
        }
    }

    if (success) {
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
                    <p className="text-success m-0 fs-4">বানিজ্যিক করদাতা</p>
                    <p className="text-danger m-0">ওয়ার্ড নং {data?.word_no}</p>
                </div>
                <RiDeleteBinLine className="text-danger" onClick={() => handleDelete(data._id)} style={{ cursor: 'pointer' }} />
                {/* </Modal.Title> */}
            </Modal.Header>
            <Modal.Body className="px-5">

                <Form className="py-5 border-top" key={data?._id}>
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
                    {success ? <Alert className="m-2 p-2" variant='primary'>
                        Data has been deleted successfully</Alert>
                        : ''}
                </Form>
            </Modal.Body>
            {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default CSModalShow;