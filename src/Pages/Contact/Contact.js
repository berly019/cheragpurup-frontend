import React, { useContext } from 'react';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import About from './About/About';
import Banner from './Banner/Banner';
import Map from './Map/Map';
import SkeletonLoader from "tiny-skeleton-loader-react";
import { DataContext } from '../../contexts/DataContext';

const Contact = () => {

    const { dLoading } = useContext(DataContext);

    return (
        <>
            {!dLoading ?
                <  SkeletonLoader style={{ height: '100vh', width: '100vw' }} background="#eff1f6" />
                : <div>
                    <Header />
                    <Banner />
                    <div style={{ maxWidth: '960px', margin: 'auto' }}>
                        <div className="bg-illus">
                            <About />
                        </div>
                        <div className="bg-illus">
                            <Map />
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    );
};

export default Contact;