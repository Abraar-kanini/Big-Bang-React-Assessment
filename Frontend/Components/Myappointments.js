import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Spinner from './Spinner';

export default function MyAppointments() {
  const [patientDetails, setPatientDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem('username');
  const doctorName = localStorage.getItem('doctor_Name');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get('https://localhost:7092/api/Patients', {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        })
        const patients = response.data;

        // Filter the patient records that match the username
        const filteredPatients = patients.filter((patient) => patient.patient_Name === username);

        if (filteredPatients.length > 0) {
          setPatientDetails(filteredPatients);
        } else {
          console.log('No patients found');
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {isLoading ? (
          <Spinner />
        ) : patientDetails.length > 0 ? (
          <div style={{ width: '400px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <h2 style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', fontSize: '20px', textAlign: 'center' }}>
              Your Appointment Details
            </h2>
            <div style={{ padding: '20px' }}>
              {patientDetails.map((patient, index) => (
                <div key={index} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Name: {patient.patient_Name}</p>
                    <p style={{ marginBottom: '5px' }}>Address: {patient.patient_Address}</p>
                    <p style={{ marginBottom: '5px' }}>Disease: {patient.patient_Disease}</p>
                    <p style={{ marginBottom: '5px' }}>Age: {patient.patient_Age}</p>
                    <p style={{ marginBottom: '5px' }}>Phone Number: {patient.patient_PhoneNumber}</p>
                    <p style={{ marginBottom: '5px' }}>Booking Date: {patient.bookingDate}</p>
                    <p style={{ marginBottom: '5px' }}>Booking Time: {patient.bookingTime}</p>
                    <p style={{ marginBottom: '5px' }}>Doctor Name: {doctorName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No appointment details found</p>
        )}
      </div>
    </>
  );
}
