// import axios from 'axios';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';

const PCModalEdit = props => {
    const [success, setSuccess] = React.useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const id = props.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('location', location);
        // console.log(formData);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/pcontact/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setSuccess(true)
                }
            })
            .catch(error => {
                setSuccess(error);
            });
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/pcontact/${id}`)
            .then((data) => {
                setData(data.data);
                // console.log(data.data[0]);
            })
    }, [id]);

    if (success) {
        setTimeout(() => { window.location.reload() }, 1500)
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
                    <p className="text-success m-0 fs-4">Update Contact Page</p>
                </div>
            </Modal.Header>
            {success ? <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert> :
                <Modal.Body className="px-5">
                    <Row xs={1}>
                        <Form onSubmit={handleSubmit} className="py-5 border-top">
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Upload Image
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={data?.name} onChange={(e) => setName(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Location
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={data?.location} onChange={(e) => setLocation(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Button style={{ float: 'right' }} variant="success" type="submit">Upload</Button>
                        </Form>
                    </Row>
                </Modal.Body>
            }
        </Modal>
    );
};

export default PCModalEdit;