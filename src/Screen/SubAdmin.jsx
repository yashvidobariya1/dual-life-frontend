import React from "react";
import "./SubAdmin.css";
import { IoCallOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const SubAdmin = () => {
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

  return (
    <div id="subadmin-view" className="subadmin-container">
      <div className="header">
        <h2 className="title">Sub-admin Management</h2>
        <button className="add-btn">Add New Sub-admin</button>
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
    </div>
  );
};

export default SubAdmin;
