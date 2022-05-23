import React, { useContext } from 'react';
import Header from '../Shared/Header/Header';
import About from './About/About';
import Banner from './Banner/Banner';
import ManiMember from './MainMember/ManiMember';
import Soldier from './Soldier/Soldier';
import UpMember from './UpMember/UpMember';
import Entrepreneur from './Entrepreneur/Entrepreneur';
import Footer from '../Shared/Footer/Footer';
import SkeletonLoader from "tiny-skeleton-loader-react";
import { DataContext } from '../../contexts/DataContext';

const Home = () => {

    const { dLoading } = useContext(DataContext);

    return (
        <>

            {!dLoading ?
                <  SkeletonLoader style={{ height: '100vh', width: '100vw' }} background="#eff1f6" />
                : <div>
                    <Header />
                    <Banner />
                    <div style={{ maxWidth: '960px', margin: 'auto' }}>
                        <div className='bg-illus'>
                            <About />
                        </div>
                        <div className='bg-illus'>
                            <ManiMember />
                            <Soldier />
                        </div>
                        <div className='bg-illus'>
                            <UpMember />
                        </div>
                        <div className='bg-illus'>
                            <Entrepreneur />
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    );
};

export default Home;