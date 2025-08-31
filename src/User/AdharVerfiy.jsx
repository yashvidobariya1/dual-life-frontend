import React, { useState } from "react";
import "./AdharVerfiy.css";

const AdharVerfiy = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [refId, setrefId] = useState("");
  const [userData, setUserData] = useState(null);

  const handleAadhaarChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 12) value = value.substring(0, 12);
    setAadhaar(value);
  };

  // Step 1: Click Fetch -> Show OTP Popup
  const handleFetchClick = async () => {
    if (aadhaar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(
        "https://duallife-backend.vercel.app/verification/generate-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ aadhaarNumber: aadhaar }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setrefId(data.refId); // assuming API returns refId
        setShowOtpPopup(true);
      } else {
        alert(data.message || "Failed to generate OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while generating OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setShowOtpPopup(false);

    try {
      const res = await fetch(
        "https://duallife-backend.vercel.app/verification/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refId, otp, aadhaarNumber: aadhaar }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUserData(res.kycData);
        console.log("kyc data", userData);
        setShowResults(true);
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adharverfiy-div">
      <div className="portal-container">
        <header className="portal-header">
          <div className="icon-circle">
            <i className="fas fa-heartbeat"></i>
          </div>
          <h1>Dual Life Science Healthcare Portal </h1>
          <p>
            View your medical test results securely using Aadhaar authentication
          </p>
        </header>

        {/* Aadhaar Section */}
        {!showResults && (
          <div className="card-adhar">
            <h2>Enter Aadhaar Details</h2>
            <p>Aadhaar Number</p>
            <div className="input-wrapper">
              <input
                type="text"
                value={aadhaar}
                onChange={handleAadhaarChange}
                placeholder="Enter 12-digit Aadhaar number"
              />
              <i className="fas fa-id-card-adhar input-icon"></i>
            </div>
            <button
              onClick={handleFetchClick}
              disabled={loading}
              className="fetching-button"
            >
              <i className="fas fa-search"></i> Fetch Results
            </button>
            <p className="secure-text">
              <i className="fas fa-lock"></i> Your data is securely processed
              and never stored
            </p>
          </div>
        )}

        {showOtpPopup && (
          <div className="otp-popup">
            <div className="otp-popup-content">
              <h2>Enter OTP</h2>
              <p>We’ve sent a 6-digit OTP to your registered mobile.</p>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter OTP"
              />
              <div className="otp-buttons">
                <button onClick={() => setShowOtpPopup(false)}>Cancel</button>
                <button onClick={handleOtpSubmit}>Verify</button>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && userData && (
          <div className="results">
            {/* User Info */}
            <div className="card-adhar user-card-adhar">
              <img src={userData.photo} alt="User" className="user-photo" />
              <div>
                <h2>{userData.name}</h2>
                <p>{userData.address}</p>
                <span className={`status-badge ${userData.statusClass}`}>
                  {userData.status}
                </span>
              </div>
              <button className="download-btn">
                <i className="fas fa-file-pdf"></i> Download Health card-adhar
              </button>
            </div>

            {/* Test Results */}
            <div className="card-adhar">
              <h2>
                <i className="fas fa-flask"></i> Latest Test Results
              </h2>
              {userData?.tests?.map((t, i) => (
                <div key={i} className="test-item">
                  <div>
                    <h3>{t.name}</h3>
                    <p>
                      Normal range: {t.normalRange} {t.unit}
                    </p>
                  </div>
                  <div>
                    <strong>
                      {t.value} {t.unit}
                    </strong>
                    <p className={t.statusClass}>{t.status}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Device Images */}
            <div className="card-adhar">
              <h2>
                <i className="fas fa-camera"></i> Test Device Images
              </h2>
              <div className="image-grid">
                {userData.deviceImages.map((img, i) => (
                  <div key={i} className="image-card-adhar">
                    <img src={img.url} alt={img.caption} />
                    <p>{img.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
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

export default AdharVerfiy;
