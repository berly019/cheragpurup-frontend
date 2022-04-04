import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const Map = () => {
    const [pMData, setPMData] = useState([]);

    useEffect(() => {
        axios.get('https://hasadahoup-mongo-server.herokuapp.com/up/pMain')
            .then(data => {
                setPMData(data?.data[0]);
            })
    }, [])
    return (
        <Container className="text-center pb-5 p-0">
            <div className="pb-5">
                <p className='fs-2 fw-bold mb-0'>যোগাযোগ</p>
                <p className='fs-6'>{pMData?.name}, {pMData?.location}</p>
            </div>
            <iframe title='হাসাদাহ ইউনিয়ন পরিষদ, আলমডাঙ্গা , চুয়াডাঙ্গা' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.3612301864223!2d88.8644969146184!3d23.411314807562587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fed677ac3b7157%3A0xf3ec84f3f2dedb67!2sHasadah%20Union%20Council%2C%20Chuadanga%20-%20Kaliganj%20Rd!5e0!3m2!1sen!2sbd!4v1649009997402!5m2!1sen!2sbd" width="100%" height="550" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </Container>
    );
};

export default Map;