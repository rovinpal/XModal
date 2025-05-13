import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ username: "", email: "", dob: "", phone: "" });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    const { username, email, dob, phone } = formData;

    if (!username.trim()) {
      alert("Please fill out the username field.");
      return;
    }
    if (!email.trim()) {
      alert("Please fill out the email field.");
      return;
    }
    if (!dob.trim()) {
      alert("Please fill out the date of birth field.");
      return;
    }
    if (!phone.trim()) {
      alert("Please fill out the phone number field.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const enteredDate = new Date(dob);
    const today = new Date();
    if (enteredDate > today) {
      alert("Invalid date of birth. Please enter a valid date of birth.");
      return;
    }

    handleCloseModal();
  };

  return (
    <div className="app-container">
      <h1>User Details Modal</h1>
      <button onClick={handleOpenModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>Fill Details</h2>
            <div className="form-field">
              <label>Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Email Address:</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-field">
              <label>Phone Number:</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Date Of Birth:</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );

}

export default App;
