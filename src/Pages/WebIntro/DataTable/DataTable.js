import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { DataContext } from '../../../contexts/DataContext';
import "./DataTable.css";

const DataTable = () => {

    const { dataTable } = useContext(DataContext);

    return (
        <Container className="py-5 mt-5">
            <Row className="px-3">
                {/* <Table responsive striped hover className="text-center border-success">
                    <thead className="t-style">
                        <tr className="t-tr">
                            <th scope="col" className="fw-normal py-4 t-tr" style={{ borderRadius: '1rem 0 0' }}>ডাকঘর</th>
                            <th scope="col" className="fw-normal py-4 t-tr">গ্রাম</th>
                            <th scope="col" className="fw-normal py-4 t-tr">মৌজা</th>
                            <th scope="col" className="fw-normal py-4 t-tr">হাট বাজার</th>
                            <th scope="col" className="fw-normal py-4 t-tr">মসজিদ</th>
                            <th scope="col" className="fw-normal py-4 t-tr">শিক্ষা প্রতিষ্ঠান</th>
                            <th scope="col" className="fw-normal py-4 t-tr">কবরস্থান</th>
                            <th scope="col" className="fw-normal py-4 t-tr">ঈদ্গাহ মাঠ</th>
                            <th scope="col" className="fw-normal py-4 t-tr" style={{ borderRadius: '0 1rem 0 0' }}>মন্দির	শ্মশান</th>
                        </tr>
                    </thead>
                    <tbody className="t-style">
                        <tr className="t-tr">
                            <td className="t-tr">{dataTable?.post_office} টি</td>
                            <td className='t-tr'>{dataTable?.village} টি</td>
                            <td className='t-tr'>{dataTable?.mouza} টি</td>
                            <td className='t-tr'>{dataTable?.bazar} টি</td>
                            <td className='t-tr'>{dataTable?.mosque} টি</td>
                            <td className='t-tr'>{data.edu_institute} টি</td>
                            <td className='t-tr'>{dataTable?.grove} টি</td>
                            <td className='t-tr'>{dataTable?.eid_gah} টি</td>
                            <td className='t-tr'>{dataTable?.mondir} টি</td>
                        </tr>
                    </tbody>
                </Table> */}

                <table className="dltrc" style={{ background: "none" }}>
                    <tbody>
                        <tr className="dlheader">
                            {/* <td class="dlheader">Subject</td> */}
                            <td className="fw-normal p-3 dlheader">ডাকঘর</td>
                            <td className="fw-normal p-3 dlheader">গ্রাম</td>
                            <td className="fw-normal p-3 dlheader">মৌজা</td>
                            <td className="fw-normal p-3 dlheader">হাট বাজার</td>
                            <td className="fw-normal p-3 dlheader">মসজিদ</td>
                            <td className="fw-normal p-3 dlheader">শিক্ষা প্রতিষ্ঠান</td>
                            <td className="fw-normal p-3 dlheader">কবরস্থান</td>
                            <td className="fw-normal p-3 dlheader">ঈদ্গাহ মাঠ</td>
                            <td className="fw-normal p-3 dlheader">মন্দির	শ্মশান</td>
                        </tr>
                        <tr className="dlinfo hover01">
                            {/* <td className="dlinfo hover01">One</td> */}
                            <td className="dlinfo hover01 p-2">{dataTable?.post_office} টি</td>
                            <td className='dlinfo hover01 p-2'>{dataTable?.village} টি</td>
                            <td className='dlinfo hover01 p-2'>{dataTable?.mouza} টি</td>
                            <td className='dlinfo hover01 p-2'>{dataTable?.bazar} টি</td>
                            <td className='dlinfo hover01 p-2'>{dataTable?.mosque} টি</td>
                            <td className='dlinfo hover01 p-2'>{dataTable?.edu_institute} টি</td>
                            <td className='dlinfo hover01 p-2'>{dataTable?.grove} টি</td>
                            <td className='dlinfo hover01 p-2'>{dataTable?.eid_gah} টি</td>
                            <td className='dlinfo hover01 p-2'>{dataTable?.mondir} টি</td>
                        </tr>
                    </tbody>
                </table>

            </Row>

            {/* <Row overflow="auto" className="my-5 text-center" style={{ border: "1px solid #00AA55", borderRadius: "1rem" }}>
                <Col className="p-0">
                    <div className="p-2" style={{ border: "1px solid #00AA55", borderRadius: "1rem 0 0" }}>dsjvn</div>
                    <div className="p-2" style={{ border: "1px solid #00AA55", borderRadius: "0 0 0 1rem" }}>dfjk</div>
                </Col>
                <Col className="p-0">
                    <div className="p-2" style={{ border: "1px solid #00AA55" }}>dsjvn</div>
                    <div className="p-2" style={{ border: "1px solid #00AA55" }}>dfjk</div>
                </Col>
                <Col className="p-0">
                    <div className="p-2" style={{ border: "1px solid #00AA55" }}>dsjvn</div>
                    <div className="p-2" style={{ border: "1px solid #00AA55" }}>dfjk</div>
                </Col>
                <Col className="p-0">
                    <div className="p-2" style={{ border: "1px solid #00AA55" }}>dsjvn</div>
                    <div className="p-2" style={{ border: "1px solid #00AA55" }}>dfjk</div>
                </Col>
                <Col className="p-0">
                    <div className="p-2" style={{ border: "1px solid #00AA55" }}>dsjvn</div>
                    <div className="p-2" style={{ border: "1px solid #00AA55" }}>dfjk</div>
                </Col>
                <Col className="p-0">
                    <div className="p-2" style={{ border: "1px solid #00AA55", borderRadius: "0 1rem 0 0" }}>dsjvn</div>
                    <div className="p-2" style={{ border: "1px solid #00AA55", borderRadius: "0 0 1rem 0" }}>dfjk</div>
                </Col>
            </Row> */}
        </Container>
    );
};

export default DataTable;