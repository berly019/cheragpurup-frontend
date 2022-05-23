import React, { useContext, useState } from 'react';
import { Button, Col, Form } from "react-bootstrap";
import { DataContext } from '../../../../../contexts/DataContext';

const EntrepreneurAdd = () => {

    const { addWEntrepreneur } = useContext(DataContext);

    const [desi, setDesi] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [doj, setDoj] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('desi', desi);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('doj', doj);
        formData.append('image', image);
        const token = JSON.parse(sessionStorage.getItem("user")).access_token;

        fetch(`${process.env.REACT_APP_BASE_URL}/up/entrepreneur`, {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData
        })
            .then(res => {
                res.json()
                if (res.status === 200) {
                    addWEntrepreneur(desi, name, phone, email, doj, image)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    return (

        <Form onSubmit={handleSubmit} className="py-5 border-top ">
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Designation
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" onChange={(e) => setDesi(e.target.value)} required />
                </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Name
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} required />
                </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Phone
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" onChange={(e) => setPhone(e.target.value)} required />
                </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Email
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Date of joining
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" onChange={(e) => setDoj(e.target.value)} />
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
                <Button className="ms-3" type="submit" variant="success">Save</Button>
            </Col>
        </Form>

    );
}
export default EntrepreneurAdd;