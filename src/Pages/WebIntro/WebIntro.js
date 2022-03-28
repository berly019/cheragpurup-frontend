import axios from 'axios';
import React from 'react';
import Banner from '../Home/Banner/Banner';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import DataTable from './DataTable/DataTable';
import Intros from './Intros/Intros';
import SkeletonLoader from "tiny-skeleton-loader-react";

const WebIntro = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com')
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