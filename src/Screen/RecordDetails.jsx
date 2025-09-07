import React, { useEffect, useState } from "react";
import "./RecordDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { PostCall } from "./ApiService";
import Loader from "../Main/Loader";

const RecordDetails = () => {
  const { id } = useParams();
  const [recordDetails, setRecordDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await PostCall(`admin/getPatientById/${id}`);
        if (response?.success) {
          setRecordDetails(response.patient); // ✅ use patient object
        } else {
          console.error("Failed to fetch patient:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

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
                  src={
                    recordDetails.photo
                      ? `data:image/jpeg;base64,${recordDetails.photo}`
                      : "https://via.placeholder.com/150"
                  }
                  alt="User"
                />
                <div>
                  <h4 className="user-name">{recordDetails.name}</h4>
                  <p className="user-aadhaar">
                    Aadhaar:{" "}
                    <span className="aadhaar-mask">
                      XXXX-XXXX-{recordDetails.aadhaarNumber?.slice(-4)}
                    </span>
                  </p>
                  <p className="user-phone">Phone: {recordDetails.phone}</p>
                </div>
              </div>
              <div className="address">
                <p>
                  <span className="label">Address:</span>{" "}
                  {recordDetails.address}
                </p>
              </div>
            </div>

            <div className="doc-box">
              <h4 className="doc-title">Uploaded Documents</h4>
              <div className="doc-grid">
                {/* Replace with dynamic URLs if API provides */}
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
              </div>
            </div>
          </div>
        </div>

        {/* Test Data (static for now) */}
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
          <p className="submitted">Submitted by: {recordDetails.name}</p>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;
