import React, { useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';

const AboutImageEdit = (props) => {
    const id = props.id;
    const [success, setSuccess] = React.useState(false);
    const [image, setImage] = useState(null);
    const [sImage, setSImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('f_image', image);
        // console.log(formData);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/pmain/b_image/f_image/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data) {
                    setSuccess(true)
                }
            })
            .catch(error => {
                setSuccess(error);
            });
    }

    const handleSSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('s_image', sImage);
        // console.log(formData);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/pmain/b_image/s_image/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data) {
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
                    <p className="text-success m-0 fs-4">Edit Image</p>
                </div>
            </Modal.Header>

            <Modal.Body className="px-5">
                <Form className="py-5 border-top " onSubmit={handleSubmit}>
                    <Row xs={1}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={4}>
                                Top Image
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                            </Col>
                        </Form.Group>
                    </Row>
                    <div className="mt-4 text-end">
                        <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                        {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
                    </div>
                </Form>
                <Form className="pb-5  " onSubmit={handleSSubmit}>
                    <Row xs={1}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={4}>
                                Bottom Image
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="file" accept='image/*' onChange={(e) => setSImage(e.target.files[0])} />
                            </Col>
                        </Form.Group>
                    </Row>
                    <div className="mt-4 text-end">
                        <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                        {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
                    </div>
                </Form>
            </Modal.Body>
            {success ?
                <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert>
                : ''}
        </Modal>
    );
};

export default AboutImageEdit;