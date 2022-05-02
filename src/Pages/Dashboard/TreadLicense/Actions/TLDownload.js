import React, { useContext, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button, Image, Row, Col } from "react-bootstrap";
import logo from '../../../../media/logo.png';
import '../TreadLicense.css';
import '../../Dashboard.css';
import { DataContext } from '../../../../contexts/DataContext';

const CCModalShow = ({ data }) => {
    const id = data._id;

    const {pMainData} =useContext(DataContext);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: `ট্রেড লাইসেন্স ${data?.license_no}`,
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
        <>
            {/* print from here */}
            <div key={id} ref={componentRef} className="m-2 p-3" style={{ border: '2px solid #ddd' }}>
                <Row className="text-center justify-content-between align-items-center">
                    <Col xs="auto">
                        <Image src={logo} style={{ width: '50px', margin: "10px", position: 'relative', top: '-35px' }} />
                    </Col>
                    <Col>
                        <p className="mb-0">গণপ্রজাতন্ত্রী বাংলাদেশ</p>
                        <p className="fs-5 fw-bold text-success mb-0">{pMainData?.name}</p>
                        <p className="mb-0">উপজেলা:- আলমডাঙ্গা, জেলা:- চুয়াডাঙ্গা</p>
                        <p className="mb-0 fw-bold">পেশা বৃত্তি ও ব্যবসার</p>
                        <p className="text-danger mx-auto fs-4 fw-bold px-4 my-2" style={{ border: "2px solid black", borderRadius: "10px", width: "fit-content" }}>ট্রেড লাইসেন্স</p>
                        <p className="mb-0">[ইউনিয়ন পরিষদ আদর্শ কর তফসিল ২০১৩ মোতাবেক]</p>
                    </Col>
                    <Col xs="auto">
                        <p className="text-danger fs-5 mb-0" style={{ visibility: "hidden" }}>ট্রেড লাইসেন্স</p>
                    </Col>
                </Row>
                <div className="py-2 my-3">
                    <div className="d-flex justify-content-between py-3">
                        <p>লাইসেন্স নংঃ {data?.license_no}</p>
                        <p>অর্থ বছরঃ 2021-2022</p>
                        <p>তারিখঃ {tDate}</p>
                    </div>
                    <div className="snood-logo snood-logo2">
                        <Row>
                            <Col xs="auto">
                                <p >ব্যাবসা প্রতিষ্ঠানের নামঃ</p>
                            </Col>
                            <Col>
                                <p className="pb-0 border-bt">{data?.institute_name}</p>
                            </Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Col xs="auto">
                                <p>সত্ত্বাধিকারী/লাইসেন্সধারীর নামঃ </p>
                            </Col>
                            <Col>
                                <p className="pb-0 border-bt">{data?.owner_name}</p>
                            </Col>
                            <Col xs="auto">
                                <p>ব্যাবসার ধরণঃ</p>
                            </Col>
                            <Col>
                                <p className="pb-0 border-bt">{data?.business_type}</p>
                            </Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Col xs="auto">
                                <p>পিতা/স্বামীঃ</p>
                            </Col>
                            <Col><p className="pb-0 border-bt">{data?.guardian_name}</p></Col>
                            <Col xs="auto">
                                <p>মাতাঃ</p>
                            </Col>
                            <Col><p className="pb-0 border-bt">{data?.mothers_name}</p></Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Col xs="auto">
                                <p>ঠিকানাঃ</p>
                            </Col>
                            <Col><p className="pb-0 border-bt">{data?.address}</p></Col>
                            <Col xs="auto">
                                <p>ব্যবসা প্রতিষ্ঠানের ঠিকনাঃ </p>
                            </Col>
                            <Col><p className="pb-0 border-bt">{data?.institute_address}</p></Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Col xs="auto">
                                <p>ব্যবসার/পেশার মূলধনঃ</p>
                            </Col>
                            <Col><p className="pb-0 border-bt">{data?.profession_capital}</p></Col>
                            <Col xs="auto">
                                <p>টাকাঃ</p>
                            </Col>
                            <Col><p className="pb-0 border-bt">{data?.total}</p></Col>
                            <Col xs="auto">
                                <p>মোবাইল নম্বরঃ</p>
                            </Col>
                            <Col><p className="pb-0 border-bt">{data?.mobile_no}</p></Col>
                        </Row>
                        <Row className="mt-3"><p>ফি ও করের পরিমাণঃ</p></Row>
                        <Row className="justify-content-between align-items-center">
                            <Col xs={2}></Col>
                            <Col xs={5}>
                                <p>ক) পেশা ব্যবসা ও বৃত্তির উপর লাইসেন্স ফি (+ভ্যাট) </p>
                            </Col>
                            <Col xs={2}><p className="pb-0 border-bt">{data?.license_fee} </p></Col>
                            <Col xs={2}><p>টাকা</p></Col>
                            <Col xs={1}>
                                <p></p>
                            </Col>
                        </Row>
                        <Row xs={4} className="justify-content-between">
                            <Col xs={2}></Col>
                            <Col xs={2}>
                                <p>খ) বকেয়াঃ</p>
                            </Col>
                            <Col xs={5}>
                                <p className="pb-0 border-bt">{data?.arrears}</p>
                            </Col>
                            <Col xs={2}>
                                <p>টাকা</p>
                            </Col>
                            <Col xs={1}>
                                <p></p>
                            </Col>
                        </Row>
                        <Row xs={4} className="justify-content-between">
                            <Col xs={2}></Col>
                            <Col xs={2}>সর্বমোটঃ </Col>
                            <Col xs={5}>
                                <p className="pb-0 border-bt">{data?.total}</p>
                            </Col>
                            <Col xs={2}>
                                <p>টাকা</p>
                            </Col>
                            <Col xs={1}>
                                <p></p>
                            </Col>
                        </Row>
                        <Row className="justify-content-between">
                            <Col xs={2}></Col>
                            <Col xs={2}>
                                <p>কথায়ঃ</p>
                            </Col>
                            <Col xs={5}>
                                <p className="pb-0 border-bt">{data?.in_words}</p>
                            </Col>
                            <Col xs={3}></Col>
                        </Row>
                        <div className="text-center mt-3 p-2 border">
                            <span>বৈধতার মেয়াদ ১লা জুলাই ২০২২ ইং হইতে ৩০শে জুন ২০২৩ ইং তারিখ পর্যন্ত।</span>
                            <p className="mb-0">উপরিউক্ত ফি ও কর প্রাপ্ত হয়ে {pMainData?.name?.split(" ")?.reverse()?.slice(1)?.reverse()?.join(" ")} সীমানায় তাঁর ব্যবসা/বৃত্তি/পেশা চালিয়ে যাওয়ার জন্য এই লাইসেন্স প্রদান করা হল।</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <p className="text-center mt-5">
                        চেয়ারম্যান<br />
                        {pMainData?.name}<br />
                        {pMainData?.location}
                    </p>
                </div>
            </div>
            <div className=" my-4 mx-auto text-center">
                <Button onClick={handlePrint} variant="light" >Download pdf</Button>
            </div>
        </>
    );
}

export default CCModalShow;