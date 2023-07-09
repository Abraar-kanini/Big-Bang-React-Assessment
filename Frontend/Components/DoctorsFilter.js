import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import NavBar from './NavBar';

import doctor1 from '../Doctor1.jpeg';
import doctor2 from '../Doctor2.jpg';
import doctor3 from '../Doctor3.jpg';

export default function DoctorsFilter() {
  const [userData, setUserData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
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
              Authorization: `Bearer ${token}`,
            },
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

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleBookAppointment = (doctorId) => {
    navigate(`/appointment/${doctorId}`);
  };

  const renderCard = (data, index) => {
    if (filterValue && data.docter_Specialist.toLowerCase() !== filterValue.toLowerCase()) {
      return null;
    }

    return (
      <div key={data.docter_Id} className="col my-3">
        <div className="card h-100 bg-light">
          <img
            src={`https://localhost:7092/uploads/doctor/${data.docImagePath}`}
            alt="Doctor"
            className="card-img-top"
            style={{ maxHeight: '200px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title text-primary">{data.doctor_Name}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>ID:</strong> {data.docter_Id}
              </li>
              <li className="list-group-item">
                <strong>Specialist:</strong> {data.docter_Specialist}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {data.docter_Email}
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong> {data.docter_Phone}
              </li>
            </ul>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary"
              onClick={() => handleBookAppointment(data.docter_Id)}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fuild">
      <NavBar />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="mt-4">Axioistutorial</h2>

          <div className="mb-3">
            <label htmlFor="filterInput" className="form-label">
              Filter by Specialist:
            </label>
            <input
              type="text"
              id="filterInput"
              className="form-control"
              value={filterValue}
              onChange={handleFilterChange}
            />
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {userData.map(renderCard)}
          </div>
        </>
      )}
    </div>
  );
}
