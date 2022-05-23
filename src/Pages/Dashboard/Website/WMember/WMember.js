import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, Image, Row, Button, Alert, Spinner, Modal } from 'react-bootstrap';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import WMemberAdd from './WMemberAdd/WMemberAdd';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import WMemberEdit from './WMemberEdit/WMemberEdit'
import { DataContext } from '../../../../contexts/DataContext';

const WMember = () => {

    const { isLoading, wMemberData, setWMember, wMFilteredData, setWMFilteredData } = useContext(DataContext);

    /* delete data */
    const deleteWmember = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/wmember/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        const remain = (wMemberData?.filter(Commerce => Commerce._id !== id))
                        setWMember(remain);
                        setWMFilteredData(remain);
                    }
                })
        }
    }

    const [showAlert, setShowAlert] = useState(false);

    const [modalEData, setModalEData] = React.useState('');


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // for edit modal
    const [showE, setShowE] = useState(false);
    const handleShowE = () => setShowE(true);
    const handleCloseE = () => setShowE(false);


    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1000)
    }

    useEffect(() => {
        handleClose();
        handleCloseE();

        return () => {
            handleShowAlert();
        }
    }, [wMemberData, wMFilteredData])


    // const [isLoading, setIsLoading] = React.useState(false);
    // const [modalShow, setModalShow] = React.useState(false);
    // const [modalEdit, setModalEdit] = React.useState(false);
    // const [modalId, setModalId] = React.useState(false);
    // const [member, setMember] = React.useState([]);
    // const [success, setSuccess] = React.useState(false);
    // const [warn, setWarn] = React.useState('');

    // React.useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/wmember`)
    //         .then((res) => {
    //             setMember(res.data)
    //             setIsLoading(true);
    //         })
    // }, [success, member?._id, warn]);

    // const handleDelete = id => {
    //     const proceed = window.confirm('Are you sure, you want to delete?');
    //     if (proceed) {
    //         axios.delete(`${process.env.REACT_APP_BASE_URL}/up/wmember/${id}`)
    //             .then((res) => {
    //                 // console.log(res);
    //                 if (res.data.affectedRows > 0) {
    //                     // setSuccess(true);
    //                 } else {
    //                     // setWarn(res.data);
    //                 }
    //             });
    //     }
    // };

    // spinner
    if (!isLoading) {
        return <div className="text-center 100vh pt-5">
            <Button variant="success" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>
        </div>
    }

    return (
        <Container>
            <div className="pb-5 text-end">
                <Button variant="success" onClick={() => handleShow()}><HiOutlinePlusCircle /> সংযুক্ত করুন</Button>

            </div>
            <Row xs={1} md={2} className="g-5 g-sm-5">
                {
                    wMemberData.map(dt =>
                        <Col key={dt?._id}>
                            <div className="bg-light">
                                <div className="p-3 border rounded d-flex justify-content-between">
                                    <p className="fs-5 mb-0">মেম্বার</p>
                                    <div>
                                        <FiEdit onClick={() => { handleShowE(); setModalEData(dt) }} /> <RiDeleteBinLine className="text-danger" onClick={() => deleteWmember(dt._id)} />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="d-flex flex-column flex-md-row">
                                        <div>
                                            <Image src={dt?.image} fluid style={{ width: '148px', height: '140px' }} />
                                        </div>
                                        <p className="ms-md-5">File name: image-321922-1593666104.jpg<br />
                                            File type: image/jpeg<br />
                                            Uploaded on: October 16, 2020<br />
                                            File size: 132 KB<br />
                                            Dimensions: 459 by 570 pixels
                                        </p>
                                    </div>
                                </div>
                                <Form className="p-5 border-top">
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Designation
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.desi} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Name
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.name} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Phone
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.phone} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Email
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.email} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Date of joining
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" defaultValue={dt?.doj?.slice(0, 10)} disabled />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    )
                }
            </Row>
            {/* {success && <Alert>Data Successfully Deleted</Alert>}
            {warn ? <Alert>{warn}</Alert> : ''} */}

            {/* add data */}
            <Modal className="overflow-auto" show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-3 fw-bold">মেম্বার</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <WMemberAdd />
                </Modal.Body>
            </Modal>

            {/* update data */}
            <Modal className="overflow-auto" show={showE} onHide={handleCloseE}
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
                    <WMemberEdit data={modalEData} />
                </Modal.Body>
            </Modal>

            <Alert className="alertCss" show={showAlert} variant="light">
                Member List Updated Successfully!
            </Alert>

        </Container>
    );
};

export default WMember;