import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [pMData, setPMData] = useState([]);
    useEffect(() => {
        axios.get('https://hasadahoup-mongo-server.herokuapp.com/up/pMain')
            .then(data => {
                setPMData(data?.data[0]);
            })
    }, [])
    return (
        <div className="p-5 bg-success text-white text-center">
            <p className="fs-5">{pMData?.name} - {pMData?.location}</p>
            <p className="fs-5">© 2022. All rights reserved by <a style={{ textDecoration: 'none' }} href="https://makereal.io/" className="text-white copyright">Make Real.</a></p>
        </div>
    );
};

export default Footer;