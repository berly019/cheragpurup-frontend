// import logo from './logo.svg';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import AuthProvider from './contexts/AuthProvider';
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
import ProtectedRoute from './Pages/Authenticate/ProtectedRoute/ProtectedRoute';
// import ModeratorRoute from './Pages/Authenticate/ModeratorRoute/ModeratorRoute';
import React from 'react';
// import axios from 'axios';
import WebIntro from './Pages/WebIntro/WebIntro';
import useUser from "./hooks/useUser";
import DataProvider from "./contexts/DataContext";
import AddUser from './Pages/Dashboard/Setting/ChagePassModal/AddUser';

function App() {

  const { role } = useUser();

  return (
    <>
      <AuthProvider>
        <DataProvider>
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
                  <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                    <Route path="db-home" element={<ProtectedRoute><DBHome /></ProtectedRoute>} />
                    <Route path="resident" element={<ProtectedRoute><Resident /></ProtectedRoute>} />
                    <Route path="commerce" element={<ProtectedRoute><Commerce /></ProtectedRoute>} />
                    <Route path="tread-license" element={<ProtectedRoute><TreadLicense /></ProtectedRoute>} />
                    {/* certificate */}
                    <Route path='ccharacter' element={<ProtectedRoute><CCharacter /></ProtectedRoute>} />
                    <Route path='cnagorik' element={<ProtectedRoute><CNagorik /></ProtectedRoute>} />
                    <Route path='cowarish' element={<ProtectedRoute><COwarish /></ProtectedRoute>} />
                    {/* website */}
                    <Route path='wchairman' element={<ProtectedRoute><WChairman /></ProtectedRoute>} />
                    <Route path='wsacib' element={<ProtectedRoute><WSacib /></ProtectedRoute>} />
                    <Route path='wpanel' element={<ProtectedRoute><Wpanel /></ProtectedRoute>} />
                    <Route path='wmembar' element={<ProtectedRoute><WMember /></ProtectedRoute>} />
                    <Route path='entrepreneur' element={<ProtectedRoute><Entrepreneur /></ProtectedRoute>} />
                    {/* pages */}
                    <Route path='pmain' element={<ProtectedRoute><PMain /></ProtectedRoute>} />
                    <Route path='president' element={<ProtectedRoute><PResident /></ProtectedRoute>} />
                    <Route path='pcommerse' element={<ProtectedRoute><PCommerse /></ProtectedRoute>} />
                    <Route path='pcontact' element={<ProtectedRoute><PContact /></ProtectedRoute>} />
                    {/* pages end */}
                    <Route path='notice' element={<ProtectedRoute><Notice /></ProtectedRoute>} />
                    <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path='settings' element={<ProtectedRoute><Setting /></ProtectedRoute>} />
                    <Route path="change_pass" element={<ProtectedRoute><ChangePass /></ProtectedRoute>} />
                    <Route path="add_user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
                  </Route>
                : ''}

              {role === "0" ?
                <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                  <Route path="db-home" element={<ProtectedRoute><DBHome /></ProtectedRoute>} />
                  <Route path="resident" element={<ProtectedRoute><Resident /></ProtectedRoute>} />
                  <Route path="commerce" element={<ProtectedRoute><Commerce /></ProtectedRoute>} />
                  <Route path="tread-license" element={<ProtectedRoute><TreadLicense /></ProtectedRoute>} />
                  <Route path='ccharacter' element={<ProtectedRoute><CCharacter /></ProtectedRoute>} />
                  <Route path='cnagorik' element={<ProtectedRoute><CNagorik /></ProtectedRoute>} />
                  <Route path='cowarish' element={<ProtectedRoute><COwarish /></ProtectedRoute>} />
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
              {/* <Route path="*" element={<div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <p className="fs-4 text-danger">Page Not Found!</p>
            </div>} /> */}
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
