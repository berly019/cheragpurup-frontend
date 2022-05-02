import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineMailOutline, MdOutlineMarkEmailRead } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { DataContext } from '../../../../contexts/DataContext';
import CSModalEdit from './CSModalEdit';
import CSModalShow from './CSModalShow';

const CommerseTable = ({ data }) => {
    const { commerceData, setCommerces, setCFilteredData, cFilteredData } = useContext(DataContext);

    /* delete data */
    const deleteCommerce = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/up/commerce/${id}`)
                .then((res) => {
                    // console.log(res);
                    if (res.data) {
                        const remain = (commerceData?.filter(Commerce => Commerce._id !== id))
                        setCommerces(remain);
                        setCFilteredData(remain);

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
    }, [data, commerceData, cFilteredData])

    // handle messages
    const handleMessageCheck = (data) => {
        const id = data._id;
        const num = data?.mobile_no;
        const word = data?.word_no;
        const holding = data?.holding_no;
        const previes_areas_tax = data?.previes_areas_tax;
        const areas_tax = data?.areas_tax;
        const collected_tax = data?.collected_tax;
        const assign_tax = data?.assign_tax;
        const total = data?.total_tax;

        if (num?.toString()?.length < 10) {
            window.alert('Invalid phone number')
        } else if (num?.toString()?.length === 10) {
            const proceed = window.confirm('Are you sure you want to Confirm?');
            if (proceed) {
                const data = {};
                data.sms = 'yes';

                const apiKey = "81e2KlJ8XZt98Q6N18Ecr88iNNBg2519Hp4DDyGW";
                const message = `দুবলহাটি ইউপি, আপনার ওয়ার্ড নংঃ ${word}, হোল্ডিং নংঃ ${holding}, পূর্বের বকেয়া করঃ ${previes_areas_tax} টাকা, ধার্যক্রিত করঃ ${assign_tax} টাকা, মোট করঃ ${total} টাকা, আদায়কৃত করঃ ${collected_tax} টাকা, বকেয়া করঃ ${areas_tax} টাকা, ধন্যবাদ।`

                // send sms
                fetch(`https://api.sms.net.bd/sendsms?api_key=${apiKey}&msg=${message}&to=880${num}`)
                    .then(response => response.json())
                    .then(result => {
                        window.alert(result?.msg);
                    })
                    .catch(error => console.log('error', error));

                // data.sms = '< MdOutlineMarkEmailRead />';
                axios.put(`${process.env.REACT_APP_BASE_URL}/up/commerce/sms/${id}`, (data))
                    .then((res) => {
                        // setSuccess(true);
                        // handle success
                        // console.log(res);
                    });
            }
        } else if (num?.toString()?.length === 11) {
            const proceed = window.confirm('Are you sure you want to Confirm?');
            if (proceed) {
                const data = {};
                data.sms = 'yes';

                const apiKey = "81e2KlJ8XZt98Q6N18Ecr88iNNBg2519Hp4DDyGW";
                const message = `দুবলহাটি ইউপি, আপনার ওয়ার্ড নংঃ ${word}, হোল্ডিং নংঃ ${holding}, পূর্বের বকেয়া করঃ ${previes_areas_tax} টাকা, ধার্যক্রিত করঃ ${assign_tax} টাকা, মোট করঃ ${total} টাকা, আদায়কৃত করঃ ${collected_tax} টাকা, বকেয়া করঃ ${areas_tax} টাকা, ধন্যবাদ।`

                // send sms
                fetch(`https://api.sms.net.bd/sendsms?api_key=${apiKey}&msg=${message}&to=88${num}`)
                    .then(response => response.json())
                    .then(result => window.alert(result?.msg))
                    .catch(error => console.log('error', error));

                // data.sms = '< MdOutlineMarkEmailRead />';
                axios.put(`${process.env.REACT_APP_BASE_URL}/up/commerce/sms/${id}`, (data))
                    .then((res) => {
                        // setSuccess(true);
                        // handle success
                        // console.log(res);
                    });
            }
        }
    };

    return (
        <>

            <td>{data?.holding_no}</td>
            <td>{data?.payer_name}</td>
            <td>{data?.business_org}</td>
            <td>{data?.word_no}</td>
            <td>{data?.village}</td>
            <td>{data?.assign_tax}</td>
            <td>{data?.previes_areas_tax}</td>
            <td>{data?.total_tax}</td>
            <td>{data?.mobile_no}</td>
            <td onClick={() => handleMessageCheck(data)} style={{ cursor: 'pointer' }} className="text-danger" >
                {data?.sms ? <MdOutlineMarkEmailRead /> : <MdOutlineMailOutline />}
            </td>
            <td className='text-danger' style={{ cursor: 'pointer' }}>
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
                        <p className="text-success m-0 fs-4">বানিজ্যিক করদাতা</p>
                        <p className="text-danger m-0">ওয়ার্ড নং {modalSData?.word_no}</p>
                    </div>
                    <RiDeleteBinLine className="mx-4 text-danger" style={{ cursor: 'pointer' }} onClick={() => deleteCommerce(modalSData?._id)} />
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <CSModalShow modalData={modalSData} />
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
                        <p className="text-success m-0 fs-4">বানিজ্যিক করদাতা</p>
                        <p className="text-danger m-0">ওয়ার্ড নং {modalEData?.word_no}</p>
                    </div>
                    {/* <RiDeleteBinLine className="text-danger me-4" onClick={() => deleteCommerce(modalEData._id)} style={{ cursor: 'pointer' }} /> */}
                    {/* </Modal.Title> */}
                </Modal.Header>

                <Modal.Body className="px-5">
                    <CSModalEdit modalData={modalEData} />
                </Modal.Body>

                {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
            </Modal>
        </>
    );
};

export default CommerseTable;