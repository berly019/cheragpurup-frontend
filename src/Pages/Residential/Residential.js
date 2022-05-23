import React, { useContext } from 'react';
import Banner from './Banner/Banner';
import DTableR from './DTableR/DTableR';
import '../Home/Banner/Banner.css'
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import SkeletonLoader from "tiny-skeleton-loader-react";
import { DataContext } from '../../contexts/DataContext';

const Residential = () => {

    const { dLoading } = useContext(DataContext);

    return (
        <>
            {!dLoading ?
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