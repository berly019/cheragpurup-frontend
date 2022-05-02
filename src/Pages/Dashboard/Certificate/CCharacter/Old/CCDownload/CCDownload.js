import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { Button, Image, Modal, } from "react-bootstrap";
import logo from '../../../../../media/logo.png';
import '../../Certificate.css';
import { DataContext } from '../../../../../../contexts/DataContext';


function CCModalShow(props) {
    const id = props.id;
    const [data, setData] = useState([]);

    const { pMainData } = useContext(DataContext);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/character_certificate/${id}`)
            .then((data) => {
                setData(data.data);
                // console.log(data.data[0]);
            })
    }, [id]);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: `চারিত্রিক সনদপত্র ${data?.memorandum_no}`,
        content: () => componentRef.current,
    });

    const [tDate, setSqlDate] = useState('')
    useEffect(() => {
        const date = new Date();
        const datearray = date.toLocaleString().split("/");
        const sqldate = datearray[2].slice(0, 4) + "-" + (datearray[0] <= 9 ? "0" + datearray[0] : datearray[0]) + "-" + (datearray[1] <= 9 ? "0" + datearray[1] : datearray[1]);
        setSqlDate(sqldate);
    }, [])

    return (
        <Modal className="overflow-auto"
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ top: '50px', height: '90vh' }} scrollable="true"
        >
            <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">চারিত্রিক সনদপত্র</p>
                    <p className="text-danger m-0">ওয়ার্ড নং {data?.word_no}</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>
            <Modal.Body className="px-5">
                {/* print from here */}
                <div ref={componentRef} className="border m-2 p-3" key={data?._id}>
                    <div className="text-center">
                        <Image src={logo} style={{ width: '50px', margin: "10px" }} />
                        <p className="mb-0">গণপ্রজাতন্ত্রী বাংলাদেশ</p>
                        <p className="fs-5 fw-bold text-success mb-0">{pMainData?.name}</p>
                        <p>উপজেলা:- আলমডাঙ্গা, জেলা:- চুয়াডাঙ্গা</p>
                        <p className="text-danger mx-auto fs-4 fw-bold mb-0 px-4" style={{ border: "2px solid black", borderRadius: "10px", width: "fit-content" }}>চারিত্রিক সনদপত্র</p>
                    </div>
                    <div className="py-2 snood-logo my-3">
                        <div className="d-flex justify-content-between pt-3">
                            <p>স্মারক নং: ইউপি/-{data?.memorandum_no}</p>
                            <p>তারিখ: {tDate}</p>
                        </div>
                        <p style={{ textAlign: 'justify' }}>
                            এই মর্মে চারিত্রিক সনদপত্র প্রদান করা যাইতেছে যে {data?.applicant_name} , ({data?.marital_status}) , পিতা/স্বামী {data?.guardian_name}, মাতা {data?.mother_name}, গ্রাম {data?.village} , ওয়ার্ড নং {data?.word_no} পোস্ট অফিস {data?.post_office} , উপজেলা:- আলমডাঙ্গা; জেলা:- চুয়াডাঙ্গা; কে আমি ব্যক্তিগতভাবে চিনি ও জানি। তিনি বাংলাদেশের নাগরিক ও অত্র ইউনিয়নের স্থায়ী বাসিন্দা। আমার জানামতে তিনি সমাজ ও রাষ্ট্রবিরোধী কোন খারাপ কাজে জড়িত নন। আমি তাঁহার সার্বিক মঙ্গল কামনা করতেছি।
                        </p>
                        <p>
                            * আপনার শিশুর জন্মের ৪৫ দিনের মধ্যে জন্ম নিবন্ধন করুন।<br />
                            * নিয়মিত কর পরিশোধ করুন এবং সেবা নিন।<br />
                            * বেশি করে গাছ লাগান, পরিবেশ বাঁচান।<br />

                            * সমস্তও মাদক মুক্ত সমাজ গঠনে সহযোগিতা করুন।<br />
                            * কর দিন সেবা নিন
                        </p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <p className="text-center">
                            চেয়ারম্যান<br />
                            {pMainData?.name}<br />
                            {pMainData?.location}
                        </p>
                    </div>
                </div>
                <div className=" my-4 mx-auto text-center">
                    <Button onClick={handlePrint} variant="light" >Download pdf</Button>
                </div>
            </Modal.Body>
            {/* <Modal.Footer style={{ border: "0" }}>
            <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
        </Modal.Footer> */}
        </Modal>
    );
}

export default CCModalShow;