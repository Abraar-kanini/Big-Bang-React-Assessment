import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import NavBar from './NavBar';

export default function Patients() {
  const [patientData, setPatientData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get('https://localhost:7092/api/Patients', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          console.log(response);
          setPatientData(response.data);
          setIsLoading(false);
        }, 3000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerStyle = {
    margin: '20px',
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '10px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  };

  const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    padding: '8px',
    border: '1px solid #ccc',
  };

  const tableRowStyle = {
    backgroundColor: '#f9f9f9',
  };

  const tableCellStyle = {
    padding: '8px',
    border: '1px solid #ccc',
  };

  const tableHoverStyle = {
    backgroundColor: '#ebebeb',
  };

  return (
    <>
    <NavBar/>
    <div style={containerStyle}>
      <h2 style={titleStyle}>Patients</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Address</th>
              <th style={tableHeaderStyle}>Disease</th>
              <th style={tableHeaderStyle}>Age</th>
              <th style={tableHeaderStyle}>Phone Number</th>
              <th style={tableHeaderStyle}>Booking Date</th>
              <th style={tableHeaderStyle}>Booking Time</th>
              <th style={tableHeaderStyle}>Doctor ID</th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient) => (
              <tr key={patient.patient_Id} style={tableRowStyle}>
                <td style={tableCellStyle}>{patient.patient_Id}</td>
                <td style={tableCellStyle}>{patient.patient_Name}</td>
                <td style={tableCellStyle}>{patient.patient_Address}</td>
                <td style={tableCellStyle}>{patient.patient_Disease}</td>
                <td style={tableCellStyle}>{patient.patient_Age}</td>
                <td style={tableCellStyle}>{patient.patient_PhoneNumber}</td>
                <td style={tableCellStyle}>{patient.bookingDate}</td>
                <td style={tableCellStyle}>{patient.bookingTime}</td>
                <td style={tableCellStyle}>{patient.docter_Id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
}
