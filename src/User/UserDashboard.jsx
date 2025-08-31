import React from "react";

const UserDashboard = () => {
  return (
    <div>
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
  );
};

export default UserDashboard;
