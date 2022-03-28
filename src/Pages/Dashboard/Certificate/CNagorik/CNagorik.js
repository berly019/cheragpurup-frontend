import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { CgPushDown } from 'react-icons/cg';
import { FiEdit } from 'react-icons/fi';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import ReactPaginate from 'react-paginate';
import CNModalAdd from './CNModalAdd/CNModalAdd';
import CNModalEdit from './CNModalEdit/CNModalEdit';
import CNModalShow from './CNModalShow/CNModalShow';
import CNDownload from './CNDownload/CNDownload'

const CNagorik = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalShowF, setModalShowF] = React.useState(false);
    const [modalPushDown, setModalPushDown] = React.useState(false);
    const [modalId, setModalId] = React.useState('');
    const [CNData, setCNData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);

    const [selectValue, setSelectValue] = useState(10);
    const [pageNumber, setPageNumber] = React.useState(0);
    const dataPerPage = selectValue;
    const dataVisited = pageNumber * dataPerPage;
    const displayData = filteredData.slice(dataVisited, dataVisited + dataPerPage);
    const pageCount = Math.ceil(filteredData.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/citizen_certificate')
            .then(data => {
                setCNData(data.data);
                // console.log(data.data);
                setFilteredData(data.data);
            })
    }, [modalShow]);

    const [totalData, setTotalData] = React.useState([]);
    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/db_home/6235e95c87b37a195cb34d64')
            .then(data => {
                setTotalData(data?.data);
            });
    }, []);

    const handleMemorandumFilter = e => {
        const name = e.target.value;
        const matchedName = CNData.filter(data => data?.memorandum_no?.toString().includes(name));
        setFilteredData(matchedName);
    }
    const handleNameFilter = e => {
        const name = e.target.value;
        const matchedName = CNData.filter(data => data?.applicant_name?.includes(name));
        setFilteredData(matchedName);
    }
    const handleWordFilter = e => {
        const holding = e.target.value;
        const matchedHolding = CNData?.filter(data => data?.word_no?.toString().includes(holding));
        setFilteredData(matchedHolding);
    }
    const handleVillageFilter = e => {
        const village = e.target.value;
        const matchedMobile = CNData.filter(data => data?.village?.includes(village));
        setFilteredData(matchedMobile);
    }

    const handleReset = () => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/citizen_certificate')
            .then(data => {
                setCNData(data.data);
                // console.log(data.data);
                setFilteredData(data.data);
            })
    }
    return (
        <Container>
            <Row xs={1} className="g-4 justify-content-center">
                <Col>
                    <Card className="bg-light text-center">
                        <Card.Body>
                            <Card.Title className="fw-bold">মোট নাগরিক সনদপত্র</Card.Title>
                            <Card.Text>{totalData?.citizen_certificate} জন</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <div style={{ textAlign: 'right' }}>
                    <CNModalAdd
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    <CNModalEdit
                        id={modalId}
                        show={modalEdit}
                        onHide={() => setModalEdit(false)}
                    />
                    <CNModalShow
                        id={modalId}
                        show={modalShowF}
                        onHide={() => setModalShowF(false)}
                    />
                    <CNDownload
                        id={modalId}
                        show={modalPushDown}
                        onHide={() => setModalPushDown(false)}
                    />
                </div>
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
                        <Row xs={2} md={2} lg={5} className="flex-column flex-md-row align-items-center">
                            <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    স্মারক নংঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" onChange={handleMemorandumFilter} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column  justify-content-center align-items-center flex-sm-row align-items-center" controlId="formPlaintextPassword">
                                <Form.Label column sm="4" lg="6">
                                    আবেদনকারীর নামঃ
                                </Form.Label>
                                <Col sm="8" lg="6">
                                    <Form.Control type="text" onChange={handleNameFilter} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    ওয়ার্ড নংঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="number" onChange={handleWordFilter} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3 d-flex flex-column justify-content-center align-items-center flex-sm-row" controlId="formPlaintextPassword">
                                <Form.Label column sm="4">
                                    গ্রামঃ
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" onChange={handleVillageFilter} />
                                </Col>
                            </Form.Group>
                            <Col className="mb-3 text-center">
                                <Button type="reset" variant="outline-success" onClick={handleReset}>Clear</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

            {/* data table */}
            <Row className="overflow-auto px-2 px-md-0 py-3">
                <div className='d-flex flex-column flex-sm-row justify-content-between mb-3 align-items-center'>
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
                        <Button className="mt-3 mt-sm-0" variant="success" onClick={() => setModalShow(true)} size="sm"><HiOutlinePlusCircle /> সংযুক্ত করুন</Button>
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
                                    <th scope="row">{data.memorandum_no}</th>
                                    <td>{data.applicant_name}</td>
                                    <td>{data.word_no}</td>
                                    <td>{data.village}</td>
                                    <td className='text-danger' style={{ cursor: 'pointer' }} >
                                        <BsEye onClick={() => { setModalShowF(true); setModalId(data._id) }} /> <FiEdit className="mx-4" onClick={() => { setModalEdit(true); setModalId(data._id) }} /> <CgPushDown onClick={() => { setModalPushDown(true); setModalId(data._id) }} />
                                    </td>
                                </tr>
                            ) 
                        }
                    </tbody>
                </table>
                {displayData.length === 0 ? <Alert className="text-center">No Data Found</Alert> : ''}
            </Row>
            <Row className='overflow-auto'>
                <div className="d-flex py-1 justify-content-between align-items-center flex-column flex-md-row pt-2">
                    <p className="mb-0 py-2 py-md-0">Showing 1 to {displayData.length} of {filteredData.length} entries</p>
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
            {/* <RSModal /> */}
        </Container >
    );
};

export default CNagorik;