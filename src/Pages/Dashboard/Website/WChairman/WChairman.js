import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

const WChairman = () => {
    const [isDisabled, setDisabled] = React.useState(true);
    const [show, toggleShow] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [warn, setWarn] = React.useState("");
    const [id, setId] = React.useState("");
    // const token = JSON.parse(localStorage.getItem("user")).access_token;

    const handleEdit = () => {
        setDisabled(!isDisabled);
        toggleShow(!show)
    };

    // handle image loading
    const [image, setImage] = React.useState(null);
    const handleImageSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/up/wchairman/image/${id}`, {
            method: 'PUT',
            body: formData
        })
        let result = await response.json();
        if (result.result) {
            setSuccess(true);
        }
    }

    // handle data
    const [data, setData] = React.useState([]);
    // console.log(data);
    React.useEffect(() => {
        /*         axios.get("${process.env.REACT_APP_BASE_URL}/up/wchairman", {
                    headers: {
                        'token': token
                    }
                }) */
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/wchairman`)
            .then(res => {
                if (res.data.err) {
                    alert(res.data.err)
                } else {
                    setData(res.data[0]);
                    setId(res.data[0]?._id);
                }
            });
    }, [success, id, warn]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/up/wchairman/${id}`, data)
            .then(res => {
                if (res.data) {
                    setSuccess(true)
                } else {
                    setWarn(res.data);
                }
            })
    };

    // if(success){
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 1500);
    // }

    return (
        <Container className="bg-light">
            <Row className="p-3 border rounded">
                <Col>
                    <p className="fs-5 mb-0">চেয়ারম্যান</p>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleEdit}>
                        এডিট করুন
                    </Button>
                </Col>
            </Row>
            {success ? <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert> : ''}

            <Row className="p-3 flex-column flex-sm-row justify-content-center align-items-center">
                <Col className="text-center text-md-start">
                    <Image src={data?.image} fluid style={{ width: '177px', height: '167px' }} />
                </Col>
                <Col>
                    <p className="ms-md-5 mt-2">File name: image-321922-1593666104.jpg<br />
                        File type: image/jpeg<br />
                        Uploaded on: October 16, 2020<br />
                        File size: 132 KB<br />
                        Dimensions: 459 by 570 pixels
                    </p>
                </Col>
                <Col className="d-flex justify-content-end">
                    {show && <Form onSubmit={handleImageSubmit}>
                        <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])}  />
                        <Button type="submit">Update Image</Button>
                    </Form>}
                </Col>
            </Row>
            {warn ? <Alert>{warn}</Alert> : ""}
            <Form className="py-5 px-3 border-top" onSubmit={handleSubmit(onSubmit)}>
                <Row xs={1} md={2}>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextName">
                        <Form.Label column sm="4">
                            Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.name} disabled={isDisabled}  {...register("name")} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPhoneC">
                        <Form.Label column sm="4">
                            Phone Office
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.phone_o} disabled={isDisabled}  {...register("phone_o")} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPhone">
                        <Form.Label column sm="4">
                            Phone
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.phone} disabled={isDisabled}  {...register("phone")} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextDane">
                        <Form.Label column sm="4">
                            Date of joining
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.doj?.slice(0, 10)} disabled={isDisabled}  {...register("doj")} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Email
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.email} disabled={isDisabled}  {...register("email")} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextFax">
                        <Form.Label column sm="4">
                            Fax
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={data?.fax} disabled={isDisabled}  {...register("fax")} />
                        </Col>
                    </Form.Group>
                </Row>
                {errors.example && <span>This field is </span>}
                {show && <div className="text-end">
                    <Button variant="primary mt-5" type="submit">Save</Button>
                </div>}
            </Form>
        </Container>
    );
};

export default WChairman;