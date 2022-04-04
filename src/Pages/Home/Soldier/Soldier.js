import axios from 'axios';
import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';

const Soldier = () => {
    // handle image
    const [pbImage, setpbImage] = React.useState([]);
    React.useEffect(() => {
        axios.get('https://hasadahoup-mongo-server.herokuapp.com/up/pbimage')
            .then(res => setpbImage(res.data))
    }, []);

    return (
        <Container className="py-5">
            <Row xs={1} md={2} className='gy-5 py-5 text-center'>
                {
                    pbImage.map(pbi =>
                        <Col key={pbi._id}>
                            <Card
                                text='dark'
                                style={{ borderRadius: '1rem', backgroundColor: '#F4F4F4' }}
                                className="mx-auto h-100"
                            >
                                <Card.Header className="fs-4" style={{ backgroundColor: '#F4F4F4', borderRadius: "1rem 1rem 0 0" }}>{pbi?.title}</Card.Header>
                                <Card.Body className="p-0" style={{maxHeight:"250px"}}>
                                {/* <Card.Body className="p-0"> */}
                                    <Image fluid src={pbi?.image} style={{ borderRadius: '0 0 1rem 1rem', height: '100%', width: '100%' }}
                                     />
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
            </Row>
        </Container>
    );
};

export default Soldier;