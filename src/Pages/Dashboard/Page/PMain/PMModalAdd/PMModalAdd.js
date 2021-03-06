// import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';

const PMModalAdd = props => {
    const [success, setSuccess] = React.useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('title', title);
        formData.append('desc', desc);
        // console.log(formData);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/pmain`, {
            method: 'POST',
            headers: {
                'token': token
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.affectedRows > 0) {
                    setSuccess(true)
                }
            })
            .catch(error => {
                setSuccess(error);
            });
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
                    <p className="text-success m-0 fs-4">New Create Notice</p>
                </div>
            </Modal.Header>
            {
                success ?
                    <Alert className="m-2 p-2 text-center">?????????????????? ????????? ???????????? ???????????????????????? ???????????????????????? ??????????????????</Alert>
                    :
                    <Modal.Body className="px-5">
                        <Container className="py-5 border-top">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Upload Image
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} required />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Name
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" onChange={(e) => setName(e.target.value)} required />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Location
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" onChange={(e) => setLocation(e.target.value)} required />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Title
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} required />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Description
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" onChange={(e) => setDesc(e.target.value)} required />
                                    </Col>
                                </Form.Group>
                                <Button style={{ float: 'right' }} variant="success" type="submit">Upload</Button>
                            </Form>
                        </Container>
                    </Modal.Body>
            }
        </Modal>
    );
};

export default PMModalAdd;