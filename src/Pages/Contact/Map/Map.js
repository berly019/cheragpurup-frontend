import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const Map = () => {
    const [pMData, setPMData] = useState([]);

    useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/pMain')
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
            <iframe title='খাদিমপুর ইউনিয়ন পরিষদ, আলমডাঙ্গা , চুয়াডাঙ্গা' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719543.889137495!2d88.10408629230166!3d24.438046524012336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fecb968bfa6803%3A0xa1e30807581ae077!2zS2hhZGltcHVyIFVQIOCmluCmvuCmpuCmv-CmriDgpqrgp4HgprAg4KaH4KaJ4Kao4Ka_4Kav4Ka84KaoIOCmquCmsOCmv-Cmt-Cmpg!5e0!3m2!1sen!2sbd!4v1647704930215!5m2!1sen!2sbd" width="100%" height="550" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </Container>
    );
};

export default Map;