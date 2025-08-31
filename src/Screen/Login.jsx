import React, { useState } from "react";
import "./Login.css";
import img1 from "../Images/bg.jpg";
import { PostCall } from "../Screen/ApiService";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    adhar: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login API call
        const res = await PostCall("login", {
          userId: formData.email,
          password: formData.password,
        });
        console.log("Login Success:", res);
      } else {
        // Signup API call
        const res = await PostCall("signup", {
          fullName: formData.fullName,
          adhar: formData.adhar,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        console.log("Signup Success:", res);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <div className="login-main-div">
      <img src={img1} alt="bg" />
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>Adhar Number</label>
                  <input
                    type="text"
                    name="adhar"
                    placeholder="Enter your adhar Number"
                    value={formData.adhar}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="input-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {!isLogin && (
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}
            <button type="submit" className="auth-btn">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span onClick={handleToggle}>{isLogin ? "Sign Up" : "Login"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
