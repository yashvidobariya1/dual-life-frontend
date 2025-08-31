import React from "react";
import { FaBell } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ toggleSidebar }) => {
  const location = useLocation();

  const routeTitles = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/sub-admins": "Sub Admins",
    "/test-records": "Test Records",
    "/recorddetails": "Test Record / Record Details",
    "/reports": "Reports",
    "/reports/reportdetails": "Reports / Report Details",
  };

  const title = routeTitles[location.pathname] || "My App";

  return (
    <header className="header">
      <div className="header-toggle-menu">
        <IoMdMenu
          onClick={toggleSidebar}
          style={{ cursor: "pointer", fontSize: "24px" }}
        />
        <div className="header-left">
          <h2 className="logo">{title}</h2>
        </div>
      </div>

      <div className="header-right">
        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>
        <div className="profile">
          <img src="https://via.placeholder.com/40" alt="User" />
          <span className="username">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
