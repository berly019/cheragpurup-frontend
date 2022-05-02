import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, Row, Spinner, Alert, Modal } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import PRModalEdit from './PRModalEdit/PRModalEdit';
import { DataContext } from '../../../../contexts/DataContext';

const PResident = () => {

    const { isLoading, pResidentData } = useContext(DataContext);

    const [showAlert, setShowAlert] = useState(false);

    const [modalEData, setModalEData] = React.useState('');

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
        handleCloseE();

        return () => {
            handleShowAlert();
        }
    }, [pResidentData])

    // // const [modalShow, setModalShow] = React.useState(false);
    // const [isLoading, setIsLoading] = React.useState(false);
    // const [modalEdit, setModalEdit] = React.useState(false);
    // const [modalId, setModalId] = React.useState('');
    // // const [success, setSuccess] = React.useState(false);
    // const [data, setData] = React.useState([]);
    // React.useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/president`)
    //         .then(data => {
    //             setData(data.data);
    //             setIsLoading(true);
    //         })
    // }, [data?._id]);
    /* 
        const handleDelete = id => {
            const proceed = window.confirm('Are you sure, you want to delete?');
            if (proceed) {
                axios.delete(`${process.env.REACT_APP_BASE_URL}/up/president/${id}`)
                    .then((res) => {
                        console.log(res);
                        if (res.data.affectedRows > 0) {
                            setSuccess(true);
                        }
                    });
            }
        } */

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

            <div key={pResidentData._id}>
                <div>
                    <Col className="text-end" style={{ cursor: 'pointer' }}>
                        {/* <GoDiffAdded onClick={() => setModalShow(true)} />  */}
                        <Button variant="success" onClick={() => { handleShowE(); setModalEData(pResidentData) }} size="sm"><FiEdit /> Edit</Button>
                        {/* <RiDeleteBinLine onClick={() => handleDelete(dt?.id)} className="text-danger" /> */}


                    </Col>
                    <Col className="d-flex align-items-center justify-content-center text-center">
                        <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>Header Image</p>
                    </Col>
                    {/* {success && <Alert>Data Successfully Deleted</Alert>} */}
                    <Row className="border p-3 rounded-3" md={2}>
                        <Col md={8} className="d-flex flex-column flex-md-row">
                            <Image src={pResidentData?.image} fluid style={{ width: '216px', height: '132px' }} />
                            <p className="ms-md-3">File name: image-321922-1593666104.jpg<br />
                                File type: image/jpeg<br />
                                Uploaded on: October 16, 2020<br />
                                File size: 132 KB<br />
                                Dimensions: 459 by 570 pixels
                            </p>
                        </Col>
                    </Row>
                </div>
                <div className="py-3">
                    <Col className="d-flex align-items-center justify-content-center text-center">
                        <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>Header Text</p>
                    </Col>
                    <Row className="border p-3 rounded-3" md={2}>
                        <Col md={8}>
                            <Form>
                                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        Name
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" defaultValue={pResidentData?.name} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        Location
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" defaultValue={pResidentData?.location} disabled />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* edit data */}
            <Modal className="overflow-auto" show={showE} onHide={handleCloseE}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">Update Residential Page</p>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-5">
                    <PRModalEdit data={modalEData} />
                </Modal.Body>
            </Modal>

            <Alert className="alertCss" show={showAlert} variant="light">
                Contact Page Updated Successfully!
            </Alert>

        </Container>
    );
};

export default PResident;