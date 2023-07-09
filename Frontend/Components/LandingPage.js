import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

export default function LandingPage() {
  const [doctorImages, setDoctorImages] = useState([]);

  useEffect(() => {
    fetchDoctorImages();
  }, []);

  const fetchDoctorImages = async () => {
    try {
      const response = await Promise.all([
        fetch('https://source.unsplash.com/featured/?doctor'),
        fetch('https://source.unsplash.com/featured/?doctor'),
        fetch('https://source.unsplash.com/featured/?doctor'),
        fetch('https://source.unsplash.com/featured/?doctor')
      ]);

      const imageUrls = await Promise.all(response.map(res => res.url));
      setDoctorImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <NavBar/>
    <div className="landing-page">
      <section id="hero" className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>Welcome to XYZ Hospital</h1>
              <p>A leading healthcare provider dedicated to delivering exceptional medical services.</p>
              <a className="btn btn-primary" href="#appointment">Book an Appointment</a>
            </div>
            <div className="col-md-6">
              <img src={doctorImages[0]} alt="Hospital" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>About the Hospital</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur eros vitae velit tincidunt, vel tincidunt enim feugiat.</p>
            </div>
            <div className="col-md-6">
              <h2>Our Services</h2>
              <ul>
                <li>Cardiology</li>
                <li>Pediatrics</li>
                <li>Orthopedics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="doctors" className="doctors">
        <div className="container">
          <h2>Our Doctors</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="doctor-card">
                <img src={doctorImages[1]} alt="Doctor" className="img-fluid" />
                <h4>Dr. John Paul</h4>
                <p>Specialist in Cardiology</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="doctor-card">
                <img src={doctorImages[2]} alt="Doctor" className="img-fluid" />
                <h4>Dr. charles</h4>
                <p>Specialist in Pediatrics</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="doctor-card">
                <img src={doctorImages[3]} alt="Doctor" className="img-fluid" />
                <h4>Dr. micheal</h4>
                <p>Specialist in Orthopedics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="appointment" className="appointment">
        <div className="container">
          <h2>Book an Appointment</h2>
          <p>To book an appointment, please call: <strong>123-456-7890</strong></p>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="row">
            <div className="col-md-6">
              <p>Address: 123 Main Street, City, State, Country</p>
              <p>Email: info@example.com</p>
            </div>
            <div className="col-md-6">
              <p>Phone: 123-456-7890</p>
              <p>Working Hours: Monday - Friday, 9AM - 5PM</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 XYZ Hospital. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
}
