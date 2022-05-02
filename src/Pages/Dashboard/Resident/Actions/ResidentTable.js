import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineMailOutline, MdOutlineMarkEmailRead } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { DataContext } from '../../../../contexts/DataContext';
import RSModalEdit from './RSModalEdit';
import RSModalShow from './RSModalShow';

const ResidentTable = ({ data }) => {

    const { residentData, setResidents, setRFilteredData, rFilteredData } = useContext(DataContext);

    /* delete data */
    const deleteResident = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/resident/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        const remain = (residentData?.filter(Resident => Resident._id !== id))
                        setResidents(remain);
                        setRFilteredData(remain);

                    }
                })
        }
    }

    const [modalEData, setModalEData] = React.useState('');
    const [modalSData, setModalSData] = React.useState('');


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // for edit modal
    const [showE, setShowE] = useState(false);
    const handleShowE = () => setShowE(true);
    const handleCloseE = () => setShowE(false);

    useEffect(() => {
        handleClose();
        handleCloseE();
    }, [data, residentData, rFilteredData])

    // handle messages
    const handleMessageCheck = (data) => {
        const id = data._id;
        const num = data?.mobile_no;
        const word = data?.word_no;
        const holding = data?.holding_no;
        const previes_areas_tax = data?.previes_areas_tax;
        const assign_tax = data?.assign_tax;
        const collected_tax = data?.collected_tax;
        const areas_tax = data?.areas_tax;
        const total = data?.total_tax;

        if (num?.toString()?.length < 10) {
            window.alert('Invalid phone number')
        } else if (num?.toString()?.length === 10) {
            const proceed = window.confirm('Are you sure you want to send message?');
            if (proceed) {
                const data = {};
                data.sms = 'yes';

                const apiKey = "81e2KlJ8XZt98Q6N18Ecr88iNNBg2519Hp4DDyGW";
                const message = `দুবলহাটি ইউপি, আপনার ওয়ার্ড নংঃ ${word}, হোল্ডিং নংঃ ${holding}, পূর্বের বকেয়া করঃ ${previes_areas_tax} টাকা, ধার্যক্রিত করঃ ${assign_tax} টাকা, মোট করঃ ${total} টাকা, আদায়কৃত করঃ ${collected_tax} টাকা, বকেয়া করঃ ${areas_tax} টাকা, ধন্যবাদ।`

                // send sms
                fetch(`https://api.sms.net.bd/sendsms?api_key=${apiKey}&msg=${message}&to=880${num}`)
                    .then(response => response.json())
                    .then(result => {
                        window.alert(result?.msg)
                        // window.alert({obj});
                    })
                    .catch(error => console.log('error', error));

                // data.sms = '< MdOutlineMarkEmailRead />';
                axios.put(`${process.env.REACT_APP_BASE_URL}/up/resident/sms/${id}`, (data))
                    .then((res) => {
                        // setSuccess(true);
                        // handle success
                        // console.log(res);
                    });
            }
        } else if (num?.toString()?.length === 11) {

            const proceed = window.confirm('Are you sure you want to send message?');
            if (proceed) {
                const data = {};
                data.sms = 'yes';

                const apiKey = "81e2KlJ8XZt98Q6N18Ecr88iNNBg2519Hp4DDyGW";
                const message = `দুবলহাটি ইউপি, আপনার ওয়ার্ড নংঃ ${word}, হোল্ডিং নংঃ ${holding}, পূর্বের বকেয়া করঃ ${previes_areas_tax} টাকা, ধার্যক্রিত করঃ ${assign_tax} টাকা, মোট করঃ ${total} টাকা, আদায়কৃত করঃ ${collected_tax} টাকা, বকেয়া করঃ ${areas_tax} টাকা, ধন্যবাদ।`

                // send sms
                fetch(`https://api.sms.net.bd/sendsms?api_key=${apiKey}&msg=${message}&to=88${num}`)
                    .then(response => response.json())
                    .then(result => {
                        window.alert(result?.msg)
                        // window.alert("Request Successfully Send!", result)
                        // window.alert({obj});
                    })
                    .catch(error => console.log('error', error));

                // data.sms = '< MdOutlineMarkEmailRead />';
                axios.put(`${process.env.REACT_APP_BASE_URL}/up/resident/sms/${id}`, (data))
                    .then((res) => {
                        // setSuccess(true);
                        // handle success
                        // console.log(res);
                    });
            }
        }
    }

    return (
        <>
            <th scope="row">{data.holding_no}</th>
            <td>{data?.payer_name}</td>
            <td>{data?.guardian_name}</td>
            <td>{data?.word_no}</td>
            <td>{data?.village}</td>
            <td>{data?.assign_tax}</td>
            <td>{data?.previes_areas_tax}</td>
            <td>{data?.total_tax}</td>
            <td>{data?.mobile_no}</td>
            <td onClick={() => handleMessageCheck(data)} style={{ cursor: 'pointer' }} className="text-danger" >
                {data?.sms ? <MdOutlineMarkEmailRead /> : <MdOutlineMailOutline />}
            </td>
            <td className='text-danger' style={{ cursor: 'pointer' }} >
                <BsEye style={{ width: "2rem" }} onClick={() => { handleShow(); setModalSData(data) }} /> <FiEdit style={{ width: "2rem" }} onClick={() => { handleShowE(); setModalEData(data) }} />
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
                        <p className="text-success m-0 fs-4">আবাসিক করদাতা</p>
                        <p className="text-danger m-0">ওয়ার্ড নং {modalSData?.word_no}</p>
                    </div>
                    <RiDeleteBinLine className="text-danger mx-4" onClick={() => deleteResident(modalSData._id)} style={{ cursor: 'pointer' }} />
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <RSModalShow modalData={modalSData} />
                </Modal.Body>
                {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
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
                        <p className="text-success m-0 fs-4">আবাসিক করদাতা</p>
                        <p className="text-danger m-0">ওয়ার্ড নং {modalEData?.word_no}</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>

                <Modal.Body className="px-5" >
                    <RSModalEdit modalData={modalEData} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ResidentTable;