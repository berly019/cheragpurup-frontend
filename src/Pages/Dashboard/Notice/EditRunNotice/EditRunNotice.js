import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const EditRunNotice = props => {
    const id = props.id;
    const componentRef = useRef();

    const [success, setSuccess] = React.useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        axios.put(`https://khadimpur-mongoose-backend.herokuapp.com/up/run_notice/${id}`, data)
            .then(res => {
                // handle success
                if (res.data) {
                    setSuccess(true)
                    reset();
                }
            })
        // setSuccess(false);
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://khadimpur-mongoose-backend.herokuapp.com/up/run_notice/${id}`)
            .then(result => {
                setData(result.data)
                componentRef?.current?.reset();
            })
    }, [id])

    if (success) {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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
                    <p className="text-success m-0 fs-4">Update Run Notice</p>
                </div>
            </Modal.Header>
            <Modal.Body className="px-5">
                <Row xs={1}>
                    <Form ref={componentRef} onSubmit={handleSubmit(onSubmit)} key={data?._id} className="py-5 border-top">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" defaultValue={data?.title} {...register("title")} />
                            </Col>
                        </Form.Group>
                        {errors.title && <span className="text-danger">This field is </span>}
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Notice
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control as="textarea" defaultValue={data?.notice} type="text" {...register("notice")} />
                            </Col>
                            {errors.notice && <span className="text-danger">This field is </span>}
                        </Form.Group>

                        {/* {error && <span>This field is </span>} */}

                        <div className="mt-4 text-end">
                            <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
                        </div>
                    </Form>
                </Row>
            </Modal.Body>
            {success ?
                <Alert className="m-2 p-2 text-center">Updated Successfully</Alert>
                : ''}
        </Modal>
    );
};

export default EditRunNotice;