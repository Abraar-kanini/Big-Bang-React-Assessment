import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Doctorvisit() {
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const username = localStorage.getItem('username');

    axios.get('https://localhost:7092/api/Doctor', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const doctorId = response.data.find(doctor => doctor.doctor_Name === username)?.docter_Id;
        if (doctorId) {
          localStorage.setItem('doctorId', doctorId);

          axios.get('https://localhost:7092/api/Patients', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
              const filteredPatients = response.data.filter(patient => patient.docter_Id === doctorId);
              setPatients(filteredPatients);

              // Extracting the patient IDs from the response and storing in local storage
              const patientIds = filteredPatients.map(patient => patient.patient_Id);
              localStorage.setItem('patientIds', JSON.stringify(patientIds));
            })
            .catch(error => {
              console.error('Failed to fetch patients:', error);
            });
        }
      })
      .catch(error => {
        console.error('Failed to fetch doctor:', error);
      });
  }, []);

  const handleDelete = (patientId) => {
    axios.delete(`https://localhost:7092/api/Patients/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // Remove the deleted patient from the state
        setPatients(prevPatients => prevPatients.filter(patient => patient.patient_Id !== patientId));
      })
      .catch(error => {
        console.error('Failed to delete patient:', error);
      });
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const evenCardStyle = {
    backgroundColor: '#f9f9f9',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const detailStyle = {
    marginBottom: '3px',
  };

  const buttonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  if (patients.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>No appointments</p>
      </div>
    );
  }

  return (
    <div>
      {patients.map((patient, index) => (
        <div style={index % 2 === 0 ? { ...cardStyle, ...evenCardStyle } : cardStyle} key={patient.patient_Id}>
          <p style={titleStyle}>Patient Details</p>
          <p style={detailStyle}><strong>Name:</strong> {patient.patient_Name}</p>
          <p style={detailStyle}><strong>Address:</strong> {patient.patient_Address}</p>
          <p style={detailStyle}><strong>Disease:</strong> {patient.patient_Disease}</p>
          <p style={detailStyle}><strong>Age:</strong> {patient.patient_Age}</p>
          <p style={detailStyle}><strong>Phone Number:</strong> {patient.patient_PhoneNumber}</p>
          <p style={index % 2 === 0 ? { ...detailStyle, ...evenCardStyle } : detailStyle}><strong>Booking Date:</strong> {patient.bookingDate}</p>
          <p style={detailStyle}><strong>Booking Time:</strong> {patient.bookingTime}</p>
          <button style={buttonStyle} onClick={() => handleDelete(patient.patient_Id)}>Patient Visited</button>
        </div>
      ))}
    </div>
  );
}
