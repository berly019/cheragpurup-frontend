import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { CgPushDown } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { DataContext } from '../../../../../contexts/DataContext';
import CODownload from './CODownload';
import COModalEdit from './COModalEdit';
import COModalShow from './COModalShow';

const COwarishTable = ({ data }) => {

    const { cOwarishData, cOFilteredData, setCOwarishs, setCOFilteredData, } = useContext(DataContext);

    /* delete data */
    const deleteOwarish = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/inheritance_certificate/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        const remain = (cOwarishData?.filter(Commerce => Commerce._id !== id))
                        setCOwarishs(remain);
                        setCOFilteredData(remain);
                    }
                })
        }
    }

    const [modalSData, setModalSData] = React.useState('');
    const [modalEData, setModalEData] = React.useState('');
    const [modalDData, setModalDData] = React.useState('');


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // for edit modal
    const [showE, setShowE] = useState(false);
    const handleShowE = () => setShowE(true);
    const handleCloseE = () => setShowE(false);

    // for download modal
    const [showD, setShowD] = useState(false);
    const handleShowD = () => setShowD(true);
    const handleCloseD = () => setShowD(false);

    useEffect(() => {
        handleClose();
        handleCloseE();
        handleCloseD();
    }, [data, cOwarishData, cOFilteredData])

    return (
        <>
            <th scope="row">{data.memorandum_no}</th>
            <td>{data.applicant_name}</td>
            <td>{data.word_no}</td>
            <td>{data.village}</td>
            <td className='text-danger' style={{ cursor: 'pointer' }}>
                <BsEye onClick={() => { handleShow(); setModalSData(data) }} /> <FiEdit className="mx-4" onClick={() => { handleShowE(); setModalEData(data) }} />  <CgPushDown onClick={() => { handleShowD(); setModalDData(data) }} />
            </td>


            {/* show data */}
            <Modal className="overflow-auto" show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">ওয়ারিশ সনদপত্র</p>
                        <p className="text-danger m-0">ওয়ার্ড নং {modalSData?.word_no}</p>
                    </div>
                    <RiDeleteBinLine className="text-danger" onClick={() => deleteOwarish(modalSData._id)} style={{ cursor: 'pointer' }} />
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <COModalShow data={modalSData} />
                </Modal.Body>
            </Modal>

            {/* edit data */}
            <Modal className="overflow-auto" show={showE} onHide={handleCloseE}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">ওয়ারিশ সনদপত্র</p>
                        <p className="text-danger m-0">ওয়ার্ড নং {modalEData?.word_no}</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <COModalEdit data={modalEData} />
                </Modal.Body>
            </Modal>

            {/* download data */}
            <Modal className="overflow-auto" show={showD} onHide={handleCloseD}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">ওয়ারিশ সনদপত্র</p>
                        <p className="text-danger m-0">ওয়ার্ড নং {modalDData?.word_no}</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <CODownload data={modalDData} />
                </Modal.Body>
            </Modal>

        </>
    );
};

export default COwarishTable;