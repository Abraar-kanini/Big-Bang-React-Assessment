import React, { useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate  } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [patientData, setPatientData] = useState({
    patient_Name: '',
    patient_Address: '',
    patient_Disease: '',
    patient_Age: '',
    patient_PhoneNumber: '',
    bookingDate: null,
    bookingTime: '',
    docter_Id: doctorId
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setPatientData((prevData) => ({
      ...prevData,
      bookingDate: date
    }));
  };

  const handleTimeChange = (e) => {
    const { value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      bookingTime: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post('https://localhost:7092/api/Patients', patientData, {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        })
        .then((response) => {
          console.log(response);
          setAlertMessage('Appointment booked successfully!');
          navigate('/myappointments'); 
        })
        .catch((error) => {
          console.error(error);
          setAlertMessage('Error occurred while booking the appointment.');
        });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (patientData.patient_Name.trim() === '') {
      errors.patient_Name = 'Name is required';
      isValid = false;
    }

    if (patientData.patient_Address.trim() === '') {
      errors.patient_Address = 'Address is required';
      isValid = false;
    }

    if (patientData.patient_Disease.trim() === '') {
      errors.patient_Disease = 'Disease is required';
      isValid = false;
    }

    if (patientData.patient_Age.trim() === '') {
      errors.patient_Age = 'Age is required';
      isValid = false;
    }

    if (patientData.patient_PhoneNumber.trim() === '') {
      errors.patient_PhoneNumber = 'Phone Number is required';
      isValid = false;
    }

    if (!patientData.bookingDate) {
      errors.bookingDate = 'Booking Date is required';
      isValid = false;
    }

    if (patientData.bookingTime === '') {
      errors.bookingTime = 'Booking Time is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="container">
      <h2 className="mt-4">Book Appointment</h2>

      {alertMessage && (
        <div className="alert alert-success" role="alert">
          {alertMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patientNameInput" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="patientNameInput"
            className={`form-control ${errors.patient_Name ? 'is-invalid' : ''}`}
            name="patient_Name"
            value={patientData.patient_Name}
            onChange={handleChange}
            required
          />
          {errors.patient_Name && <div className="invalid-feedback">{errors.patient_Name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="patientAddressInput" className="form-label">
            Address:
          </label>
          <input
            type="text"
            id="patientAddressInput"
            className={`form-control ${errors.patient_Address ? 'is-invalid' : ''}`}
            name="patient_Address"
            value={patientData.patient_Address}
            onChange={handleChange}
            required
          />
          {errors.patient_Address && <div className="invalid-feedback">{errors.patient_Address}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="patientDiseaseInput" className="form-label">
            Disease:
          </label>
          <input
            type="text"
            id="patientDiseaseInput"
            className={`form-control ${errors.patient_Disease ? 'is-invalid' : ''}`}
            name="patient_Disease"
            value={patientData.patient_Disease}
            onChange={handleChange}
            required
          />
          {errors.patient_Disease && <div className="invalid-feedback">{errors.patient_Disease}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="patientAgeInput" className="form-label">
            Age:
          </label>
          <input
            type="text"
            id="patientAgeInput"
            className={`form-control ${errors.patient_Age ? 'is-invalid' : ''}`}
            name="patient_Age"
            value={patientData.patient_Age}
            onChange={handleChange}
            required
          />
          {errors.patient_Age && <div className="invalid-feedback">{errors.patient_Age}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="patientPhoneInput" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            id="patientPhoneInput"
            className={`form-control ${errors.patient_PhoneNumber ? 'is-invalid' : ''}`}
            name="patient_PhoneNumber"
            value={patientData.patient_PhoneNumber}
            onChange={handleChange}
            required
          />
          {errors.patient_PhoneNumber && <div className="invalid-feedback">{errors.patient_PhoneNumber}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="bookingDateInput" className="form-label">
            Booking Date:
          </label>
          <DatePicker
            id="bookingDateInput"
            className={`form-control ${errors.bookingDate ? 'is-invalid' : ''}`}
            selected={patientData.bookingDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            required
          />
          {errors.bookingDate && <div className="invalid-feedback">{errors.bookingDate}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="bookingTimeInput" className="form-label">
            Booking Time:
          </label>
          <select
            id="bookingTimeInput"
            className={`form-control ${errors.bookingTime ? 'is-invalid' : ''}`}
            name="bookingTime"
            value={patientData.bookingTime}
            onChange={handleTimeChange}
            required
          >
            <option value="">Select Time</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
          
          </select>
          {errors.bookingTime && <div className="invalid-feedback">{errors.bookingTime}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
