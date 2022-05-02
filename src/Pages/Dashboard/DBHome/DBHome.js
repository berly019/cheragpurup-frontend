import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import DHTableEdit from './DHTableEdit/DHTableEdit';
import { FiEdit } from 'react-icons/fi';
import { DataContext } from '../../../contexts/DataContext';

const DBHome = () => {

    const { totalData, pMainData, homeData, isLoading } = useContext(DataContext);


    // const [totalData, setTotalData] = React.useState([]);
    const [modalData, setModalEData] = React.useState('');
    const [showAlert, setShowAlert] = useState(false);

    // for edit modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1000)
    }

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [homeData])

    // const [residentData, setResidentData] = React.useState([]);
    // const [rFilteredData, setRFilteredData] = React.useState([]);
    // const [commerceData, setCommerceData] = React.useState([]);
    // const [cFilteredData, setCFilteredData] = React.useState([]);

    // const [totalTax, setTotalTax] = React.useState(0);
    // const [collectedTax, setCollectedTax] = React.useState(0);
    // const [areasTax, setAreasTax] = React.useState(0);

    // commerce
    // const [cTotalTax, setCTotalTax] = React.useState(0);
    // const [cCollectedTax, setCCollectedTax] = React.useState(0);
    // const [cAreasTax, setCAreasTax] = React.useState(0);

    // total calculate
    // const [rcTotalTax, setRCTotalTax] = React.useState(0);
    // const [rcCollectedTax, setRCCollectedTax] = React.useState(0);
    // const [rcAreasTax, setRCAreasTax] = React.useState(0);

    /*     const [treasLicenseData, setTreasLicenseData] = React.useState([]);
    
        const [CCData, setCCData] = React.useState([]);
        const [ccFilteredData, setCCFilteredData] = React.useState([]);
        const [CNData, setCNData] = React.useState([]);
        const [cnFilteredData, setCNFilteredData] = React.useState([]);
        const [COData, setCOData] = React.useState([]);
        const [coFilteredData, setCOFilteredData] = React.useState([]); */


    // const [dbTaxR, setDBTaxR] = React.useState(0);

    // const handleApi = () => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/db_home`)
    //         .then(data => {
    //             setHomeData(data?.data);
    //             console.log(data?.data);
    //             setIsLoading(true);
    //         });

    // axios.get(`${process.env.REACT_APP_BASE_URL}/up/db_home/6249ebaa4c1ff21f2a664fa2`)
    //     .then(data => {
    //         setTotalData(data?.data);
    //     });

    // axios.get('${process.env.REACT_APP_BASE_URL}/up/resident')
    //     .then(data => {
    //         setResidentData(data?.data);
    //         setRFilteredData(data?.data);
    //     });

    // axios.get('${process.env.REACT_APP_BASE_URL}/up/commerce')
    //     .then(data => {
    //         setCommerceData(data?.data);
    //         setCFilteredData(data?.data);
    //     });

    // axios.get('${process.env.REACT_APP_BASE_URL}/up/tread_license')
    //     .then(data => {
    //         setTreasLicenseData(data?.data);
    //     });

    // axios.get('${process.env.REACT_APP_BASE_URL}/up/character_certificate')
    //     .then(data => {
    //         setCCData(data?.data);
    //         setCCFilteredData(data?.data);
    //     });

    // axios.get('${process.env.REACT_APP_BASE_URL}/up/citizen_certificate')
    //     .then(data => {
    //         setCNData(data?.data);
    //         setCNFilteredData(data?.data);
    //     });

    // axios.get('${process.env.REACT_APP_BASE_URL}/up/inheritance_certificate')
    //     .then(data => {
    //         setCOData(data?.data);
    //         setCOFilteredData(data?.data);
    //     });


    // }

    // useEffect(() => {
    //     handleApi();
    // }, [])


    // residentData filter and calculate
    /*     const handleRWordFilter = id => {
            const matchedWord = residentData.filter(data => data.word_no.toString().includes(id));
            setRFilteredData(matchedWord);
        } */
    /* useEffect(() => {
        const totalTax = rFilteredData.reduce((currentSum, nextObject) => {
            return currentSum + +nextObject.total_tax;
        }, 0);
        setTotalTax(totalTax);

        const collectedTax = rFilteredData.reduce((currentSum, nextObject) => {
            return currentSum + +nextObject.collected_tax;
        }, 0);
        setCollectedTax(collectedTax);

        const areasTax = rFilteredData.reduce((currentSum, nextObject) => {
            return currentSum + +nextObject.areas_tax;
        }, 0);
        setAreasTax(areasTax);
    }, [rFilteredData]) */

    // commerceData filter and calculate
    /*  const handleCWordFilter = id => {
         const matchedWord = commerceData.filter(data => data.word_no.toString().includes(id));
         setCFilteredData(matchedWord);
     } */
    /*  useEffect(() => {
         const totalTax = cFilteredData.reduce((currentSum, nextObject) => {
             return currentSum + +nextObject.total_tax;
         }, 0);
         setCTotalTax(totalTax);
 
         const collectedTax = cFilteredData.reduce((currentSum, nextObject) => {
             return currentSum + +nextObject.collected_tax;
         }, 0);
         setCCollectedTax(collectedTax);
 
         const areasTax = cFilteredData.reduce((currentSum, nextObject) => {
             return currentSum + +nextObject.areas_tax;
         }, 0);
         setCAreasTax(areasTax);
     }, [cFilteredData]) */

    // certificate filter
    /*     const handleCPWordFilter = id => {
            const ccMatchedWord = CCData.filter(data => data.word_no.toString().includes(id));
            setCCFilteredData(ccMatchedWord);
    
            const cnMatchedWord = CNData.filter(data => data.word_no.toString().includes(id));
            setCNFilteredData(cnMatchedWord);
    
            const coMatchedWord = COData.filter(data => data.word_no.toString().includes(id));
            setCOFilteredData(coMatchedWord);
        } */

    // db table
    // useEffect(() => {
    //     const id = dbTax;
    //     const DBWord = residentData.filter(data => data.word_no.includes(id));
    //     // console.log(DBWord)

    //     const totalTax = DBWord.reduce((currentSum, nextObject) => {
    //         return currentSum + +nextObject.total_tax;
    //     }, 0);
    //     // setDBTax(totalTax);
    //     setDBTaxR(totalTax);
    // }, [dbTax, residentData]);


    // total calculate calculate
    // React.useEffect(() => {
    //     const residentTax = residentData.reduce((currentSum, nextObject) => {
    //         return currentSum + +nextObject.total_tax;
    //     }, 0);
    //     const commerceTax = commerceData.reduce((currentSum, nextObject) => {
    //         return currentSum + +nextObject.total_tax;
    //     }, 0);
    //     const totalTax = residentTax + commerceTax;
    //     setRCTotalTax(totalTax);

    //     const rCollectedTax = residentData.reduce((currentSum, nextObject) => {
    //         return currentSum + +nextObject.collected_tax;
    //     }, 0);
    //     const cCollectedTax = commerceData.reduce((currentSum, nextObject) => {
    //         return currentSum + +nextObject.collected_tax;
    //     }, 0);
    //     const collectedTax = rCollectedTax + cCollectedTax;
    //     setRCCollectedTax(collectedTax);

    //     const rAreasTax = residentData.reduce((currentSum, nextObject) => {
    //         return currentSum + +nextObject.areas_tax;
    //     }, 0);
    //     const cAreasTax = commerceData.reduce((currentSum, nextObject) => {
    //         return currentSum + +nextObject.areas_tax;
    //     }, 0);
    //     const areasTax = rAreasTax + cAreasTax;
    //     setRCAreasTax(areasTax);
    // }, [residentData, commerceData])

    /* 
        React.useEffect(() => {
        const totalATax = residentData.reduce((currentSum, nextObject) => {
            return currentSum + +nextObject.total_tax;
        }, 0);
        setTotalTax(totalATax);

        const collectedATax = residentData.reduce((currentSum, nextObject) => {
            return currentSum + +nextObject.collected_tax;
        }, 0);
        setCollectedTax(collectedATax);

        const areasATax = residentData.reduce((currentSum, nextObject) => {
            return currentSum + +nextObject.areas_tax;
        }, 0);
        setAreasTax(areasATax);
    }, [residentData])
    */
    // console.log(totalData)

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
            <Row xs={1} sm={2} lg={4} className="g-4 text-center pb-5">
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট জনসংখ্যা</Card.Title>
                            <Card.Text>{totalData?.total_population} জন</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট কর</Card.Title>
                            <Card.Text>{totalData?.total} ৳</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">আবাসিক কর</Card.Title>
                            <Card.Text>{totalData?.resident_tax} ৳</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">বাণিজ্যিক কর</Card.Title>
                            <Card.Text>{totalData?.commerce_tax} ৳</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* title */}
            <Row>
                <p className="fs-2 fw-bold text-center">এক নজরে {pMainData?.name}</p>
                <div className="mb-3 text-end">
                    {/* <Button variant="success" size="sm"><HiOutlinePlusCircle /> এডিট করুন</Button> */}

                </div>
            </Row>
            <Row className="px-2 px-md-0 overflow-auto ">
                <table className="table table-striped table-hover">
                    <thead className="bg-success text-white rounded-3 text-center">
                        <tr>
                            <th scope="col" className="fw-normal py-4" style={{ borderRadius: '1rem 0 0' }}>ওয়ার্ড নং</th>
                            <th scope="col" className="fw-normal py-4">আবাসিক খানা সংখ্যা</th>
                            <th scope="col" className="fw-normal py-4">বাণিজ্যিক খানা সংখ্যা</th>
                            <th scope="col" className="fw-normal py-4">আবাসিক কর</th>
                            <th scope="col" className="fw-normal py-4">বাণিজ্যিক কর</th>
                            <th scope="col" className="fw-normal py-4">সর্বমোট</th>
                            <th scope="col" className="fw-normal py-4">প্রতিবন্ধী</th>
                            <th scope="col" className="fw-normal py-4">প্রবাসী</th>
                            <th scope="col" className="fw-normal py-4">বিধবা</th>
                            <th scope="col" className="fw-normal py-4">ভিক্ষুক</th>
                            <th scope="col" className="fw-normal py-4">মুক্তিযোদ্ধা</th>
                            <th scope="col" className="fw-normal py-4">মোট জনসংখ্যা</th>
                            <th scope="col" className="fw-normal py-4" style={{ borderRadius: '0 1rem 0 0' }}>এডিট</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            homeData?.map(data =>
                                <tr key={data?._id}>
                                    <th scope="row">{data?.word_no}</th>
                                    <td>{data?.resident_thana}</td>
                                    <td>{data?.commerce_thana}</td>
                                    <td>{data?.resident_tax}/=</td>
                                    <td>{data?.commerce_tax}/=</td>
                                    <td>{data?.total}/=</td>
                                    <td>{data?.autism}</td>
                                    <td>{data?.expatriate}</td>
                                    <td>{data?.widow}</td>
                                    <td>{data?.beggar}</td>
                                    <td>{data?.freedom_fighters}</td>
                                    <td>{data?.total_population}</td>
                                    <td className='text-danger'>
                                        <FiEdit onClick={() => { handleShow(); setModalEData(data) }} style={{ cursor: 'pointer' }} /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </Row>

            {/* Residential */}
            <Row className="mt-5 text-center p-0 overflow-auto" style={{ borderRadius: '1rem', backgroundColor: '#FAFAFA', border: '1px solid #E6E6E6' }} >
                <p className="fs-4 fw-bold text-white py-3 mb-0 bg-dark">আবাসিক করদাতা</p>
                {/* <Row xs="auto" className="g-3 my-4 mx-auto justify-content-between">
                    <Col><Button variant="outline-success" onClick={() => handleRWordFilter(1)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ১</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleRWordFilter(2)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ২</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleRWordFilter(3)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৩</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleRWordFilter(4)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৪</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleRWordFilter(5)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৫</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleRWordFilter(6)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৬</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleRWordFilter(7)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৭</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleRWordFilter(8)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৮</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleRWordFilter(9)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৯</Button></Col>
                </Row> */}
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট কর দাতা</p>
                    <p className="text-danger mb-0">{totalData?.resident_thana} জন</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট কর</p>
                    <p className="text-danger mb-0">{totalData?.resident_tax} ৳</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট আদায়কৃত কর</p>
                    <p className="text-danger mb-0">{totalData?.resident_collected_tax} ৳</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট বকেয়া কর</p>
                    <p className="text-danger mb-0">{totalData?.resident_areas_tax} ৳</p>
                </Col>
                {/* <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">পুরুষ কর দাতা</p>
                    <p className="text-danger mb-0">{totalData?.resident_male} জন</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মহিলা কর দাতা</p>
                    <p className="text-danger mb-0">{totalData?.resident_female} জন</p>
                </Col> */}
            </Row>

            {/* Commercial */}
            <Row className="mt-5 text-center p-0 overflow-auto" style={{ borderRadius: '1rem', backgroundColor: '#FAFAFA', border: '1px solid #E6E6E6' }} >
                <p className="fs-4 fw-bold text-white py-3 mb-0 bg-dark">বানিজ্যিক করদাতা</p>
                {/* <Row xs="auto" className="g-3 my-4 mx-auto justify-content-between">
                    <Col><Button variant="outline-success" onClick={() => handleCWordFilter(1)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ১</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCWordFilter(2)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ২</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCWordFilter(3)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৩</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCWordFilter(4)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৪</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCWordFilter(5)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৫</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCWordFilter(6)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৬</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCWordFilter(7)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৭</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCWordFilter(8)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৮</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCWordFilter(9)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৯</Button></Col>
                </Row> */}
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট কর দাতা</p>
                    <p className="text-danger mb-0">{totalData?.commerce_thana} জন</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট কর</p>
                    <p className="text-danger mb-0">{totalData?.commerce_tax} ৳</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট আদায়কৃত কর</p>
                    <p className="text-danger mb-0">{totalData?.commerce_collected_tax} ৳</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট বকেয়া কর</p>
                    <p className="text-danger mb-0">{totalData?.commerce_areas_tax} ৳</p>
                </Col>
                {/* <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">পুরুষ কর দাতা</p>
                    <p className="text-danger mb-0">{totalData?.commerce_male} জন</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মহিলা কর দাতা</p>
                    <p className="text-danger mb-0">{totalData?.commerce_female} জন</p>
                </Col> */}
            </Row>

            {/* Tread License */}
            {/* <Row className="mt-5 text-center p-0 overflow-auto" style={{ borderRadius: '1rem', backgroundColor: '#FAFAFA', border: '1px solid #E6E6E6' }} >
                <p className="fs-4 fw-bold text-white py-3 mb-0 bg-dark">ট্রেড লাইসেন্স</p>
                <Col style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট ট্রেড লাইসেন্স</p>
                    <p className="text-danger mb-0">{totalData?.tread_license} টি</p>
                </Col>
            </Row> */}

            {/* Certificate */}
            <Row className="mt-5 text-center p-0 overflow-auto" style={{ borderRadius: '1rem', backgroundColor: '#FAFAFA', border: '1px solid #E6E6E6' }} >
                <p className="fs-4 fw-bold text-white py-3 mb-0 bg-dark">সনদপত্র ও ট্রেড লাইসেন্স</p>
                {/* <Row xs="auto" className="g-3 my-4 mx-auto justify-content-between">
                    <Col><Button variant="outline-success" onClick={() => handleCPWordFilter(1)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ১</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCPWordFilter(2)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ২</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCPWordFilter(3)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৩</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCPWordFilter(4)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৪</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCPWordFilter(5)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৫</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCPWordFilter(6)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৬</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCPWordFilter(7)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৭</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCPWordFilter(8)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৮</Button></Col>
                    <Col><Button variant="outline-success" onClick={() => handleCPWordFilter(9)} className="rounded-3 px-md-2 btn">ওয়ার্ড নং ৯</Button></Col>
                </Row> */}
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট চারিত্রিক সনদপত্র</p>
                    <p className="text-danger mb-0">{totalData?.character_certificate} টি</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট নাগরিক সনদপত্র</p>
                    <p className="text-danger mb-0">{totalData?.citizen_certificate} টি</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট ওয়ারিশ সনদপত্র</p>
                    <p className="text-danger mb-0">{totalData?.inheritance_certificate} টি</p>
                </Col>
                <Col xs={6} md={3} style={{ border: '1px solid #E6E6E6' }} className="py-4">
                    <p className="fs-5 mb-0 fw-bold">মোট ট্রেড লাইসেন্স</p>
                    <p className="text-danger mb-0">{totalData?.tread_license} টি</p>
                </Col>
            </Row>


            <Modal className="overflow-auto" show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ top: '50px', height: '90vh' }} scrollable="true"
            >
                <Modal.Header closeButton id="contained-modal-title-vcenter border-bottom" className="border-bottom">
                    {/* <Modal.Title id="contained-modal-title-vcenter"> */}
                    <div className="text-center" style={{ width: "96%" }}>
                        <p className="text-success m-0 fs-4">৬ নং দুবলহাটি ইউনিয়ন পরিষদ</p>
                        <p className="text-danger m-0">ওয়ার্ড নং {modalData?.word_no}</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>

                <Modal.Body className="px-5 pt-0" key={modalData?._id}>
                    <DHTableEdit modalData={modalData} />
                </Modal.Body>
            </Modal>

            <Alert className="alertCss" show={showAlert} variant="light">
                Dashboard List Updated Successfully!
            </Alert>
        </Container>
    );
};

export default DBHome;