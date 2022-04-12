import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

const WPanel = () => {
    const [isDisabled, setDisabled] = React.useState(true);
    const [show, toggleShow] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [warn, setWarn] = React.useState('');
    const [id, setId] = React.useState("");
    const handleEdit = () => {
        setDisabled(!isDisabled);
        toggleShow(!show)
    };

    // handle image loading
    const [image, setImage] = React.useState(null);
    const handleImageSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/wpanel/image/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setSuccess(true)
                } else {
                    setWarn(data.data);
                }
            })
            .catch(error => {
                setSuccess(error);
            });
    }

    // handle data
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/wpanel`)
            .then(res => {
                setData(res.data[0])
                setId(res.data[0]._id)
            });
    }, [success, id]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.put(`${process.env.REACT_APP_BASE_URL}/up/wpanel/${id}`, data)
            .then(res => {
                if (res.data.affectedRows > 0) {
                    setSuccess(true)
                } else {
                    setWarn(res.data);
                }
            })
    };

    return (
        <Container className="bg-light">
            <Row className="p-3 rounded border">
                <Col>
                    <p className="fs-5 mb-0">প্যানেল চেয়ারম্যান</p>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleEdit}>
                        এডিট করুন
                    </Button>
                </Col>
            </Row>
            {success ? <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert> : ''}
            {warn ? <Alert className="m-2 p-2 text-center">{warn}</Alert> : ''}

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

export default WPanel;