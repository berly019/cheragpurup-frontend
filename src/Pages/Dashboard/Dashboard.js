import React, { useState } from 'react';
import { Button, Col, Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import DBHeader from '../Shared/DBHeader/DBHeader';
import './Dashboard.css';
import { AiFillDashboard, AiFillHome, AiOutlineFileSync, AiOutlineGlobal, AiFillFileText, AiOutlineUser, AiTwotoneHome } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImBookmarks } from 'react-icons/im';
import { CgCopy } from 'react-icons/cg';
import { IoMdSettings } from 'react-icons/io';
import { NavLink, Outlet } from 'react-router-dom';
// import axios from 'axios';
// import axios from 'axios';

const Dashboard = () => {

    // const [isLoading, setIsLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    // const [currentUser, setCurrentUser] = useState(undefined);
    const [role, setRole] = useState(undefined);
    const token = JSON.parse(sessionStorage.getItem("user"));

    React.useEffect(() => {
        if (token) {
            fetch('https://khadimpur-mongoose-backend.herokuapp.com/up/db_user/user/token', {
                method: 'POST',
                headers: { Authorization: 'Bearer ' + token.access_token }
            }).then(response => response.json())
                .then(data => {
                    setRole(data?.data?.role)
                    // console.log(data?.data?.role)
                });
        }
    }, [token]);

    const [activeIndex, setActiveIndex] = React.useState(0);
    const handleOnClick = index => {
        setActiveIndex(index);
        // remove the curly braces
    };

    // useEffect(() => {
    //     if (token) {
    //         axios.get('https://khadimpur-mongoose-backend.herokuapp.com/up/db_user', { headers: { 'Authorization': 'Bearer' + ' ' + token.access_token } })
    //             .then(res => {
    //                 // setCurrentUser(res?.data);
    //                 setRole(res?.data[0]?.role);
    //                 console.log(res);
    //                 setIsLoading(true)
    //             })
    //     }
    // }, [token]);

    // if (!currentUser || !token) {
    //     return <div className="text-center 100vh pt-5">
    //         <Button variant="success" disabled>
    //             <Spinner
    //                 as="span"
    //                 animation="grow"
    //                 size="sm"
    //                 role="status"
    //                 aria-hidden="true"
    //             />
    //             Your Session Is Expired, Please Login
    //         </Button><br />
    //         <Button className="mt-3" as={NavLink} to="/login" variant="outline-danger">Login</Button>
    //     </div>
    // }

    // if (!isLoading) {
    //     return <div className="text-center 100vh pt-5">
    //         <Button variant="success" disabled>
    //             <Spinner
    //                 as="span"
    //                 animation="grow"
    //                 size="sm"
    //                 role="status"
    //                 aria-hidden="true"
    //             />
    //             Loading...
    //         </Button>
    //     </div>
    // }

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

                {!token ?
                    <div className="text-center 100vh pt-5">
                        <Button variant="success" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Your Session Is Expired, Please Login
                        </Button><br />
                        <Button className="mt-3" as={NavLink} to="/login" variant="outline-danger">Login</Button>
                        {/* <div sm={2} className='d-flex flex-column flex-lg-row overflow-auto'> */}
                    </div>
                    :
                    <div sm={2} className='d-flex flex-column flex-lg-row overflow-auto'>
                        <Navbar expanded={expanded} as={Col} md={3} expand="lg" variant="dark" className="text-white align-items-start side-nav">
                            <div className="d-flex flex-column nav-tog">
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="p-0" onClick={() => setExpanded(expanded ? false : "expanded")} />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    {role === "1" ?
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
                                            <div className="dropdown">
                                                <Nav.Link className={`dropbtn ${activeIndex === 2 ? "active" : ""}`}><AiOutlineGlobal className="mx-3" />ওয়েবসাইট</Nav.Link>
                                                <div className="dropdown-content py-3">
                                                    <Nav.Link as={NavLink} className="dropLink" to='wchairman' onClick={() => { setExpanded(false); handleOnClick(2) }} >চেয়ারম্যান</Nav.Link>
                                                    <Nav.Link as={NavLink} className="dropLink" to='wsacib' onClick={() => { setExpanded(false); handleOnClick(2) }} >সচিব</Nav.Link>
                                                    <Nav.Link as={NavLink} className="dropLink" to='wpanel' onClick={() => { setExpanded(false); handleOnClick(2) }} >প্যানেল চেয়ারম্যান</Nav.Link>
                                                    <Nav.Link as={NavLink} className="dropLink" to='wmembar' onClick={() => { setExpanded(false); handleOnClick(2) }}>মেম্বার</Nav.Link>
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

                        {/* <Navbar expanded={expanded} fixed="top" bg="dark" expand="lg" variant="dark">
                        <Navbar.Brand href="/"><img src="{LifeBar} "alt="logo" thumbnail style={{ height: 100, marginLeft: 20 }} className="logos" /></Navbar.Brand>
                        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link onClick={() => setExpanded(false)}><Link className="nav-link" to="db-home">Home</Link></Nav.Link>
                                <Nav.Link onClick={() => setExpanded(false)}><Link className="nav-link" to="resident">Bio</Link></Nav.Link>
                                <Nav.Link onClick={() => setExpanded(false)}><Link className="nav-link" to="/appearances">Appearances</Link></Nav.Link>
                                <Nav.Link onClick={() => setExpanded(false)}><Link className="nav-link" to="/support">Support</Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar> */}

                        {/* <Col style={{ maxWidth: '960px' }} className='mx-auto my-5'> */}
                        <Container className='mx-auto my-5'>
                            {showElement ? <Outlet /> : ''}
                        </Container>
                    </div >
                }
            </div >
        </>
    );
};

export default Dashboard;