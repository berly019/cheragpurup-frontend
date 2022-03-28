import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { Button, Image, Modal, Table, } from "react-bootstrap";
import logo from '../../../../../media/logo.png';
import '../../Certificate.css';


function CCModalShow(props) {
    const id = props.id;
    const [data, setData] = useState([]);
    const [pMData, setPMData] = useState([]);

    useEffect(() => {
        axios.get(`https://khadimpur-mongoose-backend.herokuapp.com/up/inheritance_certificate/${id}`)
            .then((data) => {
                setData(data.data);
            })
    }, [id]);
    useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/pMain')
            .then(data => {
                setPMData(data?.data[0]);
            })
    }, [])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: `ওয়ারিশ সনদপত্র ${data?.memorandum_no}`,
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
                    <p className="text-success m-0 fs-4">ওয়ারিশ সনদপত্র</p>
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
                        <p className="fs-5 fw-bold text-success mb-0">{pMData?.name}</p>
                        <p className="mb-1">উপজেলা:- আলমডাঙ্গা, জেলা:- চুয়াডাঙ্গা</p>
                        <p className="text-danger mx-auto fs-4 fw-bold mb-0 px-4" style={{ border: "2px solid black", borderRadius: "10px", width: "fit-content" }}>ওয়ারিশ সনদপত্র</p>
                    </div>
                    <div className="py-2 my-3">
                        <div className="d-flex justify-content-between">
                            <p>স্মারক নং: ইউপি/-{data?.memorandum_no}</p>
                            <p>তারিখ: {tDate}</p>
                        </div>
                        <p style={{ textAlign: 'justify' }}>
                            এই মর্মে ওয়ারিশ সনদপত্র প্রদান করা যাইতেছে যে {data?.applicant_name}, পিতা/স্বামী {data?.guardian_name}, মাতা {data?.mother_name}, গ্রাম {data?.village} , ওয়ার্ড নং {data?.word_no} পোস্ট অফিস {data?.post_office} , উপজেলা:- আলমডাঙ্গা; জেলা:- চুয়াডাঙ্গা; কে আমি ব্যক্তিগতভাবে চিনি ও জানি। তিনি বাংলাদেশের নাগরিক ও অত্র ইউনিয়নের স্থায়ী বাসিন্দা। তিনি মৃত্যুকালে নিম্ন বর্ণিত ওয়ারিশ রাখিয়া যান।
                        </p>
                        <Table responsive borderless className="text-center snood-logo snood-logo2">
                            <thead>
                                <tr>
                                    <th>ক্রম নং</th>
                                    <th>নাম</th>
                                    <th>সম্পর্ক</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* {int?.text1 ? <p>১। {int?.text1}</p> : ""}*/}
                                    <td className='p-1'>১।</td>
                                    <td className='p-1'>{data?.name1}</td>
                                    <td className='p-1'>{data.relation1}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>২।</td>
                                    <td className='p-1'>{data?.name2}</td>
                                    <td className='p-1'>{data.relation2}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>৩।</td>
                                    <td className='p-1'>{data?.name3}</td>
                                    <td className='p-1'>{data.relation3}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>৪।</td>
                                    <td className='p-1'>{data?.name4}</td>
                                    <td className='p-1'>{data.relation4}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>৫।</td>
                                    <td className='p-1'>{data?.name5}</td>
                                    <td className='p-1'>{data.relation5}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>৬।</td>
                                    <td className='p-1'>{data?.name6}</td>
                                    <td className='p-1'>{data.relation6}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>৭।</td>
                                    <td className='p-1'>{data?.name7}</td>
                                    <td className='p-1'>{data.relation7}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>৮।</td>
                                    <td className='p-1'>{data?.name8}</td>
                                    <td className='p-1'>{data.relation8}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>৯।</td>
                                    <td className='p-1'>{data?.name9}</td>
                                    <td className='p-1'>{data.relation9}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>১০।</td>
                                    <td className='p-1'>{data?.name10}</td>
                                    <td className='p-1'>{data.relation10}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>১১।</td>
                                    <td className='p-1'>{data?.name11}</td>
                                    <td className='p-1'>{data.relation11}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>১২।</td>
                                    <td className='p-1'>{data?.name12}</td>
                                    <td className='p-1'>{data.relation12}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>১৩।</td>
                                    <td className='p-1'>{data?.name13}</td>
                                    <td className='p-1'>{data.relation13}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>১৪।</td>
                                    <td className='p-1'>{data?.name14}</td>
                                    <td className='p-1'>{data.relation14}</td>
                                </tr>
                                <tr>
                                    <td className='p-1'>১৫।</td>
                                    <td className='p-1'>{data?.name15}</td>
                                    <td className='p-1'>{data.relation15}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <p>
                            উল্লেখিত ওয়ারিশ ছাড়া তাহার আর কোন ওয়ারিশ নাই। ইহা আমার জানামতে সত্য। এই তথ্য {pMData?.name} ইউপি সদস্য জনাব/জনাবা {data?.marital_status} দ্বারা সত্যায়িত।
                        </p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <p className="text-center">
                            চেয়ারম্যান<br />
                            {pMData?.name}<br />
                            {pMData?.location}
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