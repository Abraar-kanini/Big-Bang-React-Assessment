import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import NavBar from './NavBar';

export default function UpdateDoctor() {
  const [userData, setUserData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://localhost:7092/api/Doctor', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = (id) => {
    setIsDeleting(true);
    axios
      .delete(`https://localhost:7092/api/Doctor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
  }},)
      .then((response) => {
        console.log(response);
        const updatedData = userData.filter((data) => data.docter_Id !== id);
        setUserData(updatedData);
        setIsDeleting(false);
        setAlertMessage('Record deleted successfully!');
      })
      .catch((error) => {
        console.error(error);
        setIsDeleting(false);
        setAlertMessage('Error deleting record.');
      });
  };

  const handleUpdate = (id) => {
    const doctor = userData.find((data) => data.docter_Id === id);
    setSelectedDoctor(doctor);
  };

  const handleInputChange = (e) => {
    setSelectedDoctor({ ...selectedDoctor, [e.target.name]: e.target.value });
  };

  const handleSaveUpdate = () => {
    setIsUpdating(true);
    axios
      .put(`https://localhost:7092/api/Doctor/${selectedDoctor.docter_Id}`, selectedDoctor)
      .then((response) => {
        console.log(response);
        const updatedData = userData.map((data) =>
          data.docter_Id === selectedDoctor.docter_Id ? selectedDoctor : data
        );
        setUserData(updatedData);
        setSelectedDoctor(null);
        setIsUpdating(false);
        setAlertMessage('Record updated successfully!');
      })
      .catch((error) => {
        console.error(error);
        setIsUpdating(false);
        setAlertMessage('Error updating record.');
      });
  };

  const renderCard = (data) => {
    const isEditing = selectedDoctor && selectedDoctor.docter_Id === data.docter_Id;

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
            <h5 className="card-title text-primary">
              {isEditing ? (
                <input
                  type="text"
                  name="doctor_Name"
                  value={selectedDoctor.doctor_Name}
                  onChange={handleInputChange}
                />
              ) : (
                data.doctor_Name
              )}
            </h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>ID:</strong> {data.docter_Id}
              </li>
              <li className="list-group-item">
                <strong>Specialist:</strong>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    name="docter_Specialist"
                    value={selectedDoctor.docter_Specialist}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.docter_Specialist
                )}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    name="docter_Email"
                    value={selectedDoctor.docter_Email}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.docter_Email
                )}
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong>{' '}
                {isEditing ? (
                  <input
                    type="text"
                    name="docter_Phone"
                    value={selectedDoctor.docter_Phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.docter_Phone
                )}
              </li>
            </ul>
          </div>
          <div className="card-footer">
            {isEditing ? (
              <button className="btn btn-success" onClick={handleSaveUpdate}>
                Save
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => handleUpdate(data.docter_Id)}>
                Update
              </button>
            )}
            <button className="btn btn-danger" onClick={() => handleDelete(data.docter_Id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <NavBar />
      {/* <h2 className="mt-4">Axioistutorial</h2> */}

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {userData.map(renderCard)}
        </div>
      )}

      {(isDeleting || isUpdating) && (
        <div className="overlay">
          <Spinner />
        </div>
      )}

      {alertMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {alertMessage}
        </div>
      )}
    </div>
  );
}
