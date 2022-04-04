import axios from 'axios';
import React from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddSubIntro = (props) => {
    const subId = props.id;

    const [success, setSuccess] = React.useState(false);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        axios.put(`https://hasadahoup-mongo-server.herokuapp.com/up/intro/${subId}/add`, (data))
            .then((res) => {
                // handle success
                if (res) {
                    setSuccess(true)
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
                    <p className="text-success m-0 fs-4">Add Sub data</p>
                </div>
            </Modal.Header>
            <Modal.Body className="px-5">
                <Container className="py-5 border-top">
                    <Form onSubmit={handleSubmit(onSubmit)}>
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

export default AddSubIntro;