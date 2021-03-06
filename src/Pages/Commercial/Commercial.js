import React, { useContext } from 'react';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import Banner from './Banner/Banner';
import DTableC from './DTableC/BTableC';
import SkeletonLoader from "tiny-skeleton-loader-react";
import { DataContext } from '../../contexts/DataContext';

const Commercial = () => {

    const { dLoading } = useContext(DataContext);

    return (
        <>
            {!dLoading ?
                <  SkeletonLoader style={{ height: '100vh', width: '100vw' }} background="#eff1f6" />
                : <div>
                    <Header />
                    <Banner />
                    <div className='bg-illus' style={{ maxWidth: '960px', margin: 'auto' }}>
                        <DTableC />
                    </div>
                    <Footer />
                </div>
            }
        </>
    );
};

export default Commercial;