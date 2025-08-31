import React from "react";
import "./Report.css";
import { HiCalendarDateRange } from "react-icons/hi2";
import { RiAdminFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();
  const records = [
    {
      aadhaar: "XXXX-XXXX-7890",
      status: "Approved",
      statusClass: "approved",
      subAdmin: "Rajesh Kumar",
      date: "Jan 7, 2023",
    },
    {
      aadhaar: "XXXX-XXXX-4567",
      status: "Pending",
      statusClass: "pending",
      subAdmin: "Priya Sharma",
      date: "Jan 6, 2023",
    },
    {
      aadhaar: "XXXX-XXXX-1234",
      status: "Rejected",
      statusClass: "rejected",
      subAdmin: "Amit Patel",
      date: "Jan 5, 2023",
    },
  ];

  const handleDetails = () => {
    navigate("/reports/reportdetails");
  };

  return (
    <div id="test-records-view" className="test-records">
      <div className="reacord-header">
        <h2>Test Record Management</h2>
        <div className="actions">
          <div className="search-box">
            <input type="text" placeholder="Search Aadhaar" />
            <span className="search-icon">
              <FaSearch />
            </span>
          </div>
          <button className="filter-btn">Filter</button>
        </div>
      </div>

      <div className="records-container">
        <ul>
          {records.map((record, index) => (
            <li key={index} className="record-item">
              <div className="record-header">
                <p className="aadhaar">Aadhaar: {record.aadhaar}</p>
                {/* <span className={`status ${record.statusClass}`}>
                  {record.status}
                </span> */}
              </div>
              <div className="record-info">
                <p className="sub-admin">
                  <RiAdminFill /> Sub-admin: {record.subAdmin}
                </p>
                <p className="date">
                  <HiCalendarDateRange /> {record.date}
                </p>
              </div>
              <div className="record-footer">
                <button className="view-btn" onClick={handleDetails}>
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
