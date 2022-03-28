import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../../media/logo.png';
import './Header.css'

const Header = () => {
    const style = {
        height: '40px',
        width: '40px',
        marginRight: '10px',
    }

    // change nav color
    const [color, setColor] = useState(false);
    useEffect(() => {
        const colorChange = () => {
            if (window.scrollY >= 100) {
                setColor(true);
            } else {
                setColor(false);
            }
        }
        window.addEventListener('scroll', colorChange);
    }, [setColor])

    return (
        <Navbar collapseOnSelect expand="lg" fixed="top" className={color ? 'bg-success' : ''} variant="dark">
            <Container className='mainHead'>
                <Navbar.Brand href="/home" className="fs-5">
                    <Image fluid src={logo} alt="logo" style={style} />
                    <span className="text-white">স্থানীয় সরকার বিভাগ</span>
                </Navbar.Brand>
                <span className="text-white ps-5 d-none d-lg-block">|</span>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className='bg-xsc rounded'>
                    <Nav className="mx-auto">
                        <Nav.Link as={NavLink} className="text-white px-3 fs-5" to="/home">মূল পাতা</Nav.Link>
                        <Nav.Link as={NavLink} className="text-white px-3 fs-5" to="/residential">আবাসিক করদাতা</Nav.Link>
                        <Nav.Link as={NavLink} className="text-white px-3 fs-5" to="/commercial">বাণিজ্যিক করদাতা</Nav.Link>
                        <Nav.Link as={NavLink} className="text-white px-3 fs-5" to="/contact">যোগাযোগ</Nav.Link>
                    </Nav>
                    <span className="text-white pe-5 d-none d-lg-block">|</span>
                    <div>
                        <Button as={NavLink} className="btn btn-success fs-5 m-3 py-0 border" to="/login">লগ ইন</Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;