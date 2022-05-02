import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, Col, Container, Image, Modal, Row, Spinner, Table, } from 'react-bootstrap';
// import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';
import CreateNotice from './CreateNotice/CreateNotice';
import EditNotice from './EditNotice/EditNotice';
// import ShowNotice from './ShowNotice/ShowNotice';
import CreateRunNotice from './CreateRunNotice/CreateRunNotice';
import EditRunNotice from './EditRunNotice/EditRunNotice';
// import ShowNotice from './ShowNotice/ShowNotice';
import { DataContext } from '../../../contexts/DataContext';

const Notice = () => {

    const { isLoading, notice, setNotice, runNotice, setRunNotice } = useContext(DataContext);

    const [showAlert, setShowAlert] = useState(false);

    const [modalEData, setModalEData] = React.useState('');
    const [modalREData, setModalREData] = React.useState('');

    // for notice modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    // for run modal
    const [showR, setShowR] = useState(false);
    const handleShowR = () => setShowR(true);
    const handleCloseR = () => setShowR(false);
    // for edit notice
    const [showE, setShowE] = useState(false);
    const handleShowE = () => setShowE(true);
    const handleCloseE = () => setShowE(false);
    // for edit run notice
    const [showRE, setShowRE] = useState(false);
    const handleShowRE = () => setShowRE(true);
    const handleCloseRE = () => setShowRE(false);


    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1000)
    }

    useEffect(() => {
        handleClose();
        handleCloseE();
        handleCloseR();
        handleCloseRE();

        return () => {
            handleShowAlert();
        }
    }, [notice, runNotice])

    // const [isLoading, setIsLoading] = React.useState(false);
    // const [modalShow, setModalShow] = React.useState(false);
    // const [modalShowF, setModalShowF] = React.useState(false);
    // const [modalEdit, setModalEdit] = React.useState(false);

    // const [modalRunShow, setModalRunShow] = React.useState(false);
    // const [modalRunEdit, setModalRunEdit] = React.useState(false);

    // const [modalId, setModalId] = React.useState('');
    // const [modalRunId, setModalRunId] = React.useState('');
    // const [success, setSuccess] = React.useState('')

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/notice/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        const remain = (notice?.filter(Resident => Resident._id !== id))
                        setNotice(remain);
                    }
                });
        }
    }
    const handleRunDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/run_notice/${id}`)
                .then((res) => {
                    if (res.data) {
                        // console.log(res.data)
                        const remain = (runNotice?.filter(Resident => Resident._id !== id))
                        setRunNotice(remain);
                    }
                });
        }
    }
    // if(success){
    //     setTimeout(() => {
    //         window.location.reload();
    //       }, 1000);
    // }

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
            {/* data table */}
            <Row>
                <Col className="d-flex align-items-center justify-content-center text-center">
                    <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>ব্যানার নোটিশ</p>
                </Col>
                <div className="text-end">
                    <Button variant="success" className="rounded-3 px-2" onClick={() => handleShow()} size="sm"><MdOutlineDashboardCustomize /> সংযুক্ত করুন</Button>
                </div>
            </Row>
            <Row className="overflow-auto px-2 px-md-0 py-3">
                <Table className="table table-hover fs-6 text-center">
                    <thead>
                        <tr>
                            <th scope="col">প্রিভিও</th>
                            <th scope="col">টাইটেল</th>
                            <th scope="col">সাব টাইটেল</th>
                            <th scope="col">ডেসক্রিপসন</th>
                            <th scope="col">একশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            notice.map(data => <tr key={data._id}>
                                <td><Image fluid style={{ height: '52px', width: '97px' }} src={data.image} /></td>
                                <td>{data.title}</td>
                                <td>{data.subtitle}</td>
                                <td>{data.desc}</td>
                                <td className='text-danger' style={{ cursor: 'pointer' }}> <FiEdit className="mx-4" onClick={() => { handleShowE(); setModalEData(data) }} /> <RiDeleteBinLine onClick={() => handleDelete(data._id)} /></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </Row>

            {/* notice table */}
            <Row className="pt-3">
                <Col className="d-flex align-items-center justify-content-center text-center">
                    <p className="fw-bold fs-5" style={{ borderBottom: "2px solid #00AA55", width: "fit-content" }}>চলমান নোটিশ</p>
                </Col>
                <div className="text-end">
                    <Button variant="success" className="rounded-3 px-2" onClick={() => handleShowR()} size="sm"><MdOutlineDashboardCustomize /> সংযুক্ত করুন</Button>
                </div>
            </Row>
            <Row className="overflow-auto px-2 px-md-0 py-3">
                <Table className="table table-hover fs-6 text-center">
                    <thead>
                        <tr>
                            <th scope="col">টাইটেল</th>
                            <th scope="col">নটিশ</th>
                            <th scope="col">একশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            runNotice.map(data =>
                                <tr key={data._id}>
                                    <td>{data.title}</td>
                                    <td>{data.notice}</td>
                                    <td className='text-danger' style={{ cursor: 'pointer' }}><FiEdit className="mx-4" onClick={() => { handleShowRE(); setModalREData(data) }} /> <RiDeleteBinLine onClick={() => handleRunDelete(data?._id)} /></td>
                                </tr>)
                        }
                    </tbody>
                </Table>
            </Row>

            {/* add notices */}
            <Modal className="overflow-auto" show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">Create Notice</p>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-5">
                    <CreateNotice />
                </Modal.Body>
            </Modal>

            {/* edit notice */}
            <Modal className="overflow-auto" show={showE} onHide={handleCloseE}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">Edit Notice</p>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-5">
                    <EditNotice data={modalEData} />
                </Modal.Body>
            </Modal>

            {/* add run notices */}
            <Modal className="overflow-auto" show={showR} onHide={handleCloseR}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">Create Run Notice</p>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-4">
                    <CreateRunNotice />
                </Modal.Body>
            </Modal>

            {/* edit run notice */}
            <Modal className="overflow-auto" show={showRE} onHide={handleCloseRE}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">Update Run Notice</p>
                    </div>
                </Modal.Header>
                <Modal.Body className="px-5">
                    <EditRunNotice data={modalREData} />
                </Modal.Body>
            </Modal>

            <Alert className="alertCss" show={showAlert} variant="light">
                Notice Page Updated Successfully!
            </Alert>

        </Container>
    );
};

export default Notice;