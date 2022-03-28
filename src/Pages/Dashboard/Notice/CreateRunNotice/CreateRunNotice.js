import axios from 'axios';
import React from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CreateRunNotice = props => {
    const [success, setSuccess] = React.useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data);
        axios.post('https://khadimpur-mongoose-backend.herokuapp.com/up/run_notice', data)
            .then(res => {
                // handle success
                // console.log(res);
                if (res.data.affectedRows > 0) {
                    setSuccess(true)
                    reset();
                }
            })
        setSuccess(false);
    }

    // const error = errors.title || errors.notice;
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
                    <p className="text-success m-0 fs-4">Create Run Notice</p>
                </div>
            </Modal.Header>
            <Modal.Body className="px-4">
                <Row xs={1}>
                    <Form onSubmit={handleSubmit(onSubmit)} className="py-5 border-top">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" {...register("title", { required: true })} />
                            </Col>
                        </Form.Group>
                        {errors.title && <span className="text-danger">This field is required</span>}
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Notice
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control as="textarea" type="text" {...register("notice", { required: true })} />
                            </Col>
                            {errors.notice && <span className="text-danger">This field is required</span>}
                        </Form.Group>

                        {/* {error && <span>This field is required</span>} */}

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

export default CreateRunNotice;