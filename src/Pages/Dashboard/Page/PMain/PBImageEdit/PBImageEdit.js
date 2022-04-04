import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

const CreateNotice = props => {
    const id = props.id;
    const [success, setSuccess] = React.useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        // console.log(formData);

        fetch(`https://hasadahoup-mongo-server.herokuapp.com/up/pbimage/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.affectedRows > 0) {
                    setSuccess(true)
                }
            })
            .catch(error => {
                setSuccess(error);
            });
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://hasadahoup-mongo-server.herokuapp.com/up/pbimage/${id}`)
            .then((data) => {
                setData(data.data[0]);
                formRef?.current?.reset();
                // console.log(data.data[0]);
            })
    }, [id]);

    if (success) {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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
                    <p className="text-success m-0 fs-4">Edit Image</p>
                </div>
            </Modal.Header>

            <Modal.Body className="px-5">
                <Container className="py-5 border-top ">
                    <Form ref={formRef} onSubmit={handleSubmit}>
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
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" defaultValue={data?.title} onChange={(e) => setTitle(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <div className="mt-4 text-end">
                            <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                            {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
                        </div>
                    </Form>
                </Container>
            </Modal.Body>
            {success ?
                <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert>
                : ''}
        </Modal>
    );
};

export default CreateNotice;