import axios from 'axios';
import React from 'react';
import {Col, Container, Row } from 'react-bootstrap';
import '../../Home/Banner/Banner.css';

const Banner = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/up/pcommerce`)
            .then(data => {
                setData(data.data[0]);
            })
    }, []);
    
    const bg = data?.image;
    const bg4 = {
        backgroundImage: `linear-gradient(rgba(0, 155, 85, 0.4),rgba(0, 170, 136, 0.4),rgba(0, 55, 87, 0.4),rgba(0, 55, 87, 0.4),rgb(227, 32, 49, 0.4)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "60vh",
    }
    return (
        <section>
            <div style={bg4}></div>
            <div className='bg-content'>
                <Container className="p-md-5 text-center">
                    <Row xs="auto" md={2} className="align-items-center justify-content-center">
                        <Col>
                            <p className="fs-1 fw-bold">{data?.name}</p>
                            <p className="fs-2">{data?.location}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export default Banner;