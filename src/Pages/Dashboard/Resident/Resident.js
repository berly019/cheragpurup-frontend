import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import './Resident.css';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import RSModalAdd from './RSModalAdd/RSModalAdd';
import RSModalEdit from './RSModalEdit/RSModalEdit';
import axios from 'axios';
import RSModalShow from './RSModalShow/RSModalShow';
import { MdOutlineMailOutline, MdOutlineMarkEmailRead } from 'react-icons/md';
import ReactPaginate from 'react-paginate';

const Residential = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    // const [success, setSuccess] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalShowF, setModalShowF] = React.useState(false);
    const [modalId, setModalId] = React.useState('');
    const [modalEId, setModalEId] = React.useState('');
    // const [modalEId, setModalEId] = React.useState('');
    // const [residentData, setResidentData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [filteredDataTwo, setFilteredDataTwo] = React.useState([]);
    const word = JSON.parse(localStorage.getItem("rWord"));
    const pageNo = JSON.parse(localStorage.getItem("rPage"));

    // const [totalTax, setTotalTax] = React.useState(0);
    // const [collectedTax, setCollectedTax] = React.useState(0);
    // const [areasTax, setAreasTax] = React.useState(0);

    const [selectValue, setSelectValue] = useState(10);
    const [pageNumber, setPageNumber] = React.useState(Number(pageNo) ? Number(pageNo) : 0);
    const [pageOffset, setPageOffset] = useState(0);
    const dataPerPage = selectValue;
    const dataVisited = pageNumber * dataPerPage;
    const displayData = filteredDataTwo?.slice(dataVisited, dataVisited + dataPerPage);
    const pageCount = Math.ceil(filteredDataTwo?.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    React.useEffect(() => {
        localStorage.setItem("rPage", JSON.stringify(pageNumber));

        if (word === "all") {
            async function fetchData() {
                let data = await axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/resident')
                // let data = await res.json();
                setFilteredData(data.data);
                setFilteredDataTwo(data.data);
                setIsLoading(true);
            }
            fetchData();
        } else {

            axios.get(`https://khadimpur-mongoose-backend.herokuapp.com/up/resident/word/${word ? word : 1}`)
                .then(data => {
                    // setResidentData(data.data);
                    setFilteredData(data.data);
                    setFilteredDataTwo(data.data);
                    setIsLoading(true);
                    // console.log(data.data);
                })
        }

        setPageOffset(Number(pageNo) ? Number(pageNo) : 0);
    }, [word, pageNumber, pageNo]);

    const handleAllFilter = () => {
        localStorage.setItem("rWord", JSON.stringify("all"));

        async function fetchData() {
            let data = await axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/resident')
            // let data = await res.json();
            setFilteredData(data.data);
            setFilteredDataTwo(data.data);
            setIsLoading(true);
        }
        fetchData();

        setPageNumber(0);
        setPageOffset(0);
    };

    const [activeIndex, setActiveIndex] = React.useState(word ? word : 1);
    const handleOnClick = index => {
        setActiveIndex(index);
        // remove the curly braces
    };

    const handleEditOnClick = id => {
        setModalEId(id);
    }

    // useEffect(() => {
    //     async function fetchData() {
    //         let res = await axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/resident')
    //         let data = await res.json();
    //             // .then(data => {
    //                 // setResidentData(data.data);
    //                 setFilteredData(data.data);
    //                 setFilteredDataTwo(data.data);
    //                 setIsLoading(true);
    //             // })
    //     }
    //     fetchChar()
    // }, []);

    const [totalData, setTotalData] = React.useState([])
    useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/db_home/6235e95c87b37a195cb34d64')
            .then(data => {
                setTotalData(data?.data);
            });
    }, []);

    // filters
    const handleWordFilter = id => {
        localStorage.setItem("rWord", JSON.stringify(id));

        // const matchedWord = residentData.filter(data => data.word_no.includes(id));
        axios.get(`https://khadimpur-mongoose-backend.herokuapp.com/up/resident/word/${id}`)
            .then(data => {
                setFilteredData(data.data)
                setFilteredDataTwo(data.data)
                console.log(data.data)
            });
        setPageNumber(0);
        setPageOffset(0);
    }
    const handleNameFilter = e => {
        const name = e.target.value;
        const matchedName = filteredData?.filter(data => data?.payer_name?.includes(name));
        setFilteredDataTwo(matchedName);
    }
    const handleHoldingFilter = e => {
        let holding = e.target.value;
        const matchedHolding = filteredData?.filter(data => data?.holding_no?.toString().includes(holding));
        setFilteredDataTwo(matchedHolding);
    }
    const handlePhoneFilter = e => {
        const mobile = e.target.value;
        const matchedMobile = filteredData?.filter(data => data?.mobile_no?.toString().includes(mobile));
        setFilteredDataTwo(matchedMobile);
    }

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

                /* //code for JavaScript-Fetch
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                const raw = "";
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                fetch(`http://66.45.237.70/api.php?username=01789228396&password=2YVHA9G3&number=88${num}&message=Test API`, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                //code for JavaScript-Fetch */

                const apiKey = "81e2KlJ8XZt98Q6N18Ecr88iNNBg2519Hp4DDyGW";
                const message = `খাদিমপুর ইউপি, আপনার ওয়ার্ড নংঃ ${word}, হোল্ডিং নংঃ ${holding}, পূর্বের বকেয়া করঃ ${previes_areas_tax} টাকা, ধার্যক্রিত করঃ ${assign_tax} টাকা, মোট করঃ ${total} টাকা, আদায়কৃত করঃ ${collected_tax} টাকা, বকেয়া করঃ ${areas_tax} টাকা, ধন্যবাদ।`

                // const message = `thank you I am from chitla`
                // const message = `খাদিমপুর ইউপি, আপনার ওয়ার্ড নংঃ ${word} । হোল্ডিং নংঃ ${holding} । পূর্বের বকেয়া করঃ ${previes_areas_tax} টাকা। ধার্যক্রিত করঃ ${assign_tax} টাকা। মোট করঃ ${total} টাকা। ধন্যবাদ।`

                // send sms
                fetch(`https://api.sms.net.bd/sendsms?api_key=${apiKey}&msg=${message}&to=880${num}`)
                    .then(response => response.json())
                    .then(result => {
                        window.alert(result?.msg)
                        // window.alert({obj});
                    })
                    .catch(error => console.log('error', error));

                // data.sms = '< MdOutlineMarkEmailRead />';
                axios.put(`https://khadimpur-mongoose-backend.herokuapp.com/up/resident/sms/${id}`, (data))
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
                const message = `খাদিমপুর ইউপি, আপনার ওয়ার্ড নংঃ ${word}, হোল্ডিং নংঃ ${holding}, পূর্বের বকেয়া করঃ ${previes_areas_tax} টাকা, ধার্যক্রিত করঃ ${assign_tax} টাকা, মোট করঃ ${total} টাকা, আদায়কৃত করঃ ${collected_tax} টাকা, বকেয়া করঃ ${areas_tax} টাকা, ধন্যবাদ।`

                // const message = `খাদিমপুর ইউপি, আপনার ওয়ার্ড নংঃ ${word} । হোল্ডিং নংঃ ${holding} । পূর্বের বকেয়া করঃ ${previes_areas_tax} টাকা। ধার্যক্রিত করঃ ${assign_tax} টাকা। মোট করঃ ${total} টাকা। ধন্যবাদ।`

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
                axios.put(`https://khadimpur-mongoose-backend.herokuapp.com/up/resident/sms/${id}`, (data))
                    .then((res) => {
                        // setSuccess(true);
                        // handle success
                        // console.log(res);
                    });
            }
        }
    }

    // residentData filter
    /*     React.useEffect(() => {
            const totalATax = residentData.reduce((currentSum, nextObject) => {
                return currentSum + +nextObject.total_tax;
            }, 0);
            setTotalTax(totalATax);
            // console.log(totalATax);
    
            const collectedATax = residentData.reduce((currentSum, nextObject) => {
                return currentSum + +nextObject.collected_tax;
            }, 0);
            setCollectedTax(collectedATax);
    
            const areasATax = residentData.reduce((currentSum, nextObject) => {
                return currentSum + +nextObject.areas_tax;
            }, 0);
            setAreasTax(areasATax);
        }, [residentData]) */

    const handleReset = () => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/resident')
            .then(data => {
                // setResidentData(data.data);
                setFilteredData(data.data);
                setFilteredDataTwo(data.data);
                setIsLoading(true);
            })
    }


    // const [showElement, setShowElement] = React.useState(false)
    // useEffect(() => {
    //     setTimeout(function () {
    //         setShowElement(true)
    //     }, 5000);
    // }, [])
    // // active class
    // const btns = document.getElementsByClassName("btn-sub");
    // for (let i = 0; i < btns.length; i++) {
    //     btns[i].addEventListener("click", function () {
    //         const current = document.getElementsByClassName("color-active");
    //         current[0].className = current[0].className.replace(" color-active", "");
    //         this.className += " color-active";
    //     });
    // }

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
            <Row xs={1} sm={2} lg={4} className="g-4 text-center">
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট কর দাতা</Card.Title>
                            <Card.Text>{totalData?.resident_thana} জন</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট কর</Card.Title>
                            <Card.Text>{totalData?.resident_tax} ৳</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট আদায়কৃত কর</Card.Title>
                            <Card.Text>{totalData?.resident_collected_tax} ৳</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট বকেয়া করঃ</Card.Title>
                            <Card.Text>{totalData?.resident_areas_tax} ৳ </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row xs="auto" className="g-4 text-center my-5 justify-content-center align-items-center">
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(1); handleWordFilter(1) }} className={`rounded-3 px-2 ${activeIndex === 1 ? "active" : ""}`}>ওয়ার্ড নং ১</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(2); handleWordFilter(2) }} className={`rounded-3 px-2 ${activeIndex === 2 ? "active" : ""}`}>ওয়ার্ড নং ২</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(3); handleWordFilter(3) }} className={`rounded-3 px-2 ${activeIndex === 3 ? "active" : ""}`}>ওয়ার্ড নং ৩</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(4); handleWordFilter(4) }} className={`rounded-3 px-2 ${activeIndex === 4 ? "active" : ""}`}>ওয়ার্ড নং ৪</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(5); handleWordFilter(5) }} className={`rounded-3 px-2 ${activeIndex === 5 ? "active" : ""}`}>ওয়ার্ড নং ৫</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(6); handleWordFilter(6) }} className={`rounded-3 px-2 ${activeIndex === 6 ? "active" : ""}`}>ওয়ার্ড নং ৬</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(7); handleWordFilter(7) }} className={`rounded-3 px-2 ${activeIndex === 7 ? "active" : ""}`}>ওয়ার্ড নং ৭</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(8); handleWordFilter(8) }} className={`rounded-3 px-2 ${activeIndex === 8 ? "active" : ""}`}>ওয়ার্ড নং ৮</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(9); handleWordFilter(9) }} className={`rounded-3 px-2 ${activeIndex === 9 ? "active" : ""}`}>ওয়ার্ড নং ৯</Button></Col>
                <Col> <Button variant="outline-success" onClick={() => { handleAllFilter(); handleOnClick("all"); }} className={`${activeIndex === "all" ? "active" : ""}`}>সকল ওয়ার্ড</Button></Col>
            </Row>

            <Row className="my-5 border-bottom">
                <Col className="pb-2">
                    <select className="select-form">
                        <option>Filter</option>
                        {/* <option value='10'>Ten</option>
                        <option value='20'>Twenty</option>
                        <option value='30'>Thirty</option> */}
                    </select>
                </Col>
                <Form>
                    <Row xs={2} md={2} lg={4} className="flex-column flex-sm-row align-items-center">
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                কর দাতার নামঃ
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" onChange={handleNameFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="5">
                                হোল্ডিং নংঃ
                            </Form.Label>
                            <Col sm="8" lg="7">
                                <Form.Control type="number" onChange={handleHoldingFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                মোবাইল নম্বরঃ
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="number" onChange={handlePhoneFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center">
                            {/* <Button type="submit" variant="danger" className='px-4' size="sm">Search</Button> */}
                            <Button type="reset" variant="outline" onClick={() => handleReset()} className="border px-4">Clear</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Row>

            {/* data table */}
            <Row>
                <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
                    <div className="d-flex align-items-center">
                        <p className="m-0 fs-5 fw-bold">Show</p>
                        <select name="" id="" className="select-form mx-3" onChange={(e) => setSelectValue(e.target.value)}>
                            <option value="10">10</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                        <p className="m-0  fs-5 fw-bold">Entries</p>
                    </div>
                    <div>
                        <Button className="mt-3 mt-md-0" variant="success" onClick={() => setModalShow(true)} size="sm"><HiOutlinePlusCircle /> সংযুক্ত করুন</Button>

                        <RSModalAdd
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                        <RSModalEdit
                            number={Math.floor(Math.random() * 100)}
                            id={modalEId}
                            show={modalEdit}
                            onHide={() => setModalEdit(false)}
                        />
                        <RSModalShow
                            number={Math.random() * 1000}
                            id={modalId}
                            show={modalShowF}
                            onHide={() => setModalShowF(false)}
                        />
                    </div>
                </div>
            </Row>
            <Row className="overflow-auto px-2 px-md-0 py-3">
                <table className="table table-striped table-hover fs-6 text-center table-bordered">
                    <thead className="bg-success text-white rounded-3">
                        <tr>
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0.5rem 0 0' }}>হোল্ডিং নংঃ</th>
                            <th scope="col" className="fw-normal py-3">কর দাতার নামঃ</th>
                            <th scope="col" className="fw-normal py-3">পিতা/স্বামীর নামঃ</th>
                            <th scope="col" className="fw-normal py-3">ওয়ার্ড নংঃ</th>
                            <th scope="col" className="fw-normal py-3">গ্রামঃ</th>
                            <th scope="col" className="fw-normal py-3">ধার্যকৃত করঃ</th>
                            <th scope="col" className="fw-normal py-3">পূর্বের বকেয়া করঃ</th>
                            <th scope="col" className="fw-normal py-3">মোট করঃ</th>
                            <th scope="col" className="fw-normal py-3">মোবাইলঃ</th>
                            <th scope="col" className="fw-normal py-3">SMS</th>
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0 0.5rem 0 0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayData.map(data =>
                                <tr key={data?._id}>
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

                                    {/* {data.sms ? <td disabled className="text-danger" >
                                        <MdOutlineMarkEmailRead />
                                    </td> : <td onClick={() => handleMessageCheck(data.id, data.mobile_no)} style={{ cursor: 'pointer' }} className="text-danger" >
                                        <MdOutlineMailOutline />
                                    </td>} */}

                                    {/* {showElement ? */}
                                    <td className='text-danger' style={{ cursor: 'pointer' }} >
                                        <BsEye style={{ width: "2rem" }} onClick={() => { setModalShowF(true); setModalId(data?._id) }} /> <FiEdit style={{ width: "2rem" }} onClick={() => { setModalEdit(true); handleEditOnClick(data?._id) }} />
                                    </td>
                                    {/* : "Loading"} */}
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                {displayData.length === 0 ? <Alert className="text-center">No Data Found</Alert> : ''}


                {/* <div className="d-flex px-0 py-3 justify-content-center align-items-center flex-column flex-md-row"> */}
                <div className="pagi-control">
                    <p className="mb-0 py-md-0 text-center">Showing 1 to {displayData.length} of {filteredData.length} entries</p>
                    <div className="c-table">
                        <ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            forcePage={pageOffset}
                            containerClassName={'pagination mx-auto'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            breakLabel={'...'}
                            pageRangeDisplayed={3}
                            previousClassName={'page-item'}
                            nextClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextLinkClassName={'page-link'}
                            disabledClassName={'paginateDisable'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
                {/* </div> */}

            </Row>

            {/* <Row className='overflow-auto'>
            </Row> */}

            {/* <RSModal /> */}
        </Container>
    );
};

export default Residential;