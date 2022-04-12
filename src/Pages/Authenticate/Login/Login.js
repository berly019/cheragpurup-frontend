import React from 'react';
import Banner from './Banner/Banner';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import LForm from './LForm/LForm';
import axios from 'axios';
import SkeletonLoader from "tiny-skeleton-loader-react";

const Login = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/`)
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
                    <div style={{ maxWidth: '960px', margin: 'auto' }}>
                        <LForm />
                    </div>
                    <Footer />
                </div>}
        </>
    );
};

export default Login;