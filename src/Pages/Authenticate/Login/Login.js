import React, { useContext } from 'react';
import Banner from './Banner/Banner';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import LForm from './LForm/LForm';
import SkeletonLoader from "tiny-skeleton-loader-react";
import { DataContext } from '../../../contexts/DataContext';

const Login = () => {

const {dLoading} = useContext(DataContext);

    return (
        <>
            {!dLoading ?
                <  SkeletonLoader style={{ height: '100vh', width: '100vw' }} background="#eff1f6" />
                : <div>
                    <Header />
                    <Banner />
                    <div style={{ maxWidth: '960px', margin: 'auto' }}>
                        <LForm />
                    </div>
                    <Footer />
                </div>}
        </>
    );
};

export default Login;