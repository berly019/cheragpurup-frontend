import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

const CreateNotice = props => {
    const id = props.id;
    const [success, setSuccess] = React.useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('title', title);
        formData.append('description', description);
        // console.log(formData);

        fetch(`https://hasadahoup-mongo-server.herokuapp.com/up/pmain/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(response => {
                response.json();
                if (response.statusText === "OK") {
                    setSuccess(true);
                }
            })
            .then(data => {
                setSuccess(data);
            })
            .catch(error => {
                setSuccess(error);
            });

        // .then(res => {
        //     res.json()
        //     if (res.statusText === "OK") {
        //     }
        //     console.log(res)
        // })
        // .then(data => {
        //     if (data.affectedRows > 0) {
        //         setSuccess(true)
        //     }
        //     console.log(data)
        // })
        // .catch(error => {
        //     setSuccess(error);
        //     console.log(error);
        // });
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://hasadahoup-mongo-server.herokuapp.com/up/pmain/${id}`)
            .then((data) => {
                setData(data.data);
            })
    }, [id]);

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
                    <p className="text-success m-0 fs-4">Update Main Page</p>
                </div>
            </Modal.Header>
            {success ? <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert> :
                <Modal.Body className="px-5">
                    <Container className="py-5 border-top">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    Upload Image
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={data?.name} onChange={(e) => setName(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalDescription">
                                <Form.Label column sm={2}>
                                    Location
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={data?.location} onChange={(e) => setLocation(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalLocation">
                                <Form.Label column sm={2}>
                                    Title
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={data?.title} onChange={(e) => setTitle(e.target.value)} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
                                <Form.Label column sm={2}>
                                    Description
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text" defaultValue={data?.description} onChange={(e) => setDesc(e.target.value)} />
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