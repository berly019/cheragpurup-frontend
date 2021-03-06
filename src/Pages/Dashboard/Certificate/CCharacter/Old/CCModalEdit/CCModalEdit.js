import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from 'react-hook-form';

const CCModalEdit = (props) => {
    const id = props.id;
    const [success, setSuccess] = React.useState(false);
    const [warn, setWarn] = React.useState(false);
    const [maritalStatus, setSelectValue] = React.useState(null)
    const [data, setData] = useState([]);
    const formRef = useRef();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/character_certificate/${id}`)
            .then((data) => {
                setData(data.data);
                formRef?.current?.reset();
                // console.log(data);
            })
    }, [id]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.marital_status = maritalStatus;
        axios.put(`${process.env.REACT_APP_BASE_URL}/up/character_certificate/${id}`, (data))
            .then((res) => {
                // handle success
                if (res.data.affectedRows > 0) {
                    setSuccess(true)
                } else {
                    setWarn(res.data);
                }
            });
        // console.log(data)
    };

    // useEffect(() => {
    //     setSuccess(false);
    // }, [id]);

    if (success || warn) {
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
                {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">??????????????????????????? ?????????????????????</p>
                    <p className="text-danger m-0">?????????????????? ?????? {data?.word_no}</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5">
                <Form ref={formRef} className="py-5 border-top" onSubmit={handleSubmit(onSubmit)}>
                    <Row xs={1} lg={2} key={data?._id}>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ?????????????????? ?????????
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.memorandum_no} {...register("memorandum_no")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                ??????????????????
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="text" defaultValue={data?.village} {...register("village")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ?????????????????????????????? ????????????
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.applicant_name} {...register("applicant_name")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ??????????????? ???????????????
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.post_office} {...register("post_office")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ????????????/????????????????????? ????????????
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.guardian_name} {...register("guardian_name")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ?????????????????? ?????????
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" defaultValue={data?.word_no} {...register("word_no")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ??????????????? ????????????
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.mother_name} {...register("mother_name")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ????????????????????? ??????????????????????????????
                            </Form.Label>
                            <Form.Select aria-label="Default select example" sm="8" onChange={(e) => setSelectValue(e.target.value)}>
                                <option>????????????????????? ???????????? ({data?.marital_status})</option>
                                <option value="?????????????????????">?????????????????????</option>
                                <option value="????????????????????????">????????????????????????</option>
                            </Form.Select>
                        </Form.Group>
                        {errors.exampleRequired && <span>This field is required</span>}
                    </Row>
                    <div className="mt-4 text-end">
                        <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                        {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
                    </div>
                </Form>
            </Modal.Body>
            {success ? <Alert className="m-2 p-2 text-center">?????????????????? ????????? ???????????? ???????????????????????? ??????????????? ??????????????????</Alert> : ''}
            {warn ? <Alert className="m-2 p-2 text-center">{warn}</Alert> : ''}
        </Modal>
    );
}

export default CCModalEdit;