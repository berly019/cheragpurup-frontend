// import axios from 'axios';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Image, Modal, Row } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';

const ShowNotice = props => {
    const id = props.id;
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/notice/${id}`)
            .then((data) => {
                setData(data.data);
                // console.log(data.data[0]);
            })
    }, [id]);

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
                    <p className="text-success m-0 fs-4">Show Notice</p>
                </div>
            </Modal.Header>
            <Modal.Body className="px-5">
                <Container className="border-top py-5">
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Title
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" defaultValue={data?.title} disabled />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Sub Title
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" defaultValue={data?.subtitle} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Description
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" defaultValue={data?.desc} disabled />
                        </Col>
                    </Form.Group>
                    <Image fluid src={data?.image} />
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default ShowNotice;