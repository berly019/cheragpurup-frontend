import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import TLModalAdd from './Actions/TLModalAdd';
import ReactPaginate from 'react-paginate';
import { DataContext } from '../../../contexts/DataContext';
import TreadLicenceTable from './Actions/TreadLicenceTable';

const TreadLicense = () => {

    const { isLoading, totalData, treadLicenseData, tFilteredData, setTFilteredData } = useContext(DataContext);

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
    }, [treadLicenseData]);

    const [selectValue, setSelectValue] = useState(10);
    const [pageNumber, setPageNumber] = React.useState(0);
    const dataPerPage = selectValue;
    const dataVisited = pageNumber * dataPerPage;
    const displayData = tFilteredData.slice(dataVisited, dataVisited + dataPerPage);
    const pageCount = Math.ceil(tFilteredData.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const handleLicenseFilter = e => {
        const license = e.target.value;
        const matchedName = treadLicenseData.filter(data => data?.license_no?.toString().includes(license));
        setTFilteredData(matchedName);
    }
    const handleHoldingFilter = e => {
        const holding = e.target.value;
        const matchedHolding = treadLicenseData?.filter(data => data?.institute_name?.includes(holding));
        setTFilteredData(matchedHolding);
    }
    const handlePhoneFilter = e => {
        const mobile = e.target.value;
        const matchedMobile = treadLicenseData.filter(data => data?.owner_name?.includes(mobile));
        setTFilteredData(matchedMobile);
    }

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
            <Row xs={1} className="g-4 justify-content-center">
                <Col>
                    <Card className="bg-light text-center">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট ট্রেড লাইসেন্স</Card.Title>
                            <Card.Text>{totalData?.tread_license} জন</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            <Row className="mt-3 mb-5 border-bottom">
                <div className="pb-2">
                    <select className="select-form">
                        <option>Filter</option>
                    </select>
                </div>
                <Col>
                    <Form>
                        <Row xs={2} md={2} lg={3} className="flex-column flex-sm-row align-items-center">
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="5">
                                    লাইসেন্স নংঃ
                                </Form.Label>
                                <Col sm="7">
                                    <Form.Control type="number" onChange={handleLicenseFilter} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4" lg="7">
                                    ব্যবসা প্রতিষ্ঠানের নামঃ
                                </Form.Label>
                                <Col sm="8" lg="5">
                                    <Form.Control type="text" onChange={handleHoldingFilter} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="6">
                                    লাইসেন্সধারীর নামঃ
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" onChange={handlePhoneFilter} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center">
                                {/* <Button type="submit" variant="danger" className='px-4' size="sm">Search</Button> */}
                                {/* <Button type="reset" variant="outline-success" onClick={handleReset} className="border px-4">Clear</Button> */}
                            </Form.Group>
                        </Row>
                    </Form>
                </Col>
            </Row>

            {/* data table */}
            <Row className="overflow-auto px-2 px-md-0 pb-3">
                <div className='d-flex flex-column flex-sm-row  justify-content-between mb-3 align-items-center'>
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
                        <Button className="mt-3 mt-sm-0" variant="success" onClick={() => handleShow()} size="sm"><HiOutlinePlusCircle /> সংযুক্ত করুন</Button>
                    </div>
                </div>
                <table className="table table-striped table-hover fs-6 text-center table-bordered">
                    <thead className="bg-success text-white rounded-3">
                        <tr>
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0.5rem 0 0' }}>লাইসেন্স নংঃ</th>
                            <th scope="col" className="fw-normal py-3">ব্যবসা প্রতিষ্ঠানের নামঃ</th>
                            <th scope="col" className="fw-normal py-3">লাইসেন্সধারীর নামঃ</th>
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0 0.5rem 0 0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayData.map(license =>
                                <tr key={license._id}>
                                    <TreadLicenceTable license={license} />
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {displayData.length === 0 ? <Alert className="text-center">No Data Found</Alert> : ''}
            </Row>
            <Row className='overflow-auto'>
                <div className="d-flex py-1 justify-content-between align-items-center flex-column flex-md-row pt-2">
                    <p className="mb-0 py-2 py-md-0">Showing 1 to {displayData.length} of {tFilteredData.length} entries</p>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'pagination'}
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
                        <p className="text-success m-0 fs-4">ট্রেড লাইসেন্স</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>

                <Modal.Body className="px-5">
                    <TLModalAdd />
                </Modal.Body>
            </Modal>


            <Alert className="alertCss" show={showAlert} variant="light">
                Tread License List Updated Successfully!
            </Alert>
        </Container>
    );
};

export default TreadLicense;