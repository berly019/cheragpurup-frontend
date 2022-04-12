import React, { useState } from 'react';
import { Button, Col, Form, Modal, Alert } from "react-bootstrap";

function EntrepreneurAdd(props) {
    const [success, setSuccess] = React.useState(false);
    const [desi, setDesi] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [doj, setDoj] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('desi', desi);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('doj', doj);
        formData.append('image', image);
        const token = JSON.parse(sessionStorage.getItem("user")).access_token;

        fetch(`${process.env.REACT_APP_BASE_URL}/up/entrepreneur`, {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.affectedRows > 0) {
                    setSuccess(true)
                }
                // do something with data
            })
            .catch(error => {
                setSuccess(error);
            });
    }

    if(success){
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
                    <p className="text-success m-0 fs-3 fw-bold">উদ্যোক্তা</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>
            {
                success ?
                    <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে সংরক্ষিত হয়েছে।</Alert>
                    :
                    <Modal.Body className="px-5">
                        <Form onSubmit={handleSubmit} className="py-5 border-top ">
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Designation
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" onChange={(e) => setDesi(e.target.value)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Name
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Phone
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" onChange={(e) => setPhone(e.target.value)} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Email
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Date of joining
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" onChange={(e) => setDoj(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    Image
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                                </Col>
                            </Form.Group>
                            <Col className="text-end pt-3">
                                <Button className="ms-3" type="submit">Save</Button>
                            </Col>
                        </Form>
                    </Modal.Body>
            }
        </Modal>
    );
}
export default EntrepreneurAdd;