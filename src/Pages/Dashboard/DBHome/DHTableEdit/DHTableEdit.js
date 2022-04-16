import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from 'react-hook-form';

function DHTableEdit(props) {
    const id = props.id;
    // console.log(id);
    const [success, setSuccess] = React.useState(false);
    const [data, setData] = useState([]);
    const formRef = useRef();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/db_home/${id}`)
            .then((data) => {
                setData(data.data);
                formRef?.current?.reset();
            })
    }, [id]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/up/db_home/${id}`, (data))
            .then((res) => {
                // handle success
                if (res.data._id) {
                    setSuccess(true)
                }
            });
        reset();
        // console.log(data)
    };

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
            <Modal.Header closeButton id="contained-modal-title-vcenter border-bottom" className="border-bottom">
                {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">৬ নং দুবলহাটি ইউনিয়ন পরিষদ</p>
                    <p className="text-danger m-0">ওয়ার্ড নং {data?.word_no}</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5 pt-0" key={data?._id}>
                <Form ref={formRef} className="py-5 overflow-auto" onSubmit={handleSubmit(onSubmit)}>
                    <Row xs={1} lg={2}>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                ওয়ার্ড নং
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.word_no} disabled />
                                {/* <Form.Control type="text" defaultValue={data?.word_no}  {...register("word_no")} /> */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                আবাসিক খানা সংখ্যা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.resident_thana}  {...register("resident_thana")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4" lg="4">
                                বাণিজ্যিক খানা সংখ্যা
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="text" defaultValue={data?.commerce_thana} {...register("commerce_thana")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                আবাসিক কর
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.resident_tax} {...register("resident_tax")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                বাণিজ্যিক কর
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.commerce_tax} {...register("commerce_tax")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
                            <Form.Label column sm="4">
                                আবাসিক আদায়কৃত কর
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" defaultValue={data?.resident_collected_tax} {...register("resident_collected_tax")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
                            <Form.Label column sm="4">
                                বাণিজ্যিক আদায়কৃত কর
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" defaultValue={data?.commerce_collected_tax} {...register("commerce_collected_tax")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
                            <Form.Label column sm="4">
                                আবাসিক বকেয়া কর
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" defaultValue={data?.resident_areas_tax} {...register("resident_areas_tax")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
                            <Form.Label column sm="4">
                                বাণিজ্যিক বকেয়া কর
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" defaultValue={data?.commerce_areas_tax} {...register("commerce_areas_tax")} />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                আবাসিক পুরুষ করদাতা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.resident_male} {...register("resident_male")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                বাণিজ্যিক পুরুষ করদাতা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.commerce_male} {...register("commerce_male")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                আবাসিক মহিলা করদাতা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.resident_female} {...register("resident_female")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                বাণিজ্যিক মহিলা করদাতা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.commerce_female} {...register("commerce_female")} />
                            </Col>
                        </Form.Group> */}
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                ট্রেড লাইসেন্স সংখ্যা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.tread_license} {...register("tread_license")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                চারিত্রিক সনদপত্র সংখ্যা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.character_certificate} {...register("character_certificate")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                নাগরিক সনদপত্র সংখ্যা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.citizen_certificate} {...register("citizen_certificate")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                ওয়ারিশ সনদপত্র সংখ্যা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.inheritance_certificate} {...register("inheritance_certificate")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                সর্বমোট
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.total} {...register("total")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                প্রতিবন্ধী
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.autism} {...register("autism")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                প্রবাসী
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.expatriate} {...register("expatriate")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                বিধবা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.widow} {...register("widow")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                ভিক্ষুক
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.beggar} {...register("beggar")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                            <Form.Label column sm="4">
                                মুক্তিযোদ্ধা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.freedom_fighters} {...register("freedom_fighters")} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center" >
                            <Form.Label column sm="4">
                                মোট জনসংখ্যা
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" defaultValue={data?.total_population} {...register("total_population")} />
                            </Col>
                        </Form.Group>
                    </Row>
                    {errors.exampleRequired && <span>This field is required</span>}
                    {success ?
                        <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert>
                        : ''}
                    <div className="text-end">
                        <Button type="submit" variant="danger" className='px-4' size="sm">আপডেট</Button>
                        {/* <Button type="reset" variant="outline" className="ms-4 border px-4" size="sm">Clear</Button> */}
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default DHTableEdit;