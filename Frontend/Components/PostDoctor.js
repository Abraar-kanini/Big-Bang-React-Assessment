import React, { useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import NavBar from './NavBar';

export default function PostDoctor() {
  const [doctorName, setDoctorName] = useState('');
  const [doctorSpecialist, setDoctorSpecialist] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPhone, setDoctorPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const token = localStorage.getItem('token');
  const [docImagePath, setDocImagePath] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'doctor_Name') setDoctorName(value);
    else if (name === 'docter_Specialist') setDoctorSpecialist(value);
    else if (name === 'docter_Email') setDoctorEmail(value);
    else if (name === 'docter_Phone') setDoctorPhone(value);
  };

  const handleImageChange = (e) => {
    setDocImagePath(e.target.files[0]);
  };

  const performAction = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('Doctor_Name', doctorName);
    formData.append('Docter_Specialist', doctorSpecialist);
    formData.append('Docter_Email', doctorEmail);
    formData.append('Docter_Phone', doctorPhone);
    formData.append('imageFile', docImagePath);

    axios
      .post('https://localhost:7092/api/Doctor', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setAlertMessage('Doctor added successfully!');
        navigate('/doctors'); 

      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setAlertMessage('An error occurred while adding the doctor.');
      });
  };

  return (
    <div className="container-fluid">
      <NavBar />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form>
            <div className="mb-3">
              <label htmlFor="doctor_Name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="doctor_Name"
                name="doctor_Name"
                value={doctorName}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="docter_Specialist" className="form-label">
                Specialist:
              </label>
              <input
                type="text"
                className="form-control"
                id="docter_Specialist"
                name="docter_Specialist"
                value={doctorSpecialist}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="docter_Email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                className="form-control"
                id="docter_Email"
                name="docter_Email"
                value={doctorEmail}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="docter_Phone" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                className="form-control"
                id="docter_Phone"
                name="docter_Phone"
                value={doctorPhone}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="doctor_image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                name="imageFile"
                className="form-control-file"
                onChange={handleImageChange}
                required
              />
            </div>

            <button className="btn btn-primary" onClick={performAction}>
              Insert Me
            </button>
          </form>
          {isLoading && <Spinner />}
          {alertMessage && (
            <div className="alert alert-info mt-3" role="alert">
              {alertMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
