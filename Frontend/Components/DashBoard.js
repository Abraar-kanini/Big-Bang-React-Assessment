import React from 'react';

export default function DashBoard() {
  return (
    <div className="dashboard container">
      <div className="dashboard-item">
        <h4>About the Hospital</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur eros vitae velit tincidunt, vel tincidunt enim feugiat.</p>
      </div>
      <div className="dashboard-item">
        <h4>Doctors</h4>
        <ul className="list-group">
          <li className="list-group-item">Dr. John Doe - Specialist in Cardiology</li>
          <li className="list-group-item">Dr. Jane Smith - Specialist in Pediatrics</li>
          <li className="list-group-item">Dr. Mark Johnson - Specialist in Orthopedics</li>
        </ul>
      </div>
      <div className="dashboard-item">
        <h4>Book Appointment</h4>
        <p>To book an appointment, please call: <strong>123-456-7890</strong></p>
      </div>
      <div className="dashboard-item">
        <h4>Contact Us</h4>
        <p>Address: 123 Main Street, City, State, Country</p>
        <p>Email: info@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
    </div>
  );
}
