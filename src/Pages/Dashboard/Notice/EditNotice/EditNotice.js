// import axios from 'axios';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';

const CreateNotice = props => {
    const id = props.id;
    const [success, setSuccess] = React.useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);
    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subTitle);
        formData.append('desc', desc);
        formData.append('image', image);
        // console.log(formData);

        fetch(`https://hasadahoup-mongo-server.herokuapp.com/up/notice/${id}`, {
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
        axios.get(`https://hasadahoup-mongo-server.herokuapp.com/up/notice/${id}`)
            .then((data) => {
                setData(data.data);
                formRef?.current?.reset();
                // console.log(data.data[0]);
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
                    <p className="text-success m-0 fs-4">Edit Notice</p>
                </div>
            </Modal.Header>

            <Modal.Body className="px-5">
                <Row xs={1}>
                    <Form ref={formRef} onSubmit={handleSubmit} className="py-5 border-top">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" defaultValue={data?.title} onChange={(e) => setTitle(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Sub Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" defaultValue={data?.subtitle} onChange={(e) => setSubTitle(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Description
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" defaultValue={data?.desc} onChange={(e) => setDesc(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Upload File
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                            </Col>
                        </Form.Group>
                        <Col className="mt-4 text-end">
                            <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                        </Col>
                    </Form>
                </Row>
            </Modal.Body>
            {success ?
                <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert>
                : ''}
        </Modal>
    );
};

export default CreateNotice;