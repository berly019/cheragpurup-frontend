import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { DataContext } from '../../../../../contexts/DataContext';
// import { useForm } from 'react-hook-form';

const PRModalEdit = ({ data }) => {
    const id = data._id;

    const { updatePResident } = useContext(DataContext);

    const [image, setImage] = useState(data?.image);
    const [name, setName] = useState(data?.name);
    const [location, setLocation] = useState(data?.location);

    const updatedPR = { id, name, location, image };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('location', location);
        // console.log(formData);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/president/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => {
                res.json()
                // console.log(res)
                if (res.statusText === 'OK') {
                    updatePResident(id, updatedPR);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/president/${id}`)
    //         .then((data) => {
    //             setData(data.data);
    //             // console.log(data.data[0]);
    //         })
    // }, [id]);

    // if (success) {
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 1500);
    // }

    return (

        <Container className="py-5 border-top">
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Upload Image
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Location
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" defaultValue={location} onChange={(e) => setLocation(e.target.value)} />
                    </Col>
                </Form.Group>
                <div className="mt-4 text-end">
                    <Button variant="success" type="submit">Upload</Button>
                </div>
            </Form>
        </Container>

    );
};

export default PRModalEdit;