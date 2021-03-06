import React, { useContext } from 'react';
import { Button, Col, Container, Image, Row, Table } from 'react-bootstrap';
import ShowAbout from './ShowAbout';
import { BsArrowRight } from 'react-icons/bs';
import { DataContext } from '../../../contexts/DataContext';

const About = () => {

    const { pMainData,homeData } = useContext(DataContext);

    const [editInto, setEditIntro] = React.useState(false);

    return (
        <>
            <Container className="py-5">
                <ShowAbout
                    show={editInto}
                    title={pMainData?.title}
                    data={pMainData?.description}
                    onHide={() => setEditIntro(false)}
                />
                <Row className="my-5 py-5 align-items-center flex-column flex-md-row">
                    <Col>
                        <p className="fs-1 fw-bold text-center text-md-start">{pMainData?.title}</p>
                        <p className="fs-5" style={{ textAlign: 'justify' }}>{pMainData?.description?.slice(0, 220)} .....</p>

                        <div className='mb-4' size="sm" variant="outline-success" onClick={() => { setEditIntro(true) }}>
                            <Button className="px-4" variant="success">আরো পড়ুন <BsArrowRight /></Button>
                        </div>
                    </Col>
                    <Col xs lg="4" className="d-flex flex-column ps-md-5">
                        <Image fluid className="pb-5" src={pMainData?.f_image}></Image>
                        <Image fluid src={pMainData?.s_image}></Image>
                    </Col>
                </Row>

                <Row className="px-2 px-md-0 pt-5">
                    <p className="fs-2 fw-bold text-center">এক নজরে {pMainData?.name}</p>
                    <Table responsive className="table table-striped table-hover">
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
                                <th scope="col" className="fw-normal py-4" style={{ borderRadius: '0 1rem 0 0' }}>মোট জনসংখ্যা</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                homeData?.map(data =>
                                    <tr key={data?._id}>
                                        <td>{data?.word_no}</td>
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
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    );
};

export default About;