import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');

    if (storedRole) {
      setRole(storedRole);
    }

    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  const isAdmin = role === 'admin';
  const isDoctor = role === 'doctor';
  const isPatient = role === 'patient';

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          {location.pathname !== '/landing' && (
            <Link className="nav-link active" aria-current="page" to="/landing" exact>
              Karthi Hospital
            </Link>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isDoctor && (
                <li className="nav-item">
                  <Link className="nav-link" to="/doctorvisit">
                    My Patients Details
                  </Link>
                </li>
              )}
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/post">
                      Admin/Post
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/update">
                      Admin Update/Delete
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/patients">
                      Patients Details
                    </Link>
                  </li>
                </>
              )}
              {isPatient && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/doctors">
                      Doctors
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/myappointments">
                      Book Appointment
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="navbar-text">
            Logged in as: {username}
            <button className="btn btn-link-dark" onClick={handleLogout}>
              Logout <i className="bi bi-box-arrow-right logout-icon"></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
