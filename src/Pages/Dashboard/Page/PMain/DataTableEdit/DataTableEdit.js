import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const DataTableEdit = (props) => {
    const id = props.id;
    const [success, setSuccess] = useState('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        axios.put(`https://khadimpur-mongoose-backend.herokuapp.com/up/data_table/${id}`, (data))
            .then((res) => {
                // handle success
                if (res.data) {
                    setSuccess(res.data)
                    // console.log(res)
                }
                // console.log(res);
            });
        reset();
        // console.log(data)
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`https://khadimpur-mongoose-backend.herokuapp.com/up/data_table/${id}`)
            .then((res) => setData(res.data))
    }, [id])

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
                    <p className="text-success m-0 fs-4">Update data</p>
                </div>
            </Modal.Header>
            <Modal.Body className="px-5">
                {/* <Form onSubmit={handleSubmit(onSubmit)} className="rounded-3 px-md-2 btn" className="py-5 border-top"> */}
                <Form onSubmit={handleSubmit(onSubmit)} className="py-5 border-top">
                    <Row xs={1} sm={2}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                ডাকঘর
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" defaultValue={data?.post_office} {...register("post_office")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                গ্রাম
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" defaultValue={data?.village}  {...register("village")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                মৌজা
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" defaultValue={data?.mouza}  {...register("mouza")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                হাট বাজার
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" defaultValue={data?.bazar} {...register("bazar")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                মসজিদ
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" defaultValue={data?.mosque}  {...register("mosque")} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                শিক্ষা প্রতিষ্ঠান
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" defaultValue={data?.edu_institute}  {...register("edu_institute")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                কবরস্থান
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" defaultValue={data?.grove}  {...register("grove")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                ঈদ্গাহ মাঠ
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" defaultValue={data?.eid_gah}  {...register("eid_gah")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={4}>
                                মন্দির শ্মশান
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" defaultValue={data?.mondir}  {...register("mondir")} />
                            </Col>
                        </Form.Group>
                        {errors.exampleRequired && <span>This field is required</span>}

                        <div className="mt-4 text-end">
                            <Button type="submit" variant="danger" className='px-4'>Save</Button>
                        </div>
                    </Row>
                </Form>

                {/* new fields */}
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                {/* new fields */}

            </Modal.Body>
            {
                success ?
                    <Alert className="m-2 p-2 text-center">{success}</Alert>
                    : ''
            }
        </Modal >
    );
};

export default DataTableEdit;