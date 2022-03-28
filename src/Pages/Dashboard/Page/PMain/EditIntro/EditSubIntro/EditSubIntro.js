import axios from 'axios';
import React, { useRef } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const EditSubIntro = (props) => {
    const subId = props.id;
    // console.log(id);
    const formRef = useRef();
    const [success, setSuccess] = React.useState('');

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        axios.put(`https://khadimpur-mongoose-backend.herokuapp.com/up/intro/${subId}/put`, (data))
            .then((res) => {
                // handle success
                if (res) {
                    setSuccess(res?.data)
                }
                // console.log(res);
            });
        reset();
        // console.log(data)
    };

    return (
        <Modal className="overflow-auto"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ top: '50px', height: '90vh' }} scrollable="true"
        >

            <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">Edit data</p>
                </div>
            </Modal.Header>
            <Modal.Body className="px-5">
                <Container className="py-5 border-top">
                    <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                                Serial No
                            </Form.Label>
                            <Col sm={5}>
                                <Form.Control type="text" {...register("serialNo")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                                Description
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" {...register("descText")} />
                            </Col>
                        </Form.Group>
                        <div className="mt-4 text-end">
                            <Button type="submit" variant="success" className='px-4'>Save</Button>
                        </div>
                    </Form>

                </Container>
            </Modal.Body>
            {
                success ?
                    <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert>
                    : ''
            }
        </Modal >
    );
};

export default EditSubIntro;