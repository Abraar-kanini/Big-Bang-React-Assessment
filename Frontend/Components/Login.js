import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const pass = password + role

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7092/api/Token', {
        username: username,
        password: pass,
      });

      const token = response.data;
      console.log('Login successful. Token:', token);

      
      localStorage.setItem('token', token);

      
      localStorage.setItem('username', username);

        localStorage.setItem("role", role)

      
      navigate('/landing');
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            
                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>

                <button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-linkedin-in"></i>
                </button>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="form-label" htmlFor="username">
                  Username
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>

              {/* <div className="form-outline mb-4">
  <input
    type="text"
    id="username"
    className="form-control form-control-lg"
    placeholder="Enter your username"
    value={role}
    onChange={(e) => setRole(e.target.value)}
  />
  <label className="form-label" htmlFor="username">
    Role
  </label>
</div> */}

<div className="form-check form-check-inline">
  <input
    type="radio"
    id="patient"
    className="form-check-input"
    value="patient"
    checked={role === "patient"}
    onChange={(e) => setRole(e.target.value)}
  />
  <label className="form-check-label" htmlFor="patient">
    Patient
  </label>
</div>

<div className="form-check form-check-inline">
  <input
    type="radio"
    id="doctor"
    className="form-check-input"
    value="doctor"
    checked={role === "doctor"}
    onChange={(e) => setRole(e.target.value)}
  />
  <label className="form-check-label" htmlFor="doctor">
    Doctor
  </label>
</div>

<div className="form-check form-check-inline">
  <input
    type="radio"
    id="admin"
    className="form-check-input"
    value="admin"
    checked={role === "admin"}
    onChange={(e) => setRole(e.target.value)}
  />
  <label className="form-check-label" htmlFor="admin">
    Admin
  </label>
</div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  onClick={handleLogin}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <Link className="link danger" aria-current="page" to="/register">register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">

          &copy; 2023. All rights reserved.
        </div>
        <div>
      
          <a href="#!" className="text-white me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="text-white me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
