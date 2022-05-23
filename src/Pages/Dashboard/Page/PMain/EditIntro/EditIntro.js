import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import EditSubIntro from './EditSubIntro/EditSubIntro';
import AddSubIntro from './EditSubIntro/AddSubIntro';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { GoDiffAdded } from 'react-icons/go';

const EditIntro = props => {
    const id = props.id;
    const formRef = useRef();

    const [editInto, setEditIntro] = useState(false);
    const [modalId, setModalId] = useState('');
    const [modalData, setModalData] = useState('');

    const [addInto, setAddIntro] = useState(false);
    const [modalAddId, setModalAddId] = useState('');

    const [success, setSuccess] = React.useState(false);
    const [title, setTitle] = useState('');
    // const [inputList, setInputList] = useState([{ serialNo: '', descText: '' },]);
    const [image, setImage] = useState(null);

    // const [title, setTitle] = useState('');
    // const [image, setImage] = useState(null);
    // // inputs
    // const [text1, setText1] = useState('');
    // const [text2, setText2] = useState('');
    // const [text3, setText3] = useState('');
    // const [text4, setText4] = useState('');
    // const [text5, setText5] = useState('');
    // const token = JSON.parse(sessionStorage.getItem("user")).access_token;

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', title);
        // formData.append('texts', JSON.stringify(inputList));
        formData.append('image', image);
        // inputs
        // formData.append('text1', text1);
        // formData.append('text2', text2);
        // formData.append('text3', text3);
        // formData.append('text4', text4);
        // formData.append('text5', text5);
        // console.log(formData, inputList);

        fetch(`${process.env.REACT_APP_BASE_URL}/up/intro/${id}`, {
            method: 'PUT',
            // headers: {
            //     'token': token
            // },
            body: formData
        })
            .then(res => {
                res.json()
                if (res.statusText === "OK") {
                    setSuccess(true)
                }
            })
            .catch(error => {
                setSuccess(error);
            });
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/intro/${id}`)
            .then((data) => {
                setData(data.data)
                formRef?.current?.reset();
            })
    }, [id])


    const [warn, setWarn] = useState(false);

    // delete texts
    const handleDelete = (subId) => {
        const proceed = window.confirm('Are you sure you want to Confirm?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/intro/${subId}/delete`)
                .then(res => {
                    // console.log(res);
                    if (res.data.data) {
                        setWarn(true)
                    }
                })
        }
    }


    if (success) {
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
    // const handleInputChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const list = [...inputList];
    //     list[index][name] = value;
    //     setInputList(list);
    // };

    // // handle click event of the Remove button
    // const handleRemoveClick = index => {
    //     const list = [...inputList];
    //     list.splice(index, 1);
    //     setInputList(list);
    // };

    // // handle click event of the Add button
    // const handleAddClick = () => {
    //     setInputList([...inputList, { serialNo: '', descText: '' }]);
    // };

    // get data
    // axios.get("${process.env.REACT_APP_BASE_URL}/up/intro")
    //     .then(data => console.log(data.data));

    // new input list
    // const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

    // if (success) {
    //     setTimeout(() => {
    //         window.location.reload();
    //     }, 1000);
    // }



    return (
        <Modal className="overflow-auto"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ top: '50px', height: '90vh' }} scrollable="true"
        >

            <EditSubIntro
                id={modalId}
                data={modalData}
                show={editInto}
                onHide={() => setEditIntro(false)}
            />

            <AddSubIntro
                id={modalAddId}
                show={addInto}
                onHide={() => setAddIntro(false)}
            />

            <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">Edit data</p>
                </div>
            </Modal.Header>
            <Modal.Body className="px-5">
                <Container className="py-5 border-top">
                    <Form ref={formRef} onSubmit={handleSubmit} key={data?._id}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" defaultValue={data?.title} onChange={(e) => setTitle(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-5" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Upload File
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
                            </Col>
                        </Form.Group>

                        {data?.texts?.map(txt =>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Serial No: {txt?.serialNo}
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="text" defaultValue={txt?.descText} disabled />
                                </Col>
                                <Col md={1} className="d-none d-md-block">
                                    <Button>
                                        <FiEdit onClick={() => { setEditIntro(true); setModalId(txt?._id); setModalData(txt) }} />
                                    </Button>
                                </Col>
                                <Col md={1} className="d-none d-md-block">
                                    <Button>
                                        <AiFillDelete onClick={() => { handleDelete(txt?._id) }} />
                                    </Button>
                                </Col>

                                <div className="d-md-none d-flex align-items-center justify-content-evenly my-2">
                                    <Button>
                                        <FiEdit onClick={() => { setEditIntro(true); setModalId(txt?._id); setModalData(txt) }} />
                                    </Button>
                                    <Button>
                                        <AiFillDelete onClick={() => { handleDelete(txt?._id) }} />
                                    </Button>
                                </div>
                            </Form.Group>
                        )}

                        <Button>
                            <GoDiffAdded onClick={() => { setAddIntro(true); setModalAddId(data?._id) }} />
                        </Button>
                        {/* 
                        < p className="fs-5 pt-3">Add new</p>
                        {inputList.map((x, i) => {
                            return (
                                <Row className="d-flex">
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                        <Form.Label column sm={2} md={2}>
                                            Serial No
                                        </Form.Label>
                                        <Col sm={10} md={4}>
                                            <Form.Control name="serialNo" type="text" value={x.serialNo} onChange={(e) => handleInputChange(e, i)} required={true} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                        <Form.Label column sm={2} md={2}>
                                            Text
                                        </Form.Label>
                                        <Col sm={10}>
                                            <Form.Control name="descText" type="text" value={x.descText} onChange={(e) => handleInputChange(e, i)} required={true} />
                                        </Col>
                                    </Form.Group>
                                    <Stack direction="horizontal" gap={3} className="mb-3">
                                        {inputList.length !== 1 && <Button
                                            variant="danger"
                                            className="mr-5"
                                            onClick={() => handleRemoveClick(i)}
                                            size="sm">Remove</Button>}
                                        {inputList.length - 1 === i && <Button
                                            variant="success"
                                            onClick={handleAddClick}
                                            size="sm">Add</Button>}
                                    </Stack>
                                </Row>
                            );
                        })} */}


                        <div className="mt-4 text-end">
                            <Button type="submit" variant="danger" className='px-4'>Save</Button>
                        </div>
                    </Form>

                    {/* new fields */}
                    {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                    {/* new fields */}

                </Container>
            </Modal.Body>
            {
                warn ?
                    <Alert className="m-2 p-2 text-center">"Data removed"</Alert>
                    : ''
            }
            {
                success ?
                    <Alert className="m-2 p-2 text-center">ডাটাটি সফল ভাবে ডাটাবেজে আপডেট হয়েছে।</Alert>
                    : ''
            }
        </Modal >
    );
};

export default EditIntro;