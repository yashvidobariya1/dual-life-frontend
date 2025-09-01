import React, { useEffect, useState } from "react";
import "./TestRecord.css";
import { useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { HiCalendarDateRange } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import moment from "moment";
import { PostCall } from "./ApiService";

const TestRecord = () => {
  const navigate = useNavigate();
  const [record, setrecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentRecords = async () => {
      try {
        const response = await PostCall(
          "admin/getAllPatients?recentPatients=true"
        );
        if (response?.success) {
          setrecord(response.patients);
        } else {
          console.error("Failed to fetch records:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching recent patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentRecords();
  }, []);

  const handleDetails = () => {
    navigate("/test-records/recorddetails");
  };

  return (
    <div id="test-records-view" className="test-records">
      <div className="header">
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
          {record.map((record, index) => (
            <li key={index} className="record-item">
              <div className="record-header">
                <p className="aadhaar">Aadhaar: {record.aadhaarNumber}</p>
              </div>
              <div className="record-info">
                <p className="sub-admin">
                  <RiAdminFill /> {record.name}
                </p>
                <p className="date">
                  {" "}
                  <HiCalendarDateRange />{" "}
                  {record.registeredAt
                    ? moment(record.registeredAt).format("DD/MM/YYYY")
                    : "N/A"}
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

export default TestRecord;
