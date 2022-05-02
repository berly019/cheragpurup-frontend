import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { CgPushDown } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

import { DataContext } from '../../../../contexts/DataContext';
import TLModalEdit from './TLModalEdit';
import TLModalShow from './TLModalShow';
import TLDownload from './TLDownload';
import axios from 'axios';

const TreadLicenceTable = ({ license }) => {

    const { treadLicenseData, setTreadLicenses, tFilteredData,
        setTFilteredData } = useContext(DataContext);

    /* delete data */
    const deleteTreadLicense = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/tread_license/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        const remain = (treadLicenseData?.filter(Commerce => Commerce._id !== id))
                        setTreadLicenses(remain);
                        setTFilteredData(remain);
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
    }, [license, treadLicenseData, tFilteredData])

    return (
        <>
            <th scope="row">{license?.license_no}</th>
            <td>{license?.institute_name}</td>
            <td>{license?.owner_name}</td>
            <td style={{ cursor: 'pointer' }} className='text-danger'>
                <BsEye onClick={() => { handleShow(); setModalSData(license) }} /> <FiEdit className="mx-4" onClick={() => { handleShowE(); setModalEData(license) }} />
                <CgPushDown onClick={() => { handleShowD(); setModalDData(license) }} /></td>


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
                        <p className="text-success m-0 fs-4">ট্রেড লাইসেন্স</p>
                    </div>

                    <RiDeleteBinLine className="text-danger mx-4" style={{cursor: "pointer"}} onClick={() => deleteTreadLicense(modalSData._id)} />
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <TLModalShow data={modalSData} />
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
                        <p className="text-success m-0 fs-4">ট্রেড লাইসেন্স</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>

                <Modal.Body className="px-5">
                    <TLModalEdit data={modalEData} />
                </Modal.Body>
             
            </Modal>

            {/* download data */}
            <Modal className="overflow-auto print-portrait-a4" show={showD} onHide={handleCloseD}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                    {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">ট্রেড লাইসেন্স</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <TLDownload data={modalDData} />
                </Modal.Body>
               
            </Modal >
        </>
    );
};

export default TreadLicenceTable;