import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const pass = password + role;

    // Store the username in local storage
    localStorage.setItem('username', username);

    try {
      // Check if the username already exists
      const response = await axios.get(`https://localhost:7092/api/User`);

      const usernames = response.data.map(user => user.username);

      if (usernames.includes(username)) {
        setRegistrationStatus('Username already exists');
      } else {
        // Proceed with the registration if the username doesn't exist
        const registerResponse = await axios.post(
          'https://localhost:7092/api/User/register',
          {
            username,
            password: pass,
          }
        );

        if (registerResponse && registerResponse.data) {
          setRegistrationStatus('Registration successful');
          navigate('/');
        } else {
          setRegistrationStatus('Registration failed: Invalid response');
        }
      }
    } catch (error) {
      setRegistrationStatus(
        'Registration failed: ' + (error.response?.data || error.message)
      );
    }
  };

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="name"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label" htmlFor="name">
                        Your Name
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="form-label" htmlFor="email">
                        Your username
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="confirmPassword">
                        Repeat your password
                      </label>
                    </div>

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

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="terms"
                      />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        onClick={handleRegister}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">{registrationStatus}</p>

                    <p className="text-center text-muted mt-5 mb-0">
                      Already have an account? <a href="#!" className="fw-bold text-body"><u>Login here</u></a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
