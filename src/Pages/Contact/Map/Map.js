import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { DataContext } from '../../../contexts/DataContext';

const Map = () => {
    const { pMainData } = useContext(DataContext);

    return (
        <Container className="text-center pb-5 p-0">
            <div className="pb-5">
                <p className='fs-2 fw-bold mb-0'>যোগাযোগ</p>
                <p className='fs-6'>{pMainData?.name}, {pMainData?.location}</p>
            </div>
            <iframe title='দুবলহাটি ইউনিয়ন পরিষদ, নওগাঁ সদর, নওগাঁ' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.26645528689!2d88.88124602426346!3d24.786327936677896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc7b9c871f580b%3A0xbbc69ed8b6542472!2sDubalhati%20Rajbari%20Building!5e0!3m2!1sen!2sbd!4v1649271512709!5m2!1sen!2sbd" width="100%" height="550" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </Container>
    );
};

export default Map;