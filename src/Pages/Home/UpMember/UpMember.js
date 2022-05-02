import React, { useContext } from 'react';
import { Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { DataContext } from '../../../contexts/DataContext';

const UpMember = () => {

    const { isLoading, wMemberData } = useContext(DataContext);

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
    return (
        <Container className="py-5">
            <p className="fs-2 fw-bold text-center mx-auto" style={{ borderBottom: '2px solid #ADADAD', width: 'fit-content' }}>দুবলহাটি ইউনিয়নের মেম্বারদের তালিকা</p>
            <Row xs={1} sm={2} lg={3} className="gy-5 py-5">
                {
                    wMemberData.map(dt =>
                        <Col key={dt._id}>
                            <Card
                                text='dark'
                                style={{ width: '18rem', borderRadius: '1rem', backgroundColor: '#F4F4F4' }}
                                className="mb-2 mx-auto border-0"
                            >
                                <Card.Header className="fs-4" style={{ backgroundColor: '#F4F4F4', borderRadius: "1rem 1rem 0 0" }}>দুবলহাটি ইউনিয়নের সদস্য</Card.Header>
                                <Card.Body className="px-4">
                                    <div className="d-flex justify-content-between align-items-center pb-3">
                                        <Image fluid style={{ height: '85px', width: '85px' }} roundedCircle src={dt?.image} />
                                        <div>
                                            <p className="fw-bold m-0">{dt?.name}</p>
                                            <hr className="m-0" style={{ height: "2px", background: '#FFCE00' }} />
                                            <p className="m-0">মেম্বার</p>
                                        </div>
                                    </div>
                                    <Card.Text as='div'>
                                        <p><span className="fw-bold">পদবী :</span> {dt?.desi}</p>
                                        <p><span className="fw-bold">মোবাইল :</span> {dt?.phone}</p>
                                        <p><span className="fw-bold">ইমেইল :</span> {dt?.email}</p>
                                        <p><span className="fw-bold">বর্তমান কর্মস্থলে যোগদানের তারিখ :</span> {dt?.doj?.slice(0, 10)}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
            </Row>
        </Container>
    );
};

export default UpMember;