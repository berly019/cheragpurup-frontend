import React, { useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';

const CreateNotice = props => {
    const [success, setSuccess] = React.useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);
    // const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subTitle);
        formData.append('desc', desc);
        formData.append('image', image);
        // console.log(formData);

        fetch('https://khadimpur-mongoose-backend.herokuapp.com/up/notice', {
            method: 'POST',
            headers: {},
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
                    <p className="text-success m-0 fs-4">Create Notice</p>
                </div>
            </Modal.Header>
            <Modal.Body className="px-5">
                <Row xs={1}>
                    <Form onSubmit={handleSubmit} key={success} className="py-5 border-top">
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
                                Sub Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" onChange={(e) => setSubTitle(e.target.value)} required />
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
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Upload File
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} required />
                            </Col>
                        </Form.Group>
                        <div className="mt-4 text-end">
                            <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
                        </div>
                    </Form>
                </Row>
            </Modal.Body>
            {success ?
                <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে সংরক্ষিত হয়েছে।</Alert>
                : ''}
        </Modal>
    );
};

export default CreateNotice;