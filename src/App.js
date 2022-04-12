// import logo from './logo.svg';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import './App.css';
import './Pages/Home/Banner/Banner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Commercial from './Pages/Commercial/Commercial';
import Contact from './Pages/Contact/Contact';
import Home from './Pages/Home/Home';
import Residential from './Pages/Residential/Residential';
import Dashboard from './Pages/Dashboard/Dashboard';
import Resident from './Pages/Dashboard/Resident/Resident';
import Commerce from './Pages/Dashboard/Commerce/Commerce';
import TreadLicense from './Pages/Dashboard/TreadLicense/TreadLicense';
import Notice from './Pages/Dashboard/Notice/Notice';
import Profile from './Pages/Dashboard/Profile/Profile';
import Setting from './Pages/Dashboard/Setting/Setting';
import DBHome from './Pages/Dashboard/DBHome/DBHome';
import PMain from './Pages/Dashboard/Page/PMain/PMain';
import PResident from './Pages/Dashboard/Page/PResident/PResident';
import PCommerse from './Pages/Dashboard/Page/PCommerse/PCommerse';
import PContact from './Pages/Dashboard/Page/PContact/PContact';
import WMember from './Pages/Dashboard/Website/WMember/WMember';
import Entrepreneur from './Pages/Dashboard/Website/Entrepreneur/Entrepreneur';
import Wpanel from './Pages/Dashboard/Website/WPanel/WPanel';
import WChairman from './Pages/Dashboard/Website/WChairman/WChairman';
import WSacib from './Pages/Dashboard/Website/WSacib/WSacib';
import CCharacter from './Pages/Dashboard/Certificate/CCharacter/CCharacter';
import CNagorik from './Pages/Dashboard/Certificate/CNagorik/CNagorik';
import COwarish from './Pages/Dashboard/Certificate/COwarish/COwarish';
import Login from './Pages/Authenticate/Login/Login';
import ChangePass from "./Pages/Dashboard/Setting/ChagePassModal/ChagePass"
import PrivateRoute from './Pages/Authenticate/ProtectedRoute/ProtectedRoute';
// import ModeratorRoute from './Pages/Authenticate/ModeratorRoute/ModeratorRoute';
import React, { useState } from 'react';
// import axios from 'axios';
import WebIntro from './Pages/WebIntro/WebIntro';

function App() {

  // const [db, setIsDB] = useState(false);
  // const [currentUser, setCurrentUser] = useState(undefined);
  const [role, setRole] = useState(undefined);

  const token = JSON.parse(sessionStorage.getItem("user"));
  React.useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_BASE_URL}/up/db_user/user/token`, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token.access_token }
      }).then(response => response.json())
        .then(data => {
          setRole(data?.data?.role);
          // setCurrentUser(data?.data);
          // console.log(data?.data?.role);
        });
    }
  }, [token]);

  // const [showElement, setShowElement] = React.useState(false)
  // useEffect(() => {
  //   setTimeout(function () {
  //     setShowElement(true)
  //   }, 5000);
  // }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* <Route index element={<Navigate to="home" />} /> */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="intro_web" element={<WebIntro />} />
          <Route path="residential" element={<Residential />} />
          <Route path="commercial" element={<Commercial />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />

          {role === "1" ?
            <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path="db-home" element={<PrivateRoute><DBHome /></PrivateRoute>} />
              <Route path="resident" element={<PrivateRoute><Resident /></PrivateRoute>} />
              <Route path="commerce" element={<PrivateRoute><Commerce /></PrivateRoute>} />
              <Route path="tread-license" element={<PrivateRoute><TreadLicense /></PrivateRoute>} />
              {/* certificate */}
              <Route path='ccharacter' element={<PrivateRoute><CCharacter /></PrivateRoute>} />
              <Route path='cnagorik' element={<PrivateRoute><CNagorik /></PrivateRoute>} />
              <Route path='cowarish' element={<PrivateRoute><COwarish /></PrivateRoute>} />
              {/* website */}
              <Route path='wchairman' element={<PrivateRoute><WChairman /></PrivateRoute>} />
              <Route path='wsacib' element={<PrivateRoute><WSacib /></PrivateRoute>} />
              <Route path='wpanel' element={<PrivateRoute><Wpanel /></PrivateRoute>} />
              <Route path='wmembar' element={<PrivateRoute><WMember /></PrivateRoute>} />
              <Route path='entrepreneur' element={<PrivateRoute><Entrepreneur /></PrivateRoute>} />
              {/* pages */}
              <Route path='pmain' element={<PrivateRoute><PMain /></PrivateRoute>} />
              <Route path='president' element={<PrivateRoute><PResident /></PrivateRoute>} />
              <Route path='pcommerse' element={<PrivateRoute><PCommerse /></PrivateRoute>} />
              <Route path='pcontact' element={<PrivateRoute><PContact /></PrivateRoute>} />
              {/* pages end */}
              <Route path='notice' element={<PrivateRoute><Notice /></PrivateRoute>} />
              <Route path='profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path='settings' element={<PrivateRoute><Setting /></PrivateRoute>} />
              <Route path="change_pass" element={<PrivateRoute><ChangePass /></PrivateRoute>} />
            </Route> : ''}

          {role === "0" ?
            <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route path="db-home" element={<PrivateRoute><DBHome /></PrivateRoute>} />
              <Route path="resident" element={<PrivateRoute><Resident /></PrivateRoute>} />
              <Route path="commerce" element={<PrivateRoute><Commerce /></PrivateRoute>} />
              <Route path="tread-license" element={<PrivateRoute><TreadLicense /></PrivateRoute>} />
              <Route path='ccharacter' element={<PrivateRoute><CCharacter /></PrivateRoute>} />
              <Route path='cnagorik' element={<PrivateRoute><CNagorik /></PrivateRoute>} />
              <Route path='cowarish' element={<PrivateRoute><COwarish /></PrivateRoute>} />
            </Route> : ''}

          <Route path="*" element={<div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

            <div className="delayedHide text-center p-5">
              <Button variant="success" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
              </Button>
            </div>

            <div className="delayedShow d-flex flex-column justify-content-center align-items-center">
              <p className="fs-5 text-danger">Your session has been expired!</p>
              <p className="fs-4 text-danger">Page Not Found!</p>
              <Button variant="danger" as={NavLink} size="sm" to="/login">Go For Login</Button>
              <Button className="mt-4" variant="outline-success" size="sm" as={NavLink} to="/home">Go To Home</Button>
            </div>

          </div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
