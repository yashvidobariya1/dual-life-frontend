import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Userdashboard.css";
import { FaRegFilePdf } from "react-icons/fa6";

const UserDashboard = () => {
  const { id } = useParams(); // Aadhaar ID from route
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await fetch(
          `https://duallife-backend.vercel.app/report/by-aadhaar/${id}`
        );
        const data = await res.json();
        if (data.success && data.reports?.length > 0) {
          // take the first report (or latest)
          setReportData(data.reports[0]);
        }
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!reportData) return <p>No report data found</p>;

  const { patient, healthResults, testImages } = reportData;

  return (
    <div className="adharverfiy-div">
      <div className="portal-container">
        {/* HEADER */}
        <header className="portal-header">
          <div className="icon-circle">
            <i className="fas fa-heartbeat"></i>
          </div>
          <h1>Dual Life Science Healthcare Portal</h1>
          <p>
            View your medical test results securely using Aadhaar authentication
          </p>
        </header>

        <div className="results">
          {/* USER INFO */}
          <div className="card-adhar user-card-adhar">
            <div className="card-detialls">
              <img
                src={
                  patient?.photo
                    ? `data:image/jpeg;base64,${patient.photo}`
                    : "/image/123.jpg"
                }
                alt="User"
                className="user-photo"
              />
              <div className="user-details">
                <h2>{patient?.name}</h2>
                <p>{patient?.address}</p>
                <p>
                  <strong>DOB:</strong>{" "}
                  {new Date(patient?.dateOfBirth).toLocaleDateString()}
                </p>
                <p>
                  <strong>Blood Group:</strong> {healthResults?.bloodGroup}
                </p>
              </div>
            </div>
            <div className="download-button">
              <button className="download-btn">
                <FaRegFilePdf />
                <h6> Download Health Card</h6>
              </button>
            </div>
          </div>
          <div className="card-adhar">
            <h2>
              <i className="fas fa-flask"></i> Latest Test Results
            </h2>
            {healthResults && (
              <div>
                {/* Hemoglobin */}
                {healthResults.hemoglobin && (
                  <div className="test-item">
                    <div>
                      <h3>Hemoglobin</h3>
                      <p>
                        Normal range: {healthResults.hemoglobin.normalRange.min}
                        -{healthResults.hemoglobin.normalRange.max}{" "}
                        {healthResults.hemoglobin.unit}
                      </p>
                    </div>
                    <div>
                      <strong>
                        {healthResults.hemoglobin.value}{" "}
                        {healthResults.hemoglobin.unit}
                      </strong>
                      <p>{healthResults.hemoglobin.status}</p>
                    </div>
                  </div>
                )}

                {/* Glucose */}
                {healthResults.glucose && (
                  <div className="test-item">
                    <div>
                      <h3>Glucose</h3>
                      <p>
                        Normal range: {healthResults.glucose.normalRange.min}-
                        {healthResults.glucose.normalRange.max}{" "}
                        {healthResults.glucose.unit}
                      </p>
                    </div>
                    <div>
                      <strong>
                        {healthResults.glucose.value}{" "}
                        {healthResults.glucose.unit}
                      </strong>
                      <p>{healthResults.glucose.status}</p>
                    </div>
                  </div>
                )}

                {/* Sickle Cell */}
                {healthResults.sickleCell && (
                  <div className="test-item">
                    <div>
                      <h3>Sickle Cell</h3>
                      <p>Result: {healthResults.sickleCell.result}</p>
                    </div>
                    <div>
                      <p>{healthResults.sickleCell.status}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* DEVICE IMAGES */}
          <div className="card-adhar">
            <h2>
              <i className="fas fa-camera"></i> Test Device Images
            </h2>
            <div className="image-grid">
              {testImages?.map((img, i) => (
                <div key={i} className="image-card-adhar">
                  <img src={img.url} alt={img.imageType} />
                  <p>{img.imageType}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="portal-footer">
          <p>
            © 2023 Dual Life Science Healthcare Platform. All rights reserved.
          </p>
          <p>Secured with Aadhaar authentication • Data privacy compliant</p>
        </footer>
      </div>
    </div>
  );
};

export default UserDashboard;
