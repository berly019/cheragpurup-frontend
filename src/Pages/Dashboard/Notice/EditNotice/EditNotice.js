import React, { useState, useRef, useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { DataContext } from '../../../../contexts/DataContext';

const EditNotice = ({ data }) => {
    const id = data._id;

    const { updateNotice } = useContext(DataContext);

    const [title, setTitle] = useState(data?.title);
    const [subtitle, setSubTitle] = useState(data?.subtitle);
    const [desc, setDesc] = useState(data?.desc);
    const [image, setImage] = useState(data?.image);

    const formRef = useRef();

    const updatedNotice = { id, title, subtitle, desc, image };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('desc', desc);
        formData.append('image', image);
        // console.log(formData);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/notice/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => {
                res.json()
                // console.log(res)
                if (res.statusText === 'OK') {
                    updateNotice(id, updatedNotice)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/notice/${id}`)
    //         .then((data) => {
    //             setData(data.data);
    //             formRef?.current?.reset();
    //             // console.log(data.data[0]);
    //         })
    // }, [id]);

    return (

        <Row xs={1}>
            <Form ref={formRef} onSubmit={handleSubmit} className="py-5 border-top">
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Title
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" defaultValue={data?.title} onChange={(e) => setTitle(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Sub Title
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" defaultValue={data?.subtitle} onChange={(e) => setSubTitle(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Description
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" defaultValue={data?.desc} onChange={(e) => setDesc(e.target.value)} />
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
                <Col className="mt-4 text-end">
                    <Button type="submit" variant="danger" className='px-4' size="sm">Update</Button>
                </Col>
            </Form>
        </Row>

    );
};

export default EditNotice;