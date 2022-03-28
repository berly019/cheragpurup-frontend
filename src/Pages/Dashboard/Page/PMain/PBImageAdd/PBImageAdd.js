// import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';

const CreateNotice = props => {
    const [success, setSuccess] = React.useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        const token = JSON.parse(sessionStorage.getItem("user")).access_token;

        fetch('https://khadimpur-mongoose-backend.herokuapp.com/up/pbimage', {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data._id) {
                    setSuccess(true)
                }
            })
            .catch(error => {
                setSuccess(error);
            });
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
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">New Create Image</p>
                </div>
            </Modal.Header>
            {success ? <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে সংরক্ষিত হয়েছে।</Alert> :
                <Modal.Body className="px-5">
                    <Container className="border-top py-5">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                <Form.Label column sm={3}>
                                    Upload Image
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={3}>
                                    Title
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} required />
                                </Col>
                            </Form.Group>
                            <div className="mt-4 text-end">
                                <Button variant="success" type="submit">Upload</Button>
                            </div>
                        </Form>
                    </Container>
                </Modal.Body>
            }
        </Modal>
    );
};

export default CreateNotice;