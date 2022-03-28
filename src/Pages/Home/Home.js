import React from 'react';
import Header from '../Shared/Header/Header';
import About from './About/About';
import Banner from './Banner/Banner';
import ManiMember from './MainMember/ManiMember';
import Soldier from './Soldier/Soldier';
import UpMember from './UpMember/UpMember';
import Footer from '../Shared/Footer/Footer';
import axios from 'axios';
import SkeletonLoader from "tiny-skeleton-loader-react";

const Home = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        axios.get('https://khadimpur-mongoose-backend.herokuapp.com/')
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
                </div>
            }
        </>
    );
};

export default Home;