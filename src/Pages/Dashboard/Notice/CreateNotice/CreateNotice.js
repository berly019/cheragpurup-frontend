import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { DataContext } from '../../../../contexts/DataContext';

const CreateNotice = () => {

    const { addNotice } = useContext(DataContext);

    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);
    // const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('desc', desc);
        formData.append('image', image);
        // console.log(formData);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/notice`, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                res.json()
                if (res.statusText === 'OK') {
                    addNotice(title, subtitle, desc, image);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (

        <Row xs={1}>
            <Form onSubmit={handleSubmit} className="py-5 border-top">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Title
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Sub Title
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" onChange={(e) => setSubTitle(e.target.value)} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Description
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" onChange={(e) => setDesc(e.target.value)} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Upload File
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                    </Col>
                </Form.Group>
                <div className="mt-4 text-end">
                    <Button type="submit" variant="danger" className='px-4' size="sm">Save</Button>
                </div>
            </Form>
        </Row>

    );
};

export default CreateNotice;