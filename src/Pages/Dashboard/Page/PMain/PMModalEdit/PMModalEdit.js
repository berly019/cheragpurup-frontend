import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { DataContext } from '../../../../../contexts/DataContext';

const PMModalEdit = ({ data }) => {
    const id = data._id;

    const { updatePMain } = useContext(DataContext);


    // const [success, setSuccess] = React.useState(false);
    const [image, setImage] = useState(data?.image);
    const [name, setName] = useState(data?.name);
    const [location, setLocation] = useState(data?.location);
    const [title, setTitle] = useState(data?.title);
    const [description, setDesc] = useState(data?.description);
    const f_image = data?.f_image;
    const s_image = data?.s_image;

    const updatedData = { id, image, name, location, title, description, f_image, s_image }


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('title', title);
        formData.append('description', description);
        // console.log(formData);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/pmain/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(response => {
                response.json();
                if (response.status === 200) {
                    updatePMain(id, updatedData);
                }
            })
            .catch(error => {
                console.error(error);
            });

        // .then(res => {
        //     res.json()
        //     if (res.statusText === "OK") {
        //     }
        //     console.log(res)
        // })
        // .then(data => {
        //     if (data.affectedRows > 0) {
        //         setSuccess(true)
        //     }
        //     console.log(data)
        // })
        // .catch(error => {
        //     setSuccess(error);
        //     console.log(error);
        // });
    }

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/pmain/${id}`)
    //         .then((data) => {
    //             setData(data.data);
    //         })
    // }, [id]);

    // if (success) {
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 1500);
    // }
    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Upload Image
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                <Form.Label column sm={2}>
                    Name
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" defaultValue={data?.name} onChange={(e) => setName(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalDescription">
                <Form.Label column sm={2}>
                    Location
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" defaultValue={data?.location} onChange={(e) => setLocation(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalLocation">
                <Form.Label column sm={2}>
                    Title
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" defaultValue={data?.title} onChange={(e) => setTitle(e.target.value)} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
                <Form.Label column sm={2}>
                    Description
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" defaultValue={data?.description} onChange={(e) => setDesc(e.target.value)} />
                </Col>
            </Form.Group>
            <div className="mt-4 text-end">
                <Button variant="success" type="submit">Upload</Button>
            </div>
        </Form>

    );
};

export default PMModalEdit;