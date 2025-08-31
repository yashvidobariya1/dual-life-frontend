import React from "react";
import "./Sidebar.css";
import img1 from "../Images/user.jpeg";
import {
  FaHome,
  FaUserShield,
  FaFileAlt,
  FaChartBar,
  FaCog,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed, mobileOpen, closeSidebar }) => {
  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : ""} ${
        mobileOpen ? "mobile-show" : ""
      }`}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-logo">
          <div className="img-sidebar">
            <img
              src={img1}
              alt="Logo"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
            <span>Dual Life</span>
          </div>

          {/* Mobile Close Button */}
          {mobileOpen && (
            <button className="close-btn" onClick={closeSidebar}>
              <FaTimes />
            </button>
          )}
        </h2>
      </div>

      {/* Menu Items */}
      <ul className="menu">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeSidebar}
            end={false}
          >
            <div className="flex-sidebar">
              <FaHome />
              <p>Dashboard</p>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/sub-admins"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeSidebar}
            end={false}
          >
            <div className="flex-sidebar">
              <FaUserShield />
              <p>Sub-admins</p>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/test-records"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeSidebar}
            end={false} // ✅ Keeps active on child routes like /test-records/recorddetails
          >
            <div className="flex-sidebar">
              <FaFileAlt />
              <p>Test Records</p>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeSidebar}
            end={false} // ✅ Works for /reports/details etc.
          >
            <div className="flex-sidebar">
              <FaChartBar />
              <p>Reports</p>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/account"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeSidebar}
            end={false}
          >
            <div className="flex-sidebar">
              <FaCog />
              <p>Account</p>
            </div>
          </NavLink>
        </li>
      </ul>

      {/* Admin Profile */}
      <div className="admin-profile">
        <img src={img1} alt="Admin" />
        <div>
          <p className="name">Admin User</p>
          <p className="email">admin@duallife.org</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
