import axios from 'axios';
import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import ShowModal from './ShowModal';

const Intros = () => {
    const [intro, setIntro] = React.useState([]);

    const [editInto, setEditIntro] = React.useState(false);
    const [modalId, setModalId] = React.useState('');
    const [modalData, setModalData] = React.useState('');

    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/intro')
            .then(res => setIntro(res.data))
    }, [])

    return (
        <Container>
            <ShowModal
                id={modalId}
                data={modalData}
                show={editInto}
                onHide={() => setEditIntro(false)}
            />
            <Row xs={1} md={2} className='gy-5 py-5 text-center'>
                {
                    intro.map(int =>
                        <Col key={int._id}>
                            <Card
                                text='dark'
                                style={{ borderRadius: '1rem', backgroundColor: '#F4F4F4', border: "2px solid #00AA55" }}
                                className="mb-2 mx-auto h-100"
                            >
                                <Card.Header className="fs-4" style={{ backgroundColor: '#fff', borderRadius: "1rem 1rem 0 0", borderBottom: "2px solid #00AA55" }}>{int.title}</Card.Header>

                                <Card.Body className="p-0 d-flex align-items-center" >

                                    <Image className="w-50" fluid src={int?.image} style={{ borderRadius: '0 0 0 0.90rem', height: "-webkit-fill-available" }} />
                                    <Card.Text className="w-50 p-1 p-md-2" style={{ textAlign: 'justify' }}>
                                        {int?.texts?.slice(0, 4).map(txt =>
                                            <p key={txt?._id} className="mb-2">{txt?.serialNo}। {txt?.descText}</p>
                                        )}
                                        <div className="text-center">
                                            <Button size="sm" className="px-4" variant="outline-success" onClick={() => { setEditIntro(true); setModalId(int?._id); setModalData(int) }}>সব দেখুন</Button>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }

                {/* <Col>
                    <Card
                        text='dark'
                        style={{ borderRadius: '1rem', backgroundColor: '#F4F4F4', border: "2px solid #00AA55" }}
                        className="mb-2 mx-auto h-100"
                    >
                        <Card.Header className="fs-4" style={{ backgroundColor: '#fff', borderRadius: "1rem 1rem 0 0", borderBottom: "2px solid #00AA55" }}>ডাকঘর</Card.Header>
                        <Card.Body className="p-0 d-flex align-items-center">
                            <Image className="w-50" fluid src={"img1"} style={{ borderRadius: '0 0 0 0.90rem', height: "-webkit-fill-available" }} />
                            <Card.Text className="w-50 p-2 p-md-4" style={{ textAlign: 'justify' }}>
                                ১। নারায়নপাড়া আব্দুল কাদের মাদ্রাসা জামে মসজিদ । <br />
                                ২। নারায়নপাড়া আব্দুল কাদের মাদ্রাসা জামে মসজিদ । <br />
                                ৩। উজালপুর দক্ষিন জামে মসজিদ। <br />
                                ৪। উজালপুর উত্তর পাড়া জামে মসজিদ। <br />
                                ৪। উজালপুর উত্তর পাড়া জামে মসজিদ। <br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col> */}
            </Row>
        </Container>
    );
};

export default Intros;