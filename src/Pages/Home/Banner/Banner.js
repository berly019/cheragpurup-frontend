import React, { useContext } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Marquee from 'react-fast-marquee';
import { DataContext } from '../../../contexts/DataContext';
import './Banner.css';

const Banner = () => {
    const { pMainData, notice, runNotice } = useContext(DataContext);

    const bg = pMainData?.image;
    const bg4 = {
        backgroundImage: `linear-gradient(rgba(0, 155, 85, 0.4),rgba(0, 170, 136, 0.4),rgba(0, 55, 87, 0.4),rgba(0, 55, 87, 0.4),rgb(227, 32, 49, 0.4)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "86vh",
        filter: "brightness(0.5)"
    }

    return (
        <>
            <section>
                <div style={bg4}></div>
                <div className='bg-content'>
                    <Container>
                        <Row xs="auto" md={2} className="align-items-center justify-content-center">
                            <Col>
                                <p className="fs-1 fw-bold">{pMainData?.name}</p>
                                <p className="fs-2">{pMainData?.location}</p>
                            </Col>
                            <Col>
                                <Carousel controls={false} indicators={true}>
                                    {notice.map(data =>
                                        <Carousel.Item key={data._id} interval={5000}>
                                            <img
                                                className="d-block w-100"
                                                src={data.image}
                                                alt="slide"
                                            />
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
            <div className="mt-3 d-flex fs-5 fw-bold" style={{ backgroundColor: '#C4C4C4' }}>
                <p className="px-4 bg-white py-3" style={{ margin: '1px 0px 1px 0px' }}>নোটিশ</p>
                <Marquee pauseOnHover gradient={false} className="py-3 overflow-hidden">{runNotice?.map(dt => dt?.notice)}</Marquee>
            </div>
        </>
    );
};

export default Banner;