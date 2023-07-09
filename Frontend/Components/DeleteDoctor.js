import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function DeleteDoctor() {
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      axios
        .get('https://localhost:7092/api/Doctor')
        .then((response) => {
          console.log(response);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    const handleDelete = (id) => {
      axios
        .delete(`https://localhost:7092/api/Doctor/${id}`)
        .then((response) => {
          console.log(response);
          // Filter out the deleted record from the user data
          const updatedData = userData.filter((data) => data.docter_Id !== id);
          setUserData(updatedData);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    return (
      <div className="container">
        <h2 className="mt-4">Axioistutorial</h2>
  
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {userData.map((data) => (
            <div key={data.docter_Id} className="col my-3">
              <div className="card h-100 bg-light">
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
                    className="btn btn-danger"
                    onClick={() => handleDelete(data.docter_Id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }