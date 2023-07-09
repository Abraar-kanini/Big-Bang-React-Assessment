import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Doctor from './Components/Doctor';
import DeleteDoctor from './Components/DeleteDoctor';
import DashBoard from './Components/DashBoard';
import BookAppointment from './Components/BookAppointment';
import UpdateDoctor from './Components/UpdateDoctor';
import NavBar from './Components/NavBar';
import DoctorsFilter from './Components/DoctorsFilter';
import PostDoctor from './Components/PostDoctor';
import Register from './Components/Register';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
// import Appointments from './Components/Appointments';
import Myappointments from './Components/Myappointments';
import Patients from './Components/Patients';
import Doctorvisit from './Components/Doctorvisit';

function App() {
  return (
    <>
      <Router>

        {/* <NavBar /> */}
        {/* <Register/> */}
        {/* <Login/> */}
        <Routes>
        <Route path="/doctorvisit" element={<Doctorvisit/>} />
        <Route path="/landing" element={ <LandingPage/>} />
  

        <Route path="/" element={ <Login/>} />
        <Route path="/patients" element={<Patients/>} />
        <Route path="/myappointments" element={<Myappointments/>} />
        <Route path="/register" element={ <Register/>} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/navbar" element={<NavBar/>} />
          <Route path="/update" element={<UpdateDoctor />} />
          <Route path="/filter" element={<DoctorsFilter />} />
          <Route path="/appointment/:doctorId" element={<BookAppointment />} /> {/* Add this line */}
          <Route path="/post" element={<PostDoctor/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
