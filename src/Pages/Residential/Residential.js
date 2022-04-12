import React from 'react';
import Banner from './Banner/Banner';
import DTableR from './DTableR/DTableR';
import '../Home/Banner/Banner.css'
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import SkeletonLoader from "tiny-skeleton-loader-react";
import axios from 'axios';

const Residential = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}`)
            .then(res => {
                // console.log(res);
                setIsLoading(true);
            })
    }, []);

    return (
        <>
            {!isLoading ?
                <  SkeletonLoader style={{ height: '100vh', width: '100vw' }} background="#eff1f6" />
                : <div>
                    <Header />
                    <Banner />
                    <div className='bg-illus' style={{ maxWidth: '960px', margin: 'auto' }}>
                        <DTableR />
                    </div>
                    <Footer />
                </div>}
        </>
    );
};

export default Residential;