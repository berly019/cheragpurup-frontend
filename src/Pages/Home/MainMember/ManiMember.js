import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import v1 from '../../../media/Vector1.png'
import v2 from '../../../media/Vector2.png'
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ManiMember = () => {
    // handle chairman
    const [cData, setCData] = React.useState([]);
    React.useEffect(() => {
        axios.get("https://khadimpur-mongoose-backend.herokuapp.com/up/wchairman")
            .then(res => {
                setCData(res.data[0])
                // console.log(res.data)
            });
    }, []);

    // handle sacib
    const [sData, setSData] = React.useState([]);
    React.useEffect(() => {
        axios.get("https://khadimpur-mongoose-backend.herokuapp.com/up/wsacib")
            .then(res => setSData(res.data[0]));
    }, []);

    // handle panel
    const [pData, setPData] = React.useState([]);
    React.useEffect(() => {
        axios.get("https://khadimpur-mongoose-backend.herokuapp.com/up/wpanel")
            .then(res => setPData(res.data[0]));
    }, []);

    // handle image
    const [intro, setIntro] = React.useState([0]);
    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/intro')
            .then(res => setIntro(res.data));
    }, [])

    return (
        <Container className="py-5">
            <Row className='gy-5 pt-5 align-items-center'>
                <Col>
                    <Row>
                        <Col xs={12} key={cData?._id}>
                            <Card
                                text='dark'
                                style={{ borderRadius: '1rem', backgroundColor: '#F4F4F4' }}
                                className="mb-2 mx-auto border-0"
                            >
                                <Card.Header className="fs-3 p-4" style={{ backgroundColor: '#F4F4F4', borderRadius: "1rem 1rem 0 0" }}>চেয়ারম্যান</Card.Header>
                                <Card.Body className="px-4 d-lg-flex justify-content-evenly align-items-center fs-5">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <Image fluid style={{ height: '155px', width: '155px' }} roundedCircle src={cData?.image} />
                                        <div className="position-relative">
                                            <Image fluid src={v2} style={{ height: '50%', width: '15%', top: '-30px', right: '-6px' }} alt="" className="position-absolute" />
                                            <div className="text-center px-3 py-1 position-relative" style={{ backgroundColor: '#FFCE00', bottom: '25px' }}>
                                                <p className="fw-bold m-0">{cData?.name}</p>
                                                <p className="m-0" style={{ color: '#616161' }}>চেয়ারম্যান</p>
                                            </div>
                                            <Image fluid src={v1} style={{ height: '50%', width: '15%', bottom: '20px', left: '-5px' }} alt="" className="position-absolute" />
                                        </div>
                                    </div>
                                    <Card.Text as='div'>
                                        <p className="fw-bold" style={{ borderBottom: '2px solid black', width: 'fit-content' }}>যোগাযোগ</p>
                                        <p><span className="fw-bold">মোবাইল :</span> {cData?.phone}</p>
                                        <p><span className="fw-bold">ফোন (অফিস) :</span> {cData?.phone_o}</p>
                                        <p><span className="fw-bold">ইমেইল :</span> {cData?.email}</p>
                                        <p><span className="fw-bold">ফ্যাক্স :</span> {cData?.fax}</p>
                                        <p><span className="fw-bold">বর্তমান কর্মস্থলে যোগদানের তারিখ :</span> {cData?.doj?.slice(0, 10)}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="pt-5"  key={sData?._id}>
                            <Card
                                text='dark'
                                style={{ borderRadius: '1rem', backgroundColor: '#F4F4F4' }}
                                className="mb-2 mx-auto border-0"
                            >
                                <Card.Header className="fs-3 p-4" style={{ backgroundColor: '#F4F4F4', borderRadius: "1rem 1rem 0 0" }}>সচিব</Card.Header>
                                <Card.Body className="px-4">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <Image fluid style={{ height: '106px', width: '106px' }} roundedCircle src={sData?.image} />
                                        <div className="position-relative">
                                            <Image fluid src={v2} style={{ height: '50%', width: '15%', top: '-19px', right: '-5px' }} alt="" className="position-absolute" />
                                            <div className="text-center px-3 py-1 position-relative" style={{ backgroundColor: '#FFCE00', bottom: '15px' }}>
                                                <p className="fw-bold m-0">{sData?.name}</p>
                                                <p className="m-0" style={{ color: '#616161' }}>সচিব</p>
                                            </div>
                                            <Image fluid src={v1} style={{ height: '50%', width: '15%', bottom: '11px', left: '-4px' }} alt="" className="position-absolute" />
                                        </div>
                                    </div>
                                    <Card.Text as='div'>
                                        <p className="fw-bold" style={{ borderBottom: '2px solid black', width: 'fit-content' }}>যোগাযোগ</p>
                                        <p><span className="fw-bold">মোবাইল :</span> {sData?.phone}</p>
                                        <p><span className="fw-bold">ফোন (অফিস) :</span> {sData?.phone_o}</p>
                                        <p><span className="fw-bold">ইমেইল :</span> {sData?.email}</p>
                                        <p><span className="fw-bold">ফ্যাক্স :</span> {sData?.fax}</p>
                                        <p><span className="fw-bold">বর্তমান কর্মস্থলে যোগদানের তারিখ :</span> {sData?.doj?.slice(0, 10)}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="pt-5"  key={pData?._id}>
                            <Card
                                text='dark'
                                style={{ borderRadius: '1rem', backgroundColor: '#F4F4F4' }}
                                className="mb-2 mx-auto border-0"
                            >
                                <Card.Header className="fs-3 p-4" style={{ backgroundColor: '#F4F4F4', borderRadius: "1rem 1rem 0 0" }}>প্যানেল চেয়ারম্যান</Card.Header>
                                <Card.Body className="px-4">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <Image fluid style={{ height: '106px', width: '106px' }} roundedCircle src={pData?.image} />
                                        <div className="position-relative">
                                            <Image fluid src={v2} style={{ height: '50%', width: '15%', top: '-19px', right: '-5px' }} alt="" className="position-absolute" />
                                            <div className="text-center px-3 py-1 position-relative" style={{ backgroundColor: '#FFCE00', bottom: '15px' }}>
                                                <p className="fw-bold m-0">{pData?.name}</p>
                                                <p className="m-0" style={{ color: '#616161' }}>প্যানেল চেয়ারম্যান</p>
                                            </div>
                                            <Image fluid src={v1} style={{ height: '50%', width: '15%', bottom: '11px', left: '-4px' }} alt="" className="position-absolute" />
                                        </div>
                                    </div>
                                    <Card.Text as='div'>
                                        <p className="fw-bold" style={{ borderBottom: '2px solid black', width: 'fit-content' }}>যোগাযোগ</p>
                                        <p><span className="fw-bold">মোবাইল :</span> {pData?.phone}</p>
                                        <p><span className="fw-bold">ফোন (অফিস) :</span> {pData?.phone_o}</p>
                                        <p><span className="fw-bold">ইমেইল :</span> {pData?.email}</p>
                                        <p><span className="fw-bold">ফ্যাক্স :</span> {pData?.fax}</p>
                                        <p><span className="fw-bold">বর্তমান কর্মস্থলে যোগদানের তারিখ :</span> {pData?.doj?.slice(0, 10)}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>

                <Col md={3} className='ps-lg-5 text-center'>
                    {
                        intro.slice(0, 3).map(int =>
                            <Row key={int._id}>
                                <Col style={{ width: '195px' }}>
                                    <Image style={{ height: '220px' }} fluid src={int?.image} />
                                    <div className="text-center mx-auto my-4">
                                        <span className="fw-bold m-0 px-4 py-2 rounded-3" style={{ backgroundColor: '#00AA55B2', bottom: '15px', width: "fit-content" }}>{int?.title}</span>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }
                    <Button as={Link} to="/intro_web" variant="danger">বিস্তারিত <BsArrowRight /></Button>
                </Col>
            </Row>
        </Container>
    );
};


export default ManiMember;