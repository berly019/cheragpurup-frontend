import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";

function WMemberEdit(props) {
    const id = props.id;
    const [success, setSuccess] = React.useState(false);
    const [desi, setDesi] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [doj, setDoj] = useState('');
    const [image, setImage] = useState(null);
    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('desi', desi);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('doj', doj);
        formData.append('image', image);
        // console.log(formData);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/wmember/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => {
                res.json()
                if (res.statusText === 'OK') {
                    setSuccess(true)
                }
            })
            .catch(error => {
                setSuccess(error);
            });
    };

    const [member, setMember] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/wmember/${id}`)
            .then((res) => {
                setMember(res.data)
                formRef?.current?.reset();
            })
    }, [id]);

    // useEffect(() => {
    //     setSuccess(false);
    // }, [id]);

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
            <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">আপডেট মেম্বার</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5">
                <Form ref={formRef} onSubmit={handleSubmit} className="py-5 border-top">
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Designation
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={member?.desi} onChange={(e) => setDesi(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={member?.name} onChange={(e) => setName(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Phone
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={member?.phone} onChange={(e) => setPhone(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Email
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={member?.email} onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Date of joining
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" defaultValue={member?.doj?.slice(0, 10)} onChange={(e) => setDoj(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Image
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                        </Col>
                    </Form.Group>
                    <Col className="text-end pt-3">
                        {/* <Button type='reset'>Clear</Button> */}
                        <Button className="ms-3" type="submit">Update</Button>
                    </Col>
                </Form>
            </Modal.Body>
            {success ?
                <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert>
                : ''}
        </Modal>
    );
}
export default WMemberEdit;