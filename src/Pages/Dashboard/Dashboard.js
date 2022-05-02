import React, { useState } from 'react';
import { Col, Container, Nav, Navbar } from 'react-bootstrap';
import DBHeader from '../Shared/DBHeader/DBHeader';
import './Dashboard.css';
import { AiFillDashboard, AiFillHome, AiOutlineFileSync, AiOutlineGlobal, AiFillFileText, AiOutlineUser, AiTwotoneHome } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImBookmarks } from 'react-icons/im';
import { CgCopy } from 'react-icons/cg';
import { IoMdSettings } from 'react-icons/io';
import { NavLink, Outlet } from 'react-router-dom';
import useUser from "../../hooks/useUser";
// import axios from 'axios';
// import axios from 'axios';

const Dashboard = () => {
    const { role } = useUser();
    // const [isLoading, setIsLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const pageNo = JSON.parse(sessionStorage.getItem("dPage"));

    const [activeIndex, setActiveIndex] = React.useState(Number(pageNo) ? Number(pageNo) : 0);
    // console.log(activeIndex)
    const handleOnClick = index => {
        setActiveIndex(index);
        sessionStorage.setItem("dPage", JSON.stringify(index));
        // remove the curly braces
    };

    const [showElement, setShowElement] = React.useState(false)
    React.useEffect(() => {
        setTimeout(function () {
            setShowElement(true)
        }, 500);
    }, [])

    return (
        <>
            {showElement ? <DBHeader /> : ""}
            <div className="h-100">

                <div sm={2} className='d-flex flex-column flex-lg-row overflow-auto'>
                    <Navbar expanded={expanded} as={Col} md={3} expand="lg" variant="dark" className="text-white align-items-start side-nav">
                        <div className="d-flex flex-column nav-tog">
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="p-0" onClick={() => setExpanded(expanded ? false : "expanded")} />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                {role === "1" ?
                                    <Nav className='flex-column w-100 fs-5' style={{ height: '100vh' }}>
                                        <Nav.Link as={NavLink} to='db-home' onClick={() => { setExpanded(false); handleOnClick(0) }} ><AiFillDashboard className="mx-3" />ড্যাশবোর্ড</Nav.Link>

                                        <Nav.Link as={NavLink} to='resident' onClick={() => { setExpanded(false); handleOnClick(0) }} ><AiFillHome className="mx-3" />আবাসিক</Nav.Link>

                                        <Nav.Link as={NavLink} to='commerce' onClick={() => { setExpanded(false); handleOnClick(0) }} ><FaCalendarAlt className="mx-3" />বানিজ্যিক</Nav.Link>

                                        <Nav.Link as={NavLink} to='tread-license' onClick={() => { setExpanded(false); handleOnClick(0) }}><ImBookmarks className="mx-3" />ট্রেড লাইসেন্স</Nav.Link>

                                        <div className="dropdown">
                                            <Nav.Link className={`dropbtn ${activeIndex === 1 ? "active" : ""}`}><AiOutlineFileSync className="mx-3" />সনদপত্র</Nav.Link>
                                            <div className="dropdown-content py-3">
                                                <Nav.Link as={NavLink} className="dropLink" to='ccharacter' onClick={() => { setExpanded(false); handleOnClick(1) }} >চারিত্রিক সনদপত্র</Nav.Link>
                                                {/* onClick={() => { handleOnClick(9); handleWordFilter(9) }} */}
                                                <Nav.Link as={NavLink} className="dropLink" to='cnagorik' onClick={() => { setExpanded(false); handleOnClick(1) }} >নাগরিক সনদপত্র</Nav.Link>
                                                <Nav.Link as={NavLink} className="dropLink" to='cowarish' onClick={() => { setExpanded(false); handleOnClick(1) }} >ওয়ারিশ সনদপত্র</Nav.Link>
                                            </div>
                                        </div>
                                        <div className="dropdown">
                                            <Nav.Link className={`dropbtn ${activeIndex === 2 ? "active" : ""}`}><AiOutlineGlobal className="mx-3" />ওয়েবসাইট</Nav.Link>
                                            <div className="dropdown-content py-3">
                                                <Nav.Link as={NavLink} className="dropLink" to='wchairman' onClick={() => { setExpanded(false); handleOnClick(2) }} >চেয়ারম্যান</Nav.Link>
                                                <Nav.Link as={NavLink} className="dropLink" to='wsacib' onClick={() => { setExpanded(false); handleOnClick(2) }} >সচিব</Nav.Link>
                                                <Nav.Link as={NavLink} className="dropLink" to='wpanel' onClick={() => { setExpanded(false); handleOnClick(2) }} >প্যানেল চেয়ারম্যান</Nav.Link>
                                                <Nav.Link as={NavLink} className="dropLink" to='wmembar' onClick={() => { setExpanded(false); handleOnClick(2) }}>মেম্বার</Nav.Link>
                                                <Nav.Link as={NavLink} className="dropLink" to='entrepreneur' onClick={() => { setExpanded(false); handleOnClick(2) }}>উদ্যোক্তা</Nav.Link>
                                            </div>
                                        </div>
                                        <div className="dropdown">
                                            <Nav.Link className={`dropbtn ${activeIndex === 3 ? "active" : ""}`}><CgCopy className="mx-3" />পাতা সমূহ</Nav.Link>
                                            <div className="dropdown-content py-3">
                                                <Nav.Link as={NavLink} className="dropLink" to='pmain' onClick={() => { setExpanded(false); handleOnClick(3) }} >মূল পাতা</Nav.Link>
                                                <Nav.Link as={NavLink} className="dropLink" to='president' onClick={() => { setExpanded(false); handleOnClick(3) }} >আবাসিক</Nav.Link>
                                                <Nav.Link as={NavLink} className="dropLink" to='pcommerse' onClick={() => { setExpanded(false); handleOnClick(3) }} >বাণিজ্যিক</Nav.Link>
                                                <Nav.Link as={NavLink} className="dropLink" to='pcontact' onClick={() => { setExpanded(false); handleOnClick(3) }} >যোগাযোগ</Nav.Link>
                                            </div>
                                        </div>
                                        <Nav.Link as={NavLink} to='notice' onClick={() => { setExpanded(false); handleOnClick(0) }} ><AiFillFileText className="mx-3" />নোটিশ</Nav.Link>
                                        <Nav.Link as={NavLink} to='profile' onClick={() => { setExpanded(false); handleOnClick(0) }} ><AiOutlineUser className="mx-3" />প্রোফাইল</Nav.Link>
                                        <Nav.Link as={NavLink} to='settings' onClick={() => { setExpanded(false); handleOnClick(0) }} ><IoMdSettings className="mx-3" />সেটিংস</Nav.Link>
                                        <Nav.Link as={NavLink} to='/home' onClick={() => { setExpanded(false); handleOnClick(0) }} ><AiTwotoneHome className="mx-3" />মূল পাতা</Nav.Link>
                                    </Nav>
                                    : ''}
                                {role === "0" ?
                                    <Nav className='flex-column w-100 fs-5' style={{ height: '100vh' }}>
                                        <Nav.Link as={NavLink} to='db-home' onClick={() => { setExpanded(false); handleOnClick(0) }} ><AiFillDashboard className="mx-3" />ড্যাশবোর্ড</Nav.Link>

                                        {/* <Nav.Link onClick={() => setExpanded(false)}><Link className="nav-link" to="db-home"><AiFillDashboard className="mx-3" />Dashboard</Link></Nav.Link> */}

                                        <Nav.Link as={NavLink} to='resident' onClick={() => { setExpanded(false); handleOnClick(0) }} ><AiFillHome className="mx-3" />আবাসিক</Nav.Link>

                                        <Nav.Link as={NavLink} to='commerce' onClick={() => { setExpanded(false); handleOnClick(0) }} ><FaCalendarAlt className="mx-3" />বানিজ্যিক</Nav.Link>

                                        <Nav.Link as={NavLink} to='tread-license' onClick={() => { setExpanded(false); handleOnClick(0) }}><ImBookmarks className="mx-3" />ট্রেড লাইসেন্স</Nav.Link>

                                        <div className="dropdown">
                                            <Nav.Link className={`dropbtn ${activeIndex === 1 ? "active" : ""}`}><AiOutlineFileSync className="mx-3" />সনদপত্র</Nav.Link>
                                            <div className="dropdown-content py-3">
                                                <Nav.Link as={NavLink} className="dropLink" to='ccharacter' onClick={() => { setExpanded(false); handleOnClick(1) }} >চারিত্রিক সনদপত্র</Nav.Link>
                                                {/* onClick={() => { handleOnClick(9); handleWordFilter(9) }} */}
                                                <Nav.Link as={NavLink} className="dropLink" to='cnagorik' onClick={() => { setExpanded(false); handleOnClick(1) }} >নাগরিক সনদপত্র</Nav.Link>
                                                <Nav.Link as={NavLink} className="dropLink" to='cowarish' onClick={() => { setExpanded(false); handleOnClick(1) }} >ওয়ারিশ সনদপত্র</Nav.Link>
                                            </div>
                                        </div>
                                        <Nav.Link as={NavLink} to='/home' onClick={() => setExpanded(false)} ><AiTwotoneHome className="mx-3" />মূল পাতা</Nav.Link>
                                    </Nav>
                                    : ''}
                            </Navbar.Collapse>
                        </div>
                    </Navbar >

                    <Container className='mx-auto my-5'>
                        {showElement ? <Outlet /> : ''}
                    </Container>
                </div >

            </div >
        </>
    );
};

export default Dashboard;