import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import COModalAdd from './Actions/COModalAdd';
import ReactPaginate from 'react-paginate';
import COwarishTable from './Actions/COwarishTable';
import { DataContext } from '../../../../contexts/DataContext';

const COwarish = () => {

    const { isLoading, totalData, cOwarishData, cOFilteredData, setCOFilteredData, } = useContext(DataContext);

    // const [isLoading, setIsLoading] = React.useState(false);
    // const [modalShow, setModalShow] = React.useState(false);
    // const [modalEdit, setModalEdit] = React.useState(false);
    // const [modalShowF, setModalShowF] = React.useState(false);
    // const [modalPushDown, setModalPushDown] = React.useState(false);
    // const [modalId, setModalId] = React.useState('');
    // const [COData, setCOData] = React.useState([]);
    // const [filteredData, setFilteredData] = React.useState([]);

    const [selectValue, setSelectValue] = useState(10);
    const [pageNumber, setPageNumber] = React.useState(0);
    const dataPerPage = selectValue;
    const dataVisited = pageNumber * dataPerPage;
    const displayData = cOFilteredData.slice(dataVisited, dataVisited + dataPerPage);
    const pageCount = Math.ceil(cOFilteredData.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }


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
    }, [cOwarishData]);

    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/inheritance_certificate`)
    //         .then(data => {
    //             setCOData(data.data);
    //             setFilteredData(data.data);
    //             // console.log(data.data);
    //             setIsLoading(true);
    //         })
    // }, [modalShow]);

    // const [totalData, setTotalData] = React.useState([]);
    // React.useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/up/db_home/624ef59fab75a0cf27de3f8d`)
    //         .then(data => {
    //             setTotalData(data?.data);
    //         });
    // }, []);

    const handleMemorandumFilter = e => {
        const name = e.target.value;
        const matchedName = cOwarishData.filter(data => data?.memorandum_no?.toString().includes(name));
        setCOFilteredData(matchedName);
    }
    const handleNameFilter = e => {
        const name = e.target.value;
        const matchedName = cOwarishData.filter(data => data?.applicant_name?.includes(name));
        setCOFilteredData(matchedName);
    }
    const handleWordFilter = e => {
        const holding = e.target.value;
        const matchedHolding = cOwarishData?.filter(data => data?.word_no?.toString().includes(holding));
        setCOFilteredData(matchedHolding);
    }
    const handleVillageFilter = e => {
        const village = e.target.value;
        const matchedMobile = cOwarishData.filter(data => data?.village?.includes(village));
        setCOFilteredData(matchedMobile);
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
                            <Card.Title className="fw-bold">মোট ওয়ারিশ সনদপত্র</Card.Title>
                            <Card.Text>{totalData?.inheritance_certificate} জন</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                {/* <div style={{ textAlign: 'right' }}>
                    <COModalAdd
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <COModalEdit
                        id={modalId}
                        show={modalEdit}
                        onHide={() => setModalEdit(false)}
                    />
                    <COModalShow
                        id={modalId}
                        show={modalShowF}
                        onHide={() => setModalShowF(false)}
                    />
                    <CODownload
                        id={modalId}
                        show={modalPushDown}
                        onHide={() => setModalPushDown(false)}
                    />
                </div> */}
            </Row>


            <Row className="mt-3 mb-5 border-bottom">
                <div className="pb-2">
                    <select className="select-form">
                        <option>Filter</option>
                        {/* <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                    </select>
                </div>
                <Col>
                    <Form>
                        <Row xs={2} md={2} lg={4} className="flex-column flex-md-row align-items-center">
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row align-items-center" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    স্মারক নংঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" onChange={handleMemorandumFilter} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row align-items-center" controlId="formPlaintextPassword">
                                <Form.Label column sm="4" lg="6">
                                    আবেদনকারীর নামঃ
                                </Form.Label>
                                <Col sm="8" lg="6">
                                    <Form.Control type="text" onChange={handleNameFilter} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    ওয়ার্ড নংঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" onChange={handleWordFilter} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    গ্রামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" onChange={handleVillageFilter} />
                                </Col>
                            </Form.Group>
                        </Row>
                    </Form>
                </Col>
            </Row>

            {/* data table */}
            <Row className="overflow-auto px-2 px-md-0 py-3">
                <div className='d-flex  flex-column flex-sm-row justify-content-between mb-3 align-items-center'>
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
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0.5rem 0 0' }}>স্মারক নংঃ</th>
                            <th scope="col" className="fw-normal py-3">আবেদনকারীর নামঃ</th>
                            <th scope="col" className="fw-normal py-3">ওয়ার্ড নংঃ</th>
                            <th scope="col" className="fw-normal py-3">গ্রামঃ</th>
                            <th scope="col" className="fw-normal py-3" style={{ borderRadius: '0 0.5rem 0 0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayData.map(data =>
                                <tr key={data._id}>
                                    <COwarishTable data={data} />
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {displayData.length === 0 ? <Alert className="text-center">No Data Found</Alert> : ''}
            </Row>
            <Row className='overflow-auto'>
                <div className="d-flex py-1 justify-content-between align-items-center flex-column flex-md-row pt-2">
                    <p className="mb-0 py-2 py-md-0">Showing 1 to {displayData.length} of {cOFilteredData.length} entries</p>
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
                        <p className="text-success m-0 fs-4">ওয়ারিশ সনদপত্র</p>
                    </div>
                    {/* </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="px-5">
                    <COModalAdd />
                </Modal.Body>
            </Modal>

            <Alert className="alertCss" show={showAlert} variant="light">
                Inheritance Certificate List Updated Successfully!
            </Alert>

        </Container>
    );
};

export default COwarish;