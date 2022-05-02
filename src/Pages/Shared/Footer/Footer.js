import React, { useContext } from 'react';
import { DataContext } from '../../../contexts/DataContext';
import './Footer.css';

const Footer = () => {
    
    const {pMainData} = useContext(DataContext);

    return (
        <div className="p-5 bg-success text-white text-center">
            <p className="fs-5">{pMainData?.name} - {pMainData?.location}</p>
            <p className="fs-5">© 2022. All rights reserved by <a style={{ textDecoration: 'none' }} href="https://makereal.io/" className="text-white copyright">Make Real.</a></p>
        </div>
    );
};

export default Footer;