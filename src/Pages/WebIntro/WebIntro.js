import React, { useContext } from 'react';
import Banner from '../Home/Banner/Banner';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import DataTable from './DataTable/DataTable';
import Intros from './Intros/Intros';
import SkeletonLoader from "tiny-skeleton-loader-react";
import { DataContext } from '../../contexts/DataContext';

const WebIntro = () => {

    const { dLoading } = useContext(DataContext)

    return (
        <>
            {!dLoading ?
                <  SkeletonLoader style={{ height: '100vh', width: '100vw' }} background="#eff1f6" />
                : <div>
                    <Header />
                    <Banner />
                    <div style={{ maxWidth: '960px', margin: 'auto' }}>
                        <div className='bg-illus'>
                            <DataTable />
                        </div>
                        <div className='bg-illus'>
                            <Intros />
                        </div>
                    </div>
                    <Footer />
                </div>
            }
        </>
    );
};

export default WebIntro;


/* 
        <>
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
            </div>
            <Footer />
        </>
*/