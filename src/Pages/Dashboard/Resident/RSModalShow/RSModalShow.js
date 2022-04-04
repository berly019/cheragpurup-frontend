import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Col, Form, Modal, Row } from "react-bootstrap";
import { RiDeleteBinLine } from 'react-icons/ri';

function RSModalShow(props) {
    const id = props.id;
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const formRef = useRef();

    useEffect(() => {
        setIsLoading(true)
        if (id) {
            fetch(`https://hasadahoup-mongo-server.herokuapp.com/resident/single/${id}`)
                .then(res => res.json())
                .then(data => {
                    formRef?.current?.reset();
                    formRef?.current?.focus();
                    // console.log(data)
                    if (data?.data) setData(data.data);
                })
        }
        setIsLoading(false)
    }, [id, data?._id, isLoading]);

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`https://hasadahoup-mongo-server.herokuapp.com/up/resident/${id}`)
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
                    <p className="text-success m-0 fs-4">আবাসিক করদাতা</p>
                    <p className="text-danger m-0">ওয়ার্ড নং {data?.word_no}</p>
                </div>
                <RiDeleteBinLine className="text-danger" onClick={() => handleDelete(data._id)} style={{ cursor: 'pointer' }} />
                {/* </Modal.Title> */}
            </Modal.Header>
            <Modal.Body>

                <Form ref={formRef} className="py-5 border-top" key={data?._id}>
                    <Row xs={1} md={2}>
                        <Col>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    হোল্ডিং নংঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.holding_no} disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    কর দাতার নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.payer_name} disabled />
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
                                    ওয়ার্ড নং
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.word_no} disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    গ্রামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.village} disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    মোবাইল নাম্বারঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.mobile_no} disabled />
                                </Col>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword" >
                                <Form.Label column sm="4">
                                    পূর্বের বকেয়া করঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.previes_areas_tax} disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4" lg="4">
                                    ধার্যকৃত করঃ
                                </Form.Label>
                                <Col sm="8" lg="8">
                                    <Form.Control type="text" defaultValue={data?.assign_tax} disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    মোট করঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.total_tax} disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    আদায়কৃত করঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.collected_tax} disabled />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    বকেয়া করঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" defaultValue={data?.areas_tax} disabled />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                {success ? <Alert className="m-2 p-2" variant='primary'>
                    Data has been deleted successfully</Alert>
                    : ''}
            </Modal.Body>
            {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

// function App() {
//     const [modalShow, setModalShow] = React.useState(false);

//     return (
//         <>
//             <Button variant="success" onClick={() => setModalShow(true)}>
//                 Launch vertically centered modal
//             </Button>

//             <MyVerticallyCenteredModal
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </>
//     );
// }

export default RSModalShow;