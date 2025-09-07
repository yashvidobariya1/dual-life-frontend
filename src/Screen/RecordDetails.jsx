import React, { useEffect, useState } from "react";
import "./RecordDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { PostCall } from "./ApiService";

const RecordDetails = () => {
  const { id } = useParams();
  const [recordDetails, setrecordDetials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentRecords = async () => {
      try {
        setLoading(true);
        const response = await PostCall(`admim/getPatientById/${id}`);
        if (response?.success) {
          setrecordDetials(response.data);
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

  const navigate = useNavigate();
  return (
    <div id="test-details-view" className="test-details-container">
      <div className="header">
        <h2 className="title">Test Record Details</h2>
        <button className="btn btn-back" onClick={() => navigate(-1)}>
          Back to List
        </button>
      </div>

      <div className="card-testdetails">
        {/* Aadhaar Info */}
        <div className="card-header">Aadhaar Information</div>
        <div className="card-body">
          <div className="grid two-cols">
            <div>
              <div className="user-info">
                <img
                  className="user-avatar"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                  alt="User"
                />
                <div>
                  <h4 className="user-name">Priya Sharma</h4>
                  <p className="user-aadhaar">
                    Aadhaar:{" "}
                    <span className="aadhaar-mask">XXXX-XXXX-4567</span>
                  </p>
                </div>
              </div>
              <div className="address">
                <p>
                  <span className="label">Address:</span> 123, MG Road,
                  Bangalore, Karnataka - 560001
                </p>
              </div>
            </div>

            <div className="doc-box">
              <h4 className="doc-title">Uploaded Documents</h4>
              <div className="doc-grid">
                <div className="doc-item">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Aadhaar Front"
                  />
                  <p>Aadhaar Front</p>
                </div>
                <div className="doc-item">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Aadhaar Back"
                  />
                  <p>Aadhaar Back</p>
                </div>
                <div className="doc-item">
                  <img src="https://via.placeholder.com/150" alt="Test Image" />
                  <p>Test Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Data */}
        <div className="card-header test-data">Test Data</div>
        <div className="card-body">
          <div className="grid three-cols">
            <div className="field">
              <label>Hemoglobin</label>
              <input type="text" value="12.5 g/dL" disabled />
            </div>
            <div className="field">
              <label>Glucose</label>
              <input type="text" value="98 mg/dL" disabled />
            </div>
            <div className="field">
              <label>Blood Group</label>
              <input type="text" value="B+" disabled />
            </div>
            <div className="field">
              <label>Sickle Cell</label>
              <input type="text" value="Negative" disabled />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <div>
            {/* <p className="status">
              <span>Status:</span>
              <span className="badge pending">Pending</span>
            </p> */}
            <p className="submitted">
              Submitted by: Priya Sharma on Jan 6, 2023
            </p>
          </div>
          {/* <div className="actions">
            <button className="btn btn-approve">Approve</button>
            <button className="btn btn-reject">Reject</button>
            <button className="btn btn-pending">Set Pending</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;
