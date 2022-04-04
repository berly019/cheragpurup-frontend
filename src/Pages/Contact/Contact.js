import React from 'react';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import About from './About/About';
import Banner from './Banner/Banner';
import Map from './Map/Map';
import SkeletonLoader from "tiny-skeleton-loader-react";
import axios from 'axios';

const Contact = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        axios.get('https://hasadahoup-mongo-server.herokuapp.com/')
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