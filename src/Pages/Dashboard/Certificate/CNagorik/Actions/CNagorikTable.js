import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { CgPushDown } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { DataContext } from '../../../../../contexts/DataContext';
import CNDownload from './CNDownload';
import CNModalEdit from './CNModalEdit';
import CNModalShow from './CNModalShow';

const CNagorikTable = ({ data }) => {

    const { cNagorikData, setCNagoriks, cNFilteredData,
        setCNFilteredData } = useContext(DataContext);

    /* delete data */
    const deleteNagorik = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/citizen_certificate/${id}`)
                .then((res) => {
                    if (res.data) {
                        const remain = (cNagorikData?.filter(Commerce => Commerce._id !== id))
                        setCNagoriks(remain);
                        setCNFilteredData(remain);
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
    }, [data, cNagorikData, cNFilteredData])

    return (
        <>
            <th scope="row">{data.memorandum_no}</th>
            <td>{data.applicant_name}</td>
            <td>{data.word_no}</td>
            <td>{data.village}</td>
            <td className='text-danger' style={{ cursor: 'pointer' }} >
                <BsEye onClick={() => { handleShow(); setModalSData(data) }} /> <FiEdit className="mx-4" onClick={() => { handleShowE(); setModalEData(data) }} /> <CgPushDown onClick={() => { handleShowD(); setModalDData(data) }} />
            </td>


            {/* Show data */}
            <Modal className="overflow-auto" show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">?????????????????? ?????????????????????</p>
                        <p className="text-danger m-0">?????????????????? ?????? {modalSData?.word_no}</p>
                    </div>
                    <RiDeleteBinLine className="text-danger" onClick={() => deleteNagorik(data._id)} style={{ cursor: 'pointer' }} />
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <CNModalShow data={modalSData} />
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
                        <p className="text-success m-0 fs-4">?????????????????? ?????????????????????</p>
                        <p className="text-danger m-0">?????????????????? ?????? {modalEData?.word_no}</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <CNModalEdit data={modalEData} />
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
                        <p className="text-success m-0 fs-4">?????????????????? ?????????????????????</p>
                        <p className="text-danger m-0">?????????????????? ?????? {modalDData?.word_no}</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <CNDownload data={modalDData} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CNagorikTable;