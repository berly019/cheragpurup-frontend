import React, { useState, useRef, useContext } from 'react';
import { Button, Col, Form } from "react-bootstrap";
import { DataContext } from '../../../../../contexts/DataContext';

const EntrepreneurEdit = ({ data }) => {
    const id = data._id;
    const { updateWEntrepreneur } = useContext(DataContext);

    const [desi, setDesi] = useState(data?.desi);
    const [name, setName] = useState(data?.name);
    const [phone, setPhone] = useState(data?.phone);
    const [email, setEmail] = useState(data?.email);
    const [doj, setDoj] = useState(data?.doj);
    const [image, setImage] = useState(null);
    const formRef = useRef();

    const updatedWE = { id, desi, name, phone, email, doj, image }

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

        fetch(`${process.env.REACT_APP_BASE_URL}/up/entrepreneur/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => {
                res.json()
                if (res.statusText === 'OK') {
                    updateWEntrepreneur(id, updatedWE);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (

        <Form ref={formRef} onSubmit={handleSubmit} className="py-5 border-top">
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Designation
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" defaultValue={desi} onChange={(e) => setDesi(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Name
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Phone
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Email
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                <Form.Label column sm="4">
                    Date of joining
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="text" defaultValue={doj?.slice(0, 10)} onChange={(e) => setDoj(e.target.value)} />
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

    );
}
export default EntrepreneurEdit;