import React, { useState, useRef, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "../Store/authSlice";

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userInfo);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const routeTitles = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/sub-admins": "Sub Admins",
    "/test-records": "Test Records",
    "/recorddetails": "Test Record / Record Details",
    "/reports": "Reports",
    "/reports/reportdetails": "Reports / Report Details",
  };

  const title = routeTitles[location.pathname] || "Unknown";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUserInfo());
    window.location.href = "/";
  };

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

      <div className="header-right" ref={dropdownRef}>
        <div
          className="profile"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            style={{ borderRadius: "50%" }}
          />
          <span className="username">{user?.name}</span>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
