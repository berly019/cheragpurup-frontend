import React, { useContext } from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { DataContext } from '../../../contexts/DataContext';

const DynamicTable = () => {

    const { isLoading, pageOffset, pageNumber, setPageNumber, commerceData, cFilteredData, handleCWordFilter, handleCAllFilter, setCFilteredData } = useContext(DataContext);


    const [selectValue, setSelectValue] = React.useState(10);
    const dataPerPage = selectValue;
    const dataVisited = pageNumber * dataPerPage;
    const displayData = cFilteredData?.slice(dataVisited, dataVisited + dataPerPage);
    const pageCount = Math.ceil(cFilteredData?.length / dataPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    //   filter
    const handleNameFilter = e => {
        const name = e.target.value;
        const matchedName = commerceData?.filter(data => data?.payer_name?.includes(name));
        setCFilteredData(matchedName);
    }
    const handleHoldingFilter = e => {
        const holding = e.target.value;
        const matchedHolding = commerceData?.filter(data => data?.holding_no?.toString().includes(holding));
        setCFilteredData(matchedHolding);
    }
    const handlePhoneFilter = e => {
        const mobile = e.target.value;
        const matchedMobile = commerceData.filter(data => data?.mobile_no?.toString().includes(mobile));
        setCFilteredData(matchedMobile);
    }

    const cWord = JSON.parse(localStorage.getItem("cWord"));

    const [id, setId] = React.useState(cWord ? cWord : 1);
    const [activeIndex, setActiveIndex] = React.useState(cWord ? cWord : 1);
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
    //     axios.get('${process.env.REACT_APP_BASE_URL}/up/commerce')
    //         .then(data => {
    //             // setCommerceData(data.data);
    //             setFilteredData(data.data);
    //             setFilteredDataTwo(data.data);
    //             setIsLoading(true);
    //         })
    // }

    /////////////////////////////////////////////////
    // const { img } = load.post('https://stagingmb.herokuapp.com/admin/adminProduct/pdf/9ad8f6f88420af43a2b182ac594968d1.pdf', {
    //     json: {
    //         hello: 'world'
    //     }
    // }).json();

    // console.log(img);

    return (
        <Container>
            <Row xs="auto" className="gy-5 text-center my-5 pb-5 justify-content-center align-items-center">
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(1); handleCWordFilter(1) }} className={`rounded-3 px-4 ${activeIndex === 1 ? "active" : ""}`}>?????????????????? ?????? ???</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(2); handleCWordFilter(2) }} className={`rounded-3 px-4 ${activeIndex === 2 ? "active" : ""}`}>?????????????????? ?????? ???</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(3); handleCWordFilter(3) }} className={`rounded-3 px-4 ${activeIndex === 3 ? "active" : ""}`}>?????????????????? ?????? ???</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(4); handleCWordFilter(4) }} className={`rounded-3 px-4 ${activeIndex === 4 ? "active" : ""}`}>?????????????????? ?????? ???</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(5); handleCWordFilter(5) }} className={`rounded-3 px-4 ${activeIndex === 5 ? "active" : ""}`}>?????????????????? ?????? ???</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(6); handleCWordFilter(6) }} className={`rounded-3 px-4 ${activeIndex === 6 ? "active" : ""}`}>?????????????????? ?????? ???</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(7); handleCWordFilter(7) }} className={`rounded-3 px-4 ${activeIndex === 7 ? "active" : ""}`}>?????????????????? ?????? ???</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(8); handleCWordFilter(8) }} className={`rounded-3 px-4 ${activeIndex === 8 ? "active" : ""}`}>?????????????????? ?????? ???</Button></Col>
                <Col><Button variant="outline-success" onClick={() => { handleOnClick(9); handleCWordFilter(9) }} className={`rounded-3 px-4 ${activeIndex === 9 ? "active" : ""}`}>?????????????????? ?????? ???</Button></Col>
            </Row>

            <Row className="justify-content-center fs-5 mx-auto">
                <p className="py-2 mb-5 rounded bg-warning w-auto px-5">??????????????????????????? ?????????????????? ??????????????? {id} ?????? ??????????????????</p>
                <Form>
                    <Row xs={2} md={3} className="flex-column flex-sm-row justify-content-center align-items-center">
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                ?????? ??????????????? ????????????
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" className="myInput" onChange={handleNameFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center" controlId="formPlaintextPassword">
                            <Form.Label column sm="4" lg="4">
                                ????????????????????? ?????????
                            </Form.Label>
                            <Col sm="8" lg="8">
                                <Form.Control type="number" className="myInput" onChange={handleHoldingFilter} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column flex-sm-row justify-content-center align-items-center" controlId="formPlaintextPassword">
                            <Form.Label column sm="5">
                                ?????????????????? ??????????????????
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="number" className="myInput" onChange={handlePhoneFilter} />
                            </Col>
                        </Form.Group>
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
                        <p className="m-0  fs-md-5 fw-bold">Entries</p>
                    </div>
                    <div>
                        <Button variant="outline-success" onClick={() => { handleCAllFilter(); handleOnClick("all"); }} className={`${activeIndex === "all" ? "active" : ""}`}>????????? ??????????????????</Button>
                    </div>
                </Col>
                <table className="table table-striped table-hover fs-6 text-center">
                    <thead className="bg-success text-white rounded-3">
                        <tr>
                            <th scope="col" className="fw-normal py-4" style={{ borderRadius: '0.5rem 0 0' }}>????????????????????? ??????</th>
                            <th scope="col" className="fw-normal py-4">?????? ??????????????? ?????????</th>
                            <th scope="col" className="fw-normal py-4">????????????/????????????????????? ?????????</th>
                            <th scope="col" className="fw-normal py-4">?????????????????? ??????</th>
                            <th scope="col" className="fw-normal py-4">???????????????</th>
                            <th scope="col" className="fw-normal py-4">???????????????????????? ??????</th>
                            <th scope="col" className="fw-normal py-4">????????????????????? ??????????????? ??????</th>
                            <th scope="col" className="fw-normal py-4" style={{ borderRadius: '0 0.5rem 0 0' }}>????????? ??????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            displayData.map(data =>
                                <tr key={data._id}>
                                    <th scope="row">{data.holding_no}</th>
                                    <td>{data.payer_name}</td>
                                    <td>{data.guardian_name}</td>
                                    <td>{data?.word_no}</td>
                                    <td>{data.village}</td>
                                    <td>{data.assign_tax}</td>
                                    <td>{data?.previes_areas_tax}</td>
                                    <td>{data.total_tax}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {displayData.length === 0 ? <Alert className="text-center">No Data Found</Alert> : ''}
                <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                    <p className="mb-0 py-md-0 text-center">Showing {displayData[0]?.holding_no ? displayData[0]?.holding_no : "Undefined"} to {displayData[displayData.length - 1]?.holding_no ? displayData[displayData.length - 1]?.holding_no : "Undefined"} of {commerceData.length} entries</p>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        forcePage={pageOffset}
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