import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import TLModalAdd from './TLModalAdd/TLModalAdd';
import { CgPushDown } from 'react-icons/cg';
import axios from 'axios';
import TLModalEdit from './TLModalEdit/TLModalEdit';
import TLModalShow from './TLModalShow/TLModalShow';
import TLDownload from './TLDownload/TLDownload';
import ReactPaginate from 'react-paginate';

const TreadLicense = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalShowF, setModalShowF] = React.useState(false);
    const [modalPushDown, setModalPushDown] = React.useState(false);
    const [modalId, setModalId] = React.useState('');
    const [treasLicenseData, setTreasLicenseData] = React.useState([]);
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

    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/tread_license')
            .then(data => {
                setTreasLicenseData(data.data);
                // console.log(data.data);
                setFilteredData(data.data);
            })
    }, [modalShow, treasLicenseData?.id]);

    const [totalData, setTotalData] = React.useState([]);
    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/db_home/6235e95c87b37a195cb34d64')
            .then(data => {
                setTotalData(data?.data);
            });
    }, []);

    const handleLicenseFilter = e => {
        const license = e.target.value;
        const matchedName = treasLicenseData.filter(data => data?.license_no?.toString().includes(license));
        setFilteredData(matchedName);
    }
    const handleHoldingFilter = e => {
        const holding = e.target.value;
        const matchedHolding = treasLicenseData?.filter(data => data?.institute_name?.includes(holding));
        setFilteredData(matchedHolding);
    }
    const handlePhoneFilter = e => {
        const mobile = e.target.value;
        const matchedMobile = treasLicenseData.filter(data => data?.owner_name?.includes(mobile));
        setFilteredData(matchedMobile);
    }

    const handleReset = () => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/tread_license')
            .then(data => {
                setTreasLicenseData(data.data);
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
                            <Card.Title className="fw-bold">মোট ট্রেড লাইসেন্স</Card.Title>
                            <Card.Text>{totalData?.tread_license} জন</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col style={{ textAlign: 'right' }}>
                    <TLModalAdd
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />

                    <TLModalEdit
                        id={modalId}
                        show={modalEdit}
                        onHide={() => setModalEdit(false)}
                    />
                    <TLModalShow
                        id={modalId}
                        show={modalShowF}
                        onHide={() => setModalShowF(false)}
                    />
                    <TLDownload
                        id={modalId}
                        show={modalPushDown}
                        onHide={() => setModalPushDown(false)}
                    />
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
                        <Row xs={2} md={2} lg={4} className="flex-column flex-sm-row align-items-center">
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
                                <Button type="reset" variant="outline-success" onClick={handleReset} className="border px-4">Clear</Button>
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
                        <Button className="mt-3 mt-sm-0" variant="success" onClick={() => setModalShow(true)} size="sm"><HiOutlinePlusCircle /> সংযুক্ত করুন</Button>
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
                                    <th scope="row">{license?.license_no}</th>
                                    <td>{license?.institute_name}</td>
                                    <td>{license?.owner_name}</td>
                                    <td style={{ cursor: 'pointer' }} className='text-danger'>
                                        <BsEye onClick={() => { setModalShowF(true); setModalId(license._id) }} /> <FiEdit className="mx-4" onClick={() => { setModalEdit(true); setModalId(license._id) }} /> <CgPushDown onClick={() => { setModalPushDown(true); setModalId(license._id) }} /></td>
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
        </Container>
    );
};

export default TreadLicense;