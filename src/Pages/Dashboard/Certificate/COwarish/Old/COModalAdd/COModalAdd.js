import React from 'react';
import { Button, Col, Form, Modal, Row, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
const axios = require('axios');

function COModalAdd(props) {
    const [success, setSuccess] = React.useState(false);
    const [warn, setWarn] = React.useState('');
    // const [maritalStatus, setSelectValue] = React.useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    const onSubmit = data => {
        // data.marital_status = maritalStatus;
        axios.post(`${process.env.REACT_APP_BASE_URL}/up/inheritance_certificate`, (data), {
            headers: { Authorization: 'Bearer ' + token }
        })
            .then((res) => {
                // handle success
                if (res.data.affectedRows > 0) {
                    setSuccess(true)
                } else {
                    setWarn(res.data);
                }
                // console.log(res);
            });
        reset();
    };

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
                    <p className="text-success m-0 fs-4">ওয়ারিশ সনদপত্র</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5">
                <Form className="py-5 border-top " onSubmit={handleSubmit(onSubmit)}>
                    <Row xs={1} lg={2}>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                স্মারক নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number"  {...register("memorandum_no", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                গ্রামঃ
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="text"  {...register("village", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                আবেদনকারীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("applicant_name", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ইউপি সদস্যের নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("marital_status", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                পোস্ট অফিসঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("post_office", { required: false })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                পিতা/স্বামীর নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text"  {...register("guardian_name", { required: false })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                ওয়ার্ড নংঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="number" {...register("word_no", { required: true })} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                মাতার নামঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" {...register("mother_name", { required: false })} />
                            </Col>
                        </Form.Group>
                    </Row>

                    <p className="fs-5 text-center pt-4">ওয়ারিশগন</p>
                    <Row xs={1} className="align-items-baseline justify-content-center">
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name1", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation1", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>২।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name2", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation2", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৩।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name3", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation3", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৪।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name4", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation4", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৫।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name5", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation5", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৬।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name6", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation6", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৭।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name7", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation7", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৮।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name8", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation8", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>৯।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name9", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation9", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১০।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name10", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation10", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১১।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name11", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation11", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১২।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name12", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation12", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১৩।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name13", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation13", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১৪।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name14", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation14", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="d-flex">
                            <Col className="mb-0" style={{ maxWidth: "50px" }}>১৫।</Col>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    নামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("name15", { required: false })} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 px-2 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    সম্পর্কঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" {...register("relation15", { required: false })} />
                                </Col>
                            </Form.Group>
                        </div>
                        {/* <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                বৈবাহিক স্ট্যাটাসঃ
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text"  {...register("marital_status", { required: true })} />
                            </Col>
                        </Form.Group> */}
                        {/* <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                বৈবাহিক স্ট্যাটাসঃ
                            </Form.Label>
                            <Form.Select aria-label="Default select example" sm="8" onChange={(e) => setSelectValue(e.target.value)}>
                                <option>সিলেক্ট করুন</option>
                                <option value="বিবাহিত">বিবাহিত</option>
                                <option value="অবিবাহিত">অবিবাহিত</option>
                            </Form.Select>
                        </Form.Group> */}
                        {errors.exampleRequired && <span>This field is required</span>}
                    </Row>
                    <div className="mt-4 text-end">
                        <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
                    </div>
                </Form>
            </Modal.Body>
            {success ? <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে সংরক্ষিত হয়েছে।</Alert> : ''}
            {warn ? <Alert className="m-2 p-2 text-center">{warn}</Alert> : ''}
            {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
        </Modal>
    );
}
export default COModalAdd;