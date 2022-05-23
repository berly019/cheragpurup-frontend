import React, { useState, useContext, useEffect } from 'react';
import { Alert, Button, Card, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import './Commerce.css';
import { HiOutlinePlusCircle, HiPrinter } from 'react-icons/hi';
import CSModalAdd from './Actions/CSModalAdd';
import BillPrint from './Actions/BillPrint';
import ReactPaginate from 'react-paginate';
import { DataContext } from '../../../contexts/DataContext';
import CommerceTable from './Actions/CommerseTable';


const Commercial = () => {

    const { isLoading, pageOffset, pageNumber, setPageNumber, totalData, commerceData, cFilteredData, handleCWordFilter, handleCAllFilter, setCFilteredData } = useContext(DataContext);

    const [showAlert, setShowAlert] = useState(false);

    // for add modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 1000)
    }
    // const [rerender, setRerender] = useState(false);

    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [commerceData]);


    const [billPrint, setBillPrint] = React.useState(false);

    const cWord = JSON.parse(localStorage.getItem("cWord"));

    const [selectValue, setSelectValue] = useState(10);
    const dataPerPage = selectValue;
    const dataVisited = pageNumber * dataPerPage;
    const displayData = cFilteredData.slice(dataVisited, dataVisited + dataPerPage);
    const pageCount = Math.ceil(cFilteredData.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const [activeIndex, setActiveIndex] = React.useState(cWord ? cWord : 1);
    const handleOnClick = index => {
        setActiveIndex(index);
        // remove the curly braces
    };



    const handleCNameFilter = e => {
        const name = e.target.value;
        const matchedName = commerceData?.filter(data => data?.payer_name?.includes(name));
        setCFilteredData(matchedName);
    }
    const handleCHoldingFilter = e => {
        const holding = e.target.value;
        const matchedHolding = commerceData?.filter(data => data?.holding_no?.toString().includes(holding));
        setCFilteredData(matchedHolding);
    }
    const handleCPhoneFilter = e => {
        const mobile = e.target.value;
        const matchedMobile = commerceData?.filter(data => data?.mobile_no?.toString().includes(mobile));
        setCFilteredData(matchedMobile);
    }

    /*  React.useEffect(() => {
         const totalTax = commerceData.reduce((currentSum, nextObject) => {
             return currentSum + +nextObject.total_tax;
         }, 0);
         setTotalTax(totalTax);
 
         const collectedTax = commerceData.reduce((currentSum, nextObject) => {
             return currentSum + +nextObject.collected_tax;
         }, 0);
         setCollectedTax(collectedTax);
 
         const areasTax = commerceData.reduce((currentSum, nextObject) => {
             return currentSum + +nextObject.areas_tax;
         }, 0);
         setAreasTax(areasTax);
     }, [commerceData]) */

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
                            <Card.Text>{totalData?.commerce_thana} জন</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট কর</Card.Title>
                            <Card.Text>{totalData?.commerce_tax} ৳</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট আদায়কৃত কর</Card.Title>
                            <Card.Text>{totalData?.commerce_collected_tax} ৳</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট বকেয়া করঃ</Card.Title>
                            <Card.Text>{totalData?.commerce_areas_tax} ৳ </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row xs="auto" className="g-4 text-center my-5 justify-content-center align-items-center">
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(1); handleCWordFilter(1) }} className={`rounded-3 px-2 ${activeIndex === 1 ? "active" : ""}`}>ওয়ার্ড নং ১</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(2); handleCWordFilter(2) }} className={`rounded-3 px-2 ${activeIndex === 2 ? "active" : ""}`}>ওয়ার্ড নং ২</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(3); handleCWordFilter(3) }} className={`rounded-3 px-2 ${activeIndex === 3 ? "active" : ""}`}>ওয়ার্ড নং ৩</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(4); handleCWordFilter(4) }} className={`rounded-3 px-2 ${activeIndex === 4 ? "active" : ""}`}>ওয়ার্ড নং ৪</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(5); handleCWordFilter(5) }} className={`rounded-3 px-2 ${activeIndex === 5 ? "active" : ""}`}>ওয়ার্ড নং ৫</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(6); handleCWordFilter(6) }} className={`rounded-3 px-2 ${activeIndex === 6 ? "active" : ""}`}>ওয়ার্ড নং ৬</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(7); handleCWordFilter(7) }} className={`rounded-3 px-2 ${activeIndex === 7 ? "active" : ""}`}>ওয়ার্ড নং ৭</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(8); handleCWordFilter(8) }} className={`rounded-3 px-2 ${activeIndex === 8 ? "active" : ""}`}>ওয়ার্ড নং ৮</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(9); handleCWordFilter(9) }} className={`rounded-3 px-2 ${activeIndex === 9 ? "active" : ""}`}>ওয়ার্ড নং ৯</Button></Col>
                <Col> <Button variant="outline-success" onClick={() => { handleCAllFilter(); handleOnClick("all"); }} className={`${activeIndex === "all" ? "active" : ""}`}>সকল ওয়ার্ড</Button></Col>
            </Row>

            <Row className="my-5 border-bottom">
                <div className="pb-2">
                    <select className="select-form">
                        <option>Filter</option>
                        {/* <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                    </select>
                </div>

                <Form>
                    <Row xs={2} md={2} lg={3} className="flex-column flex-sm-row align-items-center">
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                কর দাতার নামঃ
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" onChange={handleCNameFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="5">
                                হোল্ডিং নংঃ
                            </Form.Label>
                            <Col sm="8" lg="7">
                                <Form.Control type="number" onChange={handleCHoldingFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                মোবাইল নম্বরঃ
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="number" onChange={handleCPhoneFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center">
                            {/* <Button type="submit" variant="danger" className='px-4' size="sm">Search</Button> */}
                            {/* <Button type="reset" variant="outline" onClick={handleReset} className="border px-4">Clear</Button> */}
                        </Form.Group>
                    </Row>
                </Form>
            </Row>

            {/* data table */}
            < Row >
                <div className='d-flex flex-column flex-sm-row justify-content-between align-items-center'>
                    <div className="d-flex align-items-center">
                        <p className="m-0 fs-5 fw-bold">Show</p>
                        <select name="" id="" className="select-form mx-3" onChange={(e) => setSelectValue(e.target.value)}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                        <p className="m-0  fs-5 fw-bold">Entries</p>
                    </div>
                    <div>
                        <Button className="mt-3 mt-sm-0 me-2" variant="success" onClick={() => setBillPrint(true)} size="sm"><HiPrinter /> বিল প্রিন্ট</Button>

                        <BillPrint
                            show={billPrint}
                            onHide={() => setBillPrint(false)}
                        />

                        <Button className="mt-3 mt-sm-0" variant="success" onClick={() => handleShow()} size="sm"><HiOutlinePlusCircle /> সংযুক্ত করুন</Button>
                    </div>
                </div>
            </Row >

            <Row className="overflow-auto px-2 px-md-0 py-3">
                <table className="table table-striped table-hover fs-6 text-center">
                    <thead className="bg-success text-white rounded-3">
                        <tr>
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0.5rem 0 0' }}>হোল্ডিং নংঃ</th>
                            <th scope="col" className="fw-normal py-3">কর দাতার নামঃ</th>
                            <th scope="col" className="fw-normal py-3">ব্যাবসা প্রতিষ্ঠানঃ</th>
                            <th scope="col" className="fw-normal py-3">ওয়ার্ড নংঃ</th>
                            <th scope="col" className="fw-normal py-3">গ্রামঃ</th>
                            <th scope="col" className="fw-normal py-3">ধার্যকৃত করঃ</th>
                            <th scope="col" className="fw-normal py-3">পূর্বের বকেয়া করঃ</th>
                            <th scope="col" className="fw-normal py-3">মোট করঃ</th>
                            <th scope="col" className="fw-normal py-3"> মোবাইলঃ</th>
                            <th scope="col" className="fw-normal py-3">SMS</th>
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0 0.5rem 0 0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayData.map(data =>
                                <tr key={data._id}>
                                    <CommerceTable data={data} />
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {/* {success ? "Request successfully submitted!" : ''} */}
                {displayData.length === 0 ? <Alert className="text-center">No Data Found</Alert> : ''}

                <div className="pagi-control">
                    <p className="mb-0 py-md-0 text-center">Showing {displayData[0]?.holding_no ? displayData[0]?.holding_no : "Undefined"} to {displayData[displayData.length - 1]?.holding_no ? displayData[displayData.length - 1]?.holding_no : "Undefined"} of {commerceData.length} entries</p>
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

            </Row>


            {/* add data */}
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
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>

                <Modal.Body className="px-5">
                    <CSModalAdd />
                </Modal.Body>

                {/* <Modal.Footer style={{ border: "0" }}>
                <Button onClick={props.onHide} type='submit' size="sm">Save</Button>
            </Modal.Footer> */}
            </Modal>

            <Alert className="alertCss" show={showAlert} variant="light">
                Commerce List Updated Successfully!
            </Alert>

        </Container >
    );
};

export default Commercial;