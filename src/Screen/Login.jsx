import React, { useState } from "react";
import "./Login.css";
import img1 from "../Images/bg.jpg";
import { PostCall } from "../Screen/ApiService";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../Store/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    adhar: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // const handleToggle = () => {
  //   setIsLogin(!isLogin);
  // };

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
        const res = await PostCall("auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", JSON.stringify(res.token));
        dispatch(
          loginSuccess({
            user: res.user,
            token: res.token,
          })
        );
        Navigate("/dashboard");
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
          <h1>Welcome To Dual Life</h1>
          <h2>{isLogin ? "Login" : "Sign Up"} to your Account</h2>
          <form onSubmit={handleSubmit}>
            {/* {!isLogin && (
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
                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </>
            )} */}
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
            {/* {!isLogin && (
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
            )} */}
            <button type="submit" className="auth-btn">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="toggle-text">
            {/* {isLogin ? "Don't have an account?" : "Already have an account?"}{" "} */}
            {/* <span onClick={handleToggle}>{isLogin ? "Sign Up" : "Login"}</span> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
