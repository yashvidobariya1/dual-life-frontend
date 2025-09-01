import React, { useState } from "react";
import "./SubAdmin.css";
import { IoCallOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const SubAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    password: "",
    confirmPassword: "",
  });

  const subAdmins = [
    {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      tests: 245,
      success: "94.3%",
    },
    {
      name: "Priya Sharma",
      phone: "+91 87654 32109",
      tests: 198,
      success: "91.2%",
    },
    {
      name: "Amit Patel",
      phone: "+91 76543 21098",
      tests: 312,
      success: "93.6%",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("New SubAdmin Data:", formData);
    // Here you can call your API to save sub-admin
    setShowModal(false);
    setFormData({ name: "", aadhaar: "", password: "", confirmPassword: "" });
  };

  return (
    <div id="subadmin-view" className="subadmin-container">
      <div className="header">
        <h2 className="title">Sub-admin Management</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          Add New Sub-admin
        </button>
      </div>

      <div className="list-container">
        {subAdmins.map((admin, index) => (
          <div key={index} className="list-item">
            <div className="list-header">
              <p className="admin-name">{admin.name}</p>
              <div className="actions">
                <button className="btn edit-btn">Edit</button>
                <button className="btn deactivate-btn">Deactivate</button>
              </div>
            </div>

            <div className="list-body">
              <p className="phone">
                <IoCallOutline /> {admin.phone}
              </p>
              <p className="stats">
                <FaCheck /> Total Tests: {admin.tests} | Success Rate:{" "}
                {admin.success}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Sub-admin</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="aadhaar"
                placeholder="Enter Aadhaar Number"
                value={formData.aadhaar}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <div className="modal-actions">
                <button type="submit" className="btn save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="btn cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAdmin;
