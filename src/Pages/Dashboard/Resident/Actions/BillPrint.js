import axios from 'axios';
import React, { useState, useRef, useContext } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Alert, Button, Col, Form, Image, Modal, Row, Table } from "react-bootstrap";
import logo from '../../../../media/logo.png';
import { DataContext } from '../../../../contexts/DataContext';
import "../Resident.css";
import "../../Dashboard.css";
// 
// import jsPDF from "jspdf";
// import html2pdf from 'html2pdf.js';
// import html2canvas from 'html2canvas';

function BillPrint(props) {
    const { pMainData } = useContext(DataContext);

    const [selectValue, setSelectValue] = useState(0);
    const [wordData, setWordData] = useState([]);
    const [rangeData, setRangeData] = useState([]);
    const [ranges, setRanges] = useState(0);
    const [rangee, setRangee] = useState(0);
    const [error, setError] = useState("")
    const [dataCount, setDataCount] = useState(0);

    const fetchWordData = (wordData) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/resident/word/${wordData}`)
            .then(data => {
                // console.log(data.data)
                if (data.data.length < 0) {
                    setError("কোন ডাটা পাওয়া যায় নি!")
                } else {
                    setWordData(data.data)
                    setDataCount(data.data.length)
                    setError("")
                }
            });
    }

    // handle range
    const handleRange = () => {
        if (ranges > rangee || ranges === 0 || rangee === 0 || ranges > wordData.length || rangee > wordData.length) {
            setError("দয়া করে একটি ভ্যালিড রেঞ্জ প্রবেশ করান")
        } else {
            setError("");

            const rangeData = wordData.slice(Number(ranges - 1), Number(rangee));
            setRangeData(rangeData);
        }

    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    // const handlePrint = () => {
    //     const pdf1 = document.querySelector("#allData")
    //     const pdf = html2pdf().from(pdf1).save()
    //     console.log(pdf, pdf1);
    //     const file = new Blob([pdf], {
    //         type: 'application/pdf',
    //     });
    //     console.log(file);

    //     const fileURL = URL.createObjectURL(file);
    //     window.open(fileURL);
    // }


    const componentRangeRef = useRef();
    const handleRangePrint = useReactToPrint({
        content: () => componentRangeRef.current
    });



    // js pdf
    /*     const generatePDF = () => {
            const doc = new jsPDF('p', 'pt', 'a4');
            doc.setFont('SolaimanLipi'); // set custom font (SolaimanLipi)
            doc.setFontSize(10); // set font size 10
            // doc.text('মাইক্রোসফট আফিস ট্রেনিং গাইড', x, y) // and you can write your text with starting co-ordinator
     
            // you can check your font is added or not
            console.log('fonts', doc.getFontList());
            doc.html(document.querySelector('#allData'), {
                callback: function (pdf) {
                    pdf.save("allData.pdf");
                }
            });
        } */

    // const pdfHandler = () => {
    //     // let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

    //     // mywindow.document.write(`<html><head><title>${"title"}</title>`);
    //     // mywindow.document.write('</head><body >');
    //     // mywindow.document.write(document.getElementById("allData").innerHTML);
    //     // mywindow.document.write('</body></html>');

    //     // mywindow.document.close(); // necessary for IE >= 10
    //     // mywindow.focus(); // necessary for IE >= 10*/

    //     // mywindow.print();
    //     // mywindow.close();

    //     // return true;

    // }

    return (
        <Modal className="overflow-auto"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ top: '50px', height: '90vh' }} scrollable="true"
        >
            <Modal.Header closeButton id="contained-modal-title-vcenter" style={{ border: "0" }}>
                {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                <div className="text-center" style={{ width: "96%" }}>
                    <p className="text-success m-0 fs-4">বানিজ্যিক করদাতা</p>
                    <p className="text-success m-0">বিল প্রিন্ট</p>
                </div>
                {/* </Modal.Title> */}
            </Modal.Header>

            <Modal.Body className="px-5 text-center">
                <Row xs={1}>
                    <Col>
                        <p className="fs-4 border-bottom fw-bold">ওয়ার্ড ভিত্তিক প্রিন্ট করুন</p>
                        <div className="d-flex mb-2">
                            <Form.Select aria-label="Default select example" onChange={(e) => setSelectValue(e.target.value)}>
                                <option>ওয়ার্ড সিলেক্ট করুন</option>
                                <option value="1">এক নং ওয়ার্ড</option>
                                <option value="2">দুই নং ওয়ার্ড</option>
                                <option value="3">তিন নং ওয়ার্ড</option>
                                <option value="4">চার নং ওয়ার্ড</option>
                                <option value="5">পাঁচ নং ওয়ার্ড</option>
                                <option value="6">ছয় নং ওয়ার্ড</option>
                                <option value="7">সাত নং ওয়ার্ড</option>
                                <option value="8">আট নং ওয়ার্ড</option>
                                <option value="9">নয় নং ওয়ার্ড</option>
                            </Form.Select>
                            <Button className="ms-2 w-50" variant="success" onClick={() => { fetchWordData(selectValue) }}>ডাটা খুঁজুন</Button>

                        </div>
                        <div>
                            {dataCount > 0 ?
                                <>
                                    <p>ডাটা পাওয়া গেছে {dataCount}</p>
                                    {/* <Button variant="success" onClick={pdfHandler}>সব ডাটা প্রিন্ট করুন</Button> */}
                                    <Button variant="success" onClick={handlePrint}>সব ডাটা প্রিন্ট করুন</Button>
                                    <div className="d-none">
                                        <div ref={componentRef} className="billPrint  print-landscape-a4">
                                            {/* <Table striped hover ref={componentRef} id='allData'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>কর দাতার নাম</th>
                                                    <th>ব্যাবসা প্রতিষ্ঠান</th>
                                                    <th>ওয়ার্ড নং</th>
                                                    <th>গ্রাম</th>
                                                    <th>ধার্যকৃত কর</th>
                                                    <th>পূর্বের বকেয়া কর</th>
                                                    <th>মোট কর</th>
                                                    <th>মোবাইল</th>
                                                </tr>
                                            </thead>
                                            <tbody> */}
                                            {wordData?.map(data =>
                                                <Row key={data._id} style={{ height: "100vh", width: "100vw" }}>
                                                    <Col className="py-3 px-5" key={data._id}>
                                                        <Row xs="auto" className="text-center">

                                                            <Col className="pt-4" style={{ width: '65px', height: "65px" }}>
                                                                <Image src={logo} className="img-fluid" />
                                                            </Col>

                                                            <Col>
                                                                <p className="fs-4 mb-0">{pMainData?.name} কার্যালয়</p>
                                                                <p className="mb-0">{pMainData?.location}</p>
                                                                <p className="fs-5  mb-0">ইউপি করের বিল</p>
                                                                <div className="d-flex justify-content-between text-center">
                                                                    <p className="mb-0 border-bottom">ইউপি কপি</p>
                                                                    <p className="mb-0 border-bottom">অর্থ বছরঃ ২০২১-২২</p>
                                                                </div>
                                                            </Col>

                                                            <Col className="pt-4" style={{ width: '65px', height: "65px" }}>
                                                                <Image src={logo} className="img-fluid" />
                                                            </Col>
                                                        </Row>

                                                        <div className="py-2">
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">ওয়ার্ড নং</p>
                                                                <p className="mb-0 w-50">: {data?.word_no}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">হোল্ডিং নং</p>
                                                                <p className="mb-0 w-50">: {data?.holding_no}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">করদাতার নামঃ</p>
                                                                <p className="mb-0 w-50">: {data?.payer_name}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">পিতা/স্বামীর নাম</p>
                                                                <p className="mb-0 w-50">: {data?.guardian_name}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">বিলের ঠিকানাঃ </p>
                                                                <p className="mb-0 w-50">: "নাই"</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">মোবাইল</p>
                                                                <p className="mb-0 w-50">: {data?.mobile_no}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">বিল ইসুর তারিখঃ</p>
                                                                <p className="mb-0 w-50">: "নাই"</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">জমাদানের শেষ তারিখঃ </p>
                                                                <p className="mb-0 w-50">: "নাই"</p>
                                                            </div>
                                                        </div>

                                                        <Table className='table-bordered'>
                                                            <thead>
                                                                <tr>
                                                                    <th>করের বিবরণ</th>
                                                                    <th>বকেয়া</th>
                                                                    <th>চলতি</th>
                                                                    <th>মোট</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>হোল্ডিং কর</td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>পূর্বের বকেয়া</td>
                                                                    <td>{data?.previes_areas_tax}</td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>জরিমানা</td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={3}>সর্বমোট</td>
                                                                    <td>{data?.previes_areas_tax}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>

                                                        <Table className='table-bordered'>
                                                            <tbody>
                                                                <tr>
                                                                    <td>প্রাপ্ত টাকা</td>
                                                                    <td width="30%"> </td>
                                                                    <td width="30%"> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>প্রাপ্ত টাকা কথায়</td>
                                                                    <td width="30%"></td>
                                                                    <td rowSpan={2} width="30%"> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={1}>কর আদায়কারির স্বাক্ষর</td>
                                                                    <td width="30%"> </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>

                                                        <div className="text-center mt-2">
                                                            <p className="mb-0">নিয়মিত ইউপি কর পরিশোধ করুন। ইউনিয়নের উন্নয়নে অংশগ্রহন করুন।</p>
                                                            <p style={{ fontSize: "14px" }}>ইউনিয়ন পরিষদের সকল পরিসেবা গ্রহনকালে উক্ত বইল পরিশধের ফটোকপি সংযুক্ত করতে হবে
                                                            </p>
                                                        </div>
                                                    </Col>


                                                    <Col className="py-3 px-5" key={data._id}>
                                                        <Row xs="auto" className="text-center">

                                                            <Col className="pt-4" style={{ width: '65px', height: "65px" }}>
                                                                <Image src={logo} className="img-fluid" />
                                                            </Col>

                                                            <Col>
                                                                <p className="fs-4 mb-0">{pMainData?.name} কার্যালয়</p>
                                                                <p className="mb-0">{pMainData?.location}</p>
                                                                <p className="fs-5  mb-0">ইউপি করের বিল</p>
                                                                <div className="d-flex justify-content-between text-center">
                                                                    <p className="mb-0 border-bottom">গ্রাহক কপি</p>
                                                                    <p className="mb-0 border-bottom">অর্থ বছরঃ ২০২১-২২</p>
                                                                </div>
                                                            </Col>

                                                            <Col className="pt-4" style={{ width: '65px', height: "65px" }}>
                                                                <Image src={logo} className="img-fluid" />
                                                            </Col>
                                                        </Row>

                                                        <div className="py-2">
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">ওয়ার্ড নং</p>
                                                                <p className="mb-0 w-50">: {data?.word_no}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">হোল্ডিং নং</p>
                                                                <p className="mb-0 w-50">: {data?.holding_no}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">করদাতার নামঃ</p>
                                                                <p className="mb-0 w-50">: {data?.payer_name}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">পিতা/স্বামীর নাম</p>
                                                                <p className="mb-0 w-50">: {data?.guardian_name}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">বিলের ঠিকানাঃ </p>
                                                                <p className="mb-0 w-50">: "নাই"</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">মোবাইল</p>
                                                                <p className="mb-0 w-50">: {data?.mobile_no}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">বিল ইসুর তারিখঃ</p>
                                                                <p className="mb-0 w-50">: "নাই"</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <p className="mb-0 w-50">জমাদানের শেষ তারিখঃ </p>
                                                                <p className="mb-0 w-50">: "নাই"</p>
                                                            </div>
                                                        </div>

                                                        <Table className='table-bordered'>
                                                            <thead>
                                                                <tr>
                                                                    <th>করের বিবরণ</th>
                                                                    <th>বকেয়া</th>
                                                                    <th>চলতি</th>
                                                                    <th>মোট</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>হোল্ডিং কর</td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>পূর্বের বকেয়া</td>
                                                                    <td>{data?.previes_areas_tax}</td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>জরিমানা</td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                    <td> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={3}>সর্বমোট</td>
                                                                    <td>{data?.previes_areas_tax}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>

                                                        <Table className='table-bordered'>
                                                            <tbody>
                                                                <tr>
                                                                    <td>প্রাপ্ত টাকা</td>
                                                                    <td width="30%"> </td>
                                                                    <td width="30%"> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>প্রাপ্ত টাকা কথায়</td>
                                                                    <td width="30%"></td>
                                                                    <td rowSpan={2} width="30%"> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={1}>কর আদায়কারির স্বাক্ষর</td>
                                                                    <td width="30%"> </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>

                                                        <div className="text-center mt-2">
                                                            <p className="mb-0">নিয়মিত ইউপি কর পরিশোধ করুন। ইউনিয়নের উন্নয়নে অংশগ্রহন করুন।</p>
                                                            <p style={{ fontSize: "14px" }}>ইউনিয়ন পরিষদের সকল পরিসেবা গ্রহনকালে উক্ত বইল পরিশধের ফটোকপি সংযুক্ত করতে হবে
                                                            </p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                // <tr key={txt?._id} >
                                                //     <td>{txt?.holding_no}</td>
                                                //     <td>{txt?.payer_name}</td>
                                                //     <td>{txt?.business_org}</td>
                                                //     <td>{txt?.word_no}</td>
                                                //     <td>{txt?.village}</td>
                                                //     <td>{txt?.assign_tax}</td>
                                                //     <td>{txt?.previes_areas_tax}</td>
                                                //     <td>{txt?.total_tax}</td>
                                                //     <td>{txt?.mobile_no}</td>
                                                // </tr>
                                            )}
                                        </div>
                                        {/* </tbody>
                                        </Table> */}
                                    </div>

                                    <div className="my-5">
                                        <p className="fs-4 fw-bold border-bottom">ডাটা রেঞ্জ সিলেক্ট করুন</p>
                                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" >
                                            <Col className="me-2">
                                                <Form.Control type="number" onBlur={(e) => setRanges(e.target.value)} placeholder="শুরু নং" />
                                            </Col>
                                            <Col >
                                                <Form.Control type="number" onBlur={(e) => setRangee(e.target.value)} placeholder="শেষ নং" />
                                            </Col>
                                        </Form.Group>
                                        <Button variant="success" onClick={() => { handleRange() }}>ডাটা খুঁজুন</Button>

                                        {rangeData.length > 0 ?
                                            <>
                                                <p>ডাটা পাওয়া গেছে {rangeData.length}</p>
                                                <Button variant="success" onClick={handleRangePrint}>{rangeData.length} টি ডাটা প্রিন্ট করুন</Button>
                                                <div className="d-none">
                                                    <div ref={componentRangeRef} className="billPrint  print-landscape-a4">

                                                        {/* <Table striped hover ref={componentRangeRef}>
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>কর দাতার নাম</th>
                                                                <th>ব্যাবসা প্রতিষ্ঠান</th>
                                                                <th>ওয়ার্ড নং</th>
                                                                <th>গ্রাম</th>
                                                                <th>ধার্যকৃত কর</th>
                                                                <th>পূর্বের বকেয়া কর</th>
                                                                <th>মোট কর</th>
                                                                <th>মোবাইল</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody> */}
                                                        {rangeData?.map(data =>
                                                            <Row key={data._id} style={{ height: "100vh", width: "100vw" }}>
                                                                <Col className="py-3 px-5" key={data._id}>
                                                                    <Row xs="auto" className="text-center">


                                                                        <Col className="pt-4" style={{ width: '65px', height: "65px" }}>
                                                                            <Image src={logo} className="img-fluid" />
                                                                        </Col>

                                                                        <Col>
                                                                            <p className="fs-4 mb-0">{pMainData?.name} কার্যালয়</p>
                                                                            <p className="mb-0">{pMainData?.location}</p>
                                                                            <p className="fs-5  mb-0">ইউপি করের বিল</p>
                                                                            <div className="d-flex justify-content-between text-center">
                                                                                <p className="mb-0 border-bottom">ইউপি কপি</p>
                                                                                <p className="mb-0 border-bottom">অর্থ বছরঃ ২০২১-২২</p>
                                                                            </div>
                                                                        </Col>

                                                                        <Col className="pt-4" style={{ width: '65px', height: "65px" }}>
                                                                            <Image src={logo} className="img-fluid" />
                                                                        </Col>
                                                                    </Row>

                                                                    <div className="py-2">
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">ওয়ার্ড নং</p>
                                                                            <p className="mb-0 w-50">: {data?.word_no}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">হোল্ডিং নং</p>
                                                                            <p className="mb-0 w-50">: {data?.holding_no}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">করদাতার নামঃ</p>
                                                                            <p className="mb-0 w-50">: {data?.payer_name}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">পিতা/স্বামীর নাম</p>
                                                                            <p className="mb-0 w-50">: {data?.guardian_name}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">বিলের ঠিকানাঃ </p>
                                                                            <p className="mb-0 w-50">: "নাই"</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">মোবাইল</p>
                                                                            <p className="mb-0 w-50">: {data?.mobile_no}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">বিল ইসুর তারিখঃ</p>
                                                                            <p className="mb-0 w-50">: "নাই"</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">জমাদানের শেষ তারিখঃ </p>
                                                                            <p className="mb-0 w-50">: "নাই"</p>
                                                                        </div>
                                                                    </div>

                                                                    <Table className='table-bordered'>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>করের বিবরণ</th>
                                                                                <th>বকেয়া</th>
                                                                                <th>চলতি</th>
                                                                                <th>মোট</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>হোল্ডিং কর</td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>পূর্বের বকেয়া</td>
                                                                                <td>{data?.previes_areas_tax}</td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>জরিমানা</td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colSpan={3}>সর্বমোট</td>
                                                                                <td>{data?.previes_areas_tax}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>

                                                                    <Table className='table-bordered'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>প্রাপ্ত টাকা</td>
                                                                                <td width="30%"> </td>
                                                                                <td width="30%"> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>প্রাপ্ত টাকা কথায়</td>
                                                                                <td width="30%"></td>
                                                                                <td rowSpan={2} width="30%"> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colSpan={1}>কর আদায়কারির স্বাক্ষর</td>
                                                                                <td width="30%"> </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>

                                                                    <div className="text-center mt-2">
                                                                        <p className="mb-0">নিয়মিত ইউপি কর পরিশোধ করুন। ইউনিয়নের উন্নয়নে অংশগ্রহন করুন।</p>
                                                                        <p style={{ fontSize: "14px" }}>ইউনিয়ন পরিষদের সকল পরিসেবা গ্রহনকালে উক্ত বইল পরিশধের ফটোকপি সংযুক্ত করতে হবে
                                                                        </p>
                                                                    </div>
                                                                </Col>


                                                                <Col className="py-3 px-5" key={data._id}>
                                                                    <Row xs="auto" className="text-center">

                                                                        <Col className="pt-4" style={{ width: '65px', height: "65px" }}>
                                                                            <Image src={logo} className="img-fluid" />
                                                                        </Col>

                                                                        <Col >
                                                                            <p className="fs-4 mb-0">{pMainData?.name} কার্যালয়</p>
                                                                            <p className="mb-0">{pMainData?.location}</p>
                                                                            <p className="fs-5  mb-0">ইউপি করের বিল</p>
                                                                            <div className="d-flex justify-content-between text-center">
                                                                                <p className="mb-0 border-bottom">গ্রাহক কপি</p>
                                                                                <p className="mb-0 border-bottom">অর্থ বছরঃ ২০২১-২২</p>
                                                                            </div>
                                                                        </Col>

                                                                        <Col className="pt-4" style={{ width: '65px', height: "65px" }}>
                                                                            <Image src={logo} className="img-fluid" />
                                                                        </Col>
                                                                    </Row>

                                                                    <div className="py-2">
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">ওয়ার্ড নং</p>
                                                                            <p className="mb-0 w-50">: {data?.word_no}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">হোল্ডিং নং</p>
                                                                            <p className="mb-0 w-50">: {data?.holding_no}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">করদাতার নামঃ</p>
                                                                            <p className="mb-0 w-50">: {data?.payer_name}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">পিতা/স্বামীর নাম</p>
                                                                            <p className="mb-0 w-50">: {data?.guardian_name}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">বিলের ঠিকানাঃ </p>
                                                                            <p className="mb-0 w-50">: "নাই"</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">মোবাইল</p>
                                                                            <p className="mb-0 w-50">: {data?.mobile_no}</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">বিল ইসুর তারিখঃ</p>
                                                                            <p className="mb-0 w-50">: "নাই"</p>
                                                                        </div>
                                                                        <div className="d-flex">
                                                                            <p className="mb-0 w-50">জমাদানের শেষ তারিখঃ </p>
                                                                            <p className="mb-0 w-50">: "নাই"</p>
                                                                        </div>
                                                                    </div>

                                                                    <Table className='table-bordered'>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>করের বিবরণ</th>
                                                                                <th>বকেয়া</th>
                                                                                <th>চলতি</th>
                                                                                <th>মোট</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>হোল্ডিং কর</td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>পূর্বের বকেয়া</td>
                                                                                <td>{data?.previes_areas_tax}</td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>জরিমানা</td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                                <td> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colSpan={3}>সর্বমোট</td>
                                                                                <td>{data?.previes_areas_tax}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>

                                                                    <Table className='table-bordered'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>প্রাপ্ত টাকা</td>
                                                                                <td width="30%"> </td>
                                                                                <td width="30%"> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>প্রাপ্ত টাকা কথায়</td>
                                                                                <td width="30%"></td>
                                                                                <td rowSpan={2} width="30%"> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colSpan={1}>কর আদায়কারির স্বাক্ষর</td>
                                                                                <td width="30%"> </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </Table>

                                                                    <div className="text-center mt-2">
                                                                        <p className="mb-0">নিয়মিত ইউপি কর পরিশোধ করুন। ইউনিয়নের উন্নয়নে অংশগ্রহন করুন।</p>
                                                                        <p style={{ fontSize: "14px" }}>ইউনিয়ন পরিষদের সকল পরিসেবা গ্রহনকালে উক্ত বইল পরিশধের ফটোকপি সংযুক্ত করতে হবে
                                                                        </p>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            // <tr key={txt?._id} >
                                                            //     <td>{txt?.holding_no}</td>
                                                            //     <td>{txt?.payer_name}</td>
                                                            //     <td>{txt?.business_org}</td>
                                                            //     <td>{txt?.word_no}</td>
                                                            //     <td>{txt?.village}</td>
                                                            //     <td>{txt?.assign_tax}</td>
                                                            //     <td>{txt?.previes_areas_tax}</td>
                                                            //     <td>{txt?.total_tax}</td>
                                                            //     <td>{txt?.mobile_no}</td>
                                                            // </tr>
                                                        )}
                                                    </div>
                                                    {/* </tbody>
                                                    </Table> */}
                                                </div>
                                            </>
                                            : <p>"কোন ডাটা পাওয়া যায় নি!"</p>}

                                        {error ? <Alert>{error}</Alert> : ""}
                                    </div>
                                </> : <p>"কোন ডাটা পাওয়া যায় নি!"</p>}
                        </div>
                    </Col>

                </Row>

            </Modal.Body>
            {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
        </Modal >
    );
}

export default BillPrint;