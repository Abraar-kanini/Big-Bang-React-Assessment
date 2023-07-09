import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import NavBar from './NavBar';

export default function Doctor() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          setIsLoading(false);
          const response = await axios.get('https://localhost:7092/api/Doctor', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response);
          setUserData(response.data);
        }, 3000);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardMouseEnter = (e) => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  };

  const handleCardMouseLeave = (e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = 'none';
  };

  const handleBookAppointment = (doctorId, doctorName) => {
    localStorage.setItem('doctor_Name', doctorName);
    navigate(`/appointment/${doctorId}`);
  };

  const renderCard = (data, index) => {
    return (
      <div
        key={data.docter_Id}
        className="col my-3 d-flex justify-content-center"
        onMouseEnter={handleCardMouseEnter}
        onMouseLeave={handleCardMouseLeave}
        style={{
          transform: 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="card h-100 bg-light">
          <img
            src={`https://localhost:7092/uploads/doctor/${data.docImagePath}`}
            alt="Doctor"
            className="card-img-top"
            style={{ maxHeight: '200px', objectFit: 'cover' }}
          />
          <div className="card-body text-center">
            <h5 className="card-title text-primary">{data.doctor_Name}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Specialist:</strong> {data.docter_Specialist}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {data.docter_Email}
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong> {data.docter_Phone}
              </li>
              {/* <li className="list-group-item">
                <strong>Phone:</strong> {data.docImagePath}
              </li> */}
            </ul>
          </div>
          <div className="card-footer d-flex justify-content-center">
            <Link
              to={`/appointment/${data.docter_Id}`}
              className="btn btn-primary"
              onClick={() => handleBookAppointment(data.docter_Id, data.doctor_Name)}
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid mt-5">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">{userData.map(renderCard)}</div>
        )}
      </div>
    </>
  );
}
