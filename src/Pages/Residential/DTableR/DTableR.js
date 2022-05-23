import React, { useContext } from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { DataContext } from '../../../contexts/DataContext';

const DynamicTable = () => {

    const { isLoading, pageROffset, pageRNumber, setPageRNumber, residentData, rFilteredData, handleRWordFilter, handleRAllFilter, setRFilteredData } = useContext(DataContext)

    const [selectValue, setSelectValue] = React.useState(10);
    const dataPerPage = selectValue;
    const dataVisited = pageRNumber * dataPerPage;
    const displayData = rFilteredData?.slice(dataVisited, dataVisited + dataPerPage);
    const pageCount = Math.ceil(rFilteredData?.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPageRNumber(selected);
    }


    // filters
    const handleNameFilter = e => {
        const name = e.target.value;
        const matchedName = residentData?.filter(data => data?.payer_name?.includes(name));
        setRFilteredData(matchedName);
    }
    const handleHoldingFilter = e => {
        const holding = e.target.value;
        const matchedHolding = residentData?.filter(data => data?.holding_no?.toString().includes(holding));
        setRFilteredData(matchedHolding);
    }
    const handlePhoneFilter = e => {
        const mobile = e.target.value;
        const matchedMobile = residentData.filter(data => data?.mobile_no?.toString().includes(mobile));
        setRFilteredData(matchedMobile);
    }

    const word = JSON.parse(localStorage.getItem("rWord"));

    const [id, setId] = React.useState(word ? word : 1);
    const [activeIndex, setActiveIndex] = React.useState(word ? word : 1);
    const handleOnClick = index => {
        setId(index);
        setActiveIndex(index);
        // remove the curly braces
    };

    // spinner
    if (!isLoading) {
        return <div className="text-center py-5">
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

    // const handleReset = () => {
    //     axios.get('${process.env.REACT_APP_BASE_URL}/up/resident')
    //         .then(data => {
    //             // setResidentData(data.data);
    //             setFilteredData(data.data);
    //             setFilteredDataTwo(data.data);
    //             setIsLoading(true);
    //             // console.log(data.data);
    //         })
    // }

    // const handleReset = () =>  {
    //     setFilteredDataTwo();
    // }

    return (
        <Container>
            <Row xs="auto" className="gy-5 text-center my-5 pb-5 justify-content-center align-items-center">
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(1); handleRWordFilter(1) }} className={`rounded-3 px-4 ${activeIndex === 1 ? "active" : ""}`}>ওয়ার্ড নং ১</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(2); handleRWordFilter(2) }} className={`rounded-3 px-4 ${activeIndex === 2 ? "active" : ""}`}>ওয়ার্ড নং ২</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(3); handleRWordFilter(3) }} className={`rounded-3 px-4 ${activeIndex === 3 ? "active" : ""}`}>ওয়ার্ড নং ৩</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(4); handleRWordFilter(4) }} className={`rounded-3 px-4 ${activeIndex === 4 ? "active" : ""}`}>ওয়ার্ড নং ৪</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(5); handleRWordFilter(5) }} className={`rounded-3 px-4 ${activeIndex === 5 ? "active" : ""}`}>ওয়ার্ড নং ৫</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(6); handleRWordFilter(6) }} className={`rounded-3 px-4 ${activeIndex === 6 ? "active" : ""}`}>ওয়ার্ড নং ৬</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(7); handleRWordFilter(7) }} className={`rounded-3 px-4 ${activeIndex === 7 ? "active" : ""}`}>ওয়ার্ড নং ৭</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(8); handleRWordFilter(8) }} className={`rounded-3 px-4 ${activeIndex === 8 ? "active" : ""}`}>ওয়ার্ড নং ৮</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(9); handleRWordFilter(9) }} className={`rounded-3 px-4 ${activeIndex === 9 ? "active" : ""}`}>ওয়ার্ড নং ৯</Button></Col>
            </Row>

            <Row className="justify-content-center fs-5 mx-auto">
                <p className="py-2 mb-5 rounded bg-warning w-auto px-5">আবাসিক করদাতা সমূহঃ {id} নং ওয়ার্ড</p>
                <Form>
                    <Row xs={2} md={3} className="flex-column flex-sm-row justify-content-center align-items-center">
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                কর দাতার নামঃ
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" className="myInput" onChange={handleNameFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                হোল্ডিং নংঃ
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="number" className="myInput" onChange={handleHoldingFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                মোবাইল নম্বরঃ
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="number" className="myInput" onChange={handlePhoneFilter} />
                            </Col>
                        </Form.Group>
                        {/* <Button type="submit" variant="danger" className='px-4' size="sm">Search</Button> */}
                    </Row>
                    <div className="text-center text-md-end">
                        <Button type="reset" variant="outline" className="border px-4">Clear</Button>
                    </div>
                </Form>

            </Row>

            <Row className="overflow-auto px-2 px-md-0 mt-5 py-5">
                <Col className='d-flex justify-content-between align-items-center'>
                    <div className="d-flex align-items-center mb-3">
                        <p className="m-0 fs-md-5 fw-bold">Show</p>
                        <select name="" id="" className="select-form mx-2" onChange={(e) => setSelectValue(e.target.value)}>
                            <option value="10">10</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                        <p className="m-0 fs-md-5 fw-bold">Entries</p>
                    </div>
                    <div>
                        <Button variant="outline-success" onClick={() => { handleRAllFilter(); handleOnClick("all"); }} className={`${activeIndex === "all" ? "active" : ""}`}>সকল ওয়ার্ড</Button>
                    </div>
                </Col>

                <table className="table table-striped table-hover fs-6 text-center">
                    <thead className="bg-success text-white rounded-3">
                        <tr>
                            <th scope="col" className="fw-normal py-4" style={{ borderRadius: '0.5rem 0 0' }}>হোল্ডিং নং</th>
                            <th scope="col" className="fw-normal py-4">কর দাতার নাম</th>
                            <th scope="col" className="fw-normal py-4">পিতা/স্বামীর নাম</th>
                            <th scope="col" className="fw-normal py-4">ওয়ার্ড নং</th>
                            <th scope="col" className="fw-normal py-4">গ্রাম</th>
                            <th scope="col" className="fw-normal py-4">ধার্যকৃত কর</th>
                            <th scope="col" className="fw-normal py-4">পূর্বের বকেয়া কর</th>
                            <th scope="col" className="fw-normal py-4" style={{ borderRadius: '0 0.5rem 0 0' }}>মোট কর</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayData?.map(data =>
                                <tr key={data?._id}>
                                    <th scope="row">{data?.holding_no}</th>
                                    <td>{data?.payer_name}</td>
                                    <td>{data?.guardian_name}</td>
                                    <td>{data?.word_no}</td>
                                    <td>{data?.village}</td>
                                    <td>{data?.assign_tax}</td>
                                    <td>{data?.previes_areas_tax}</td>
                                    <td>{data?.total_tax}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {displayData.length === 0 ? <Alert className="text-center">No Data Found</Alert> : ''}
                <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                    <p className="mb-0 py-md-0 text-center">Showing {displayData[0]?.holding_no ? displayData[0]?.holding_no : "Undefined"} to {displayData[displayData.length - 1]?.holding_no ? displayData[displayData.length - 1]?.holding_no : "Undefined"} of {residentData.length} entries</p>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        forcePage={pageROffset}
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
        </Container>
    );
};

export default DynamicTable;