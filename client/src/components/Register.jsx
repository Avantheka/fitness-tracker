import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import axios from "../api/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true); 
    try {
      console.log("Axios called");

      const response = await axios.post("/register", {
        name,
        email,
        password,
      });

      console.log("Registration success:", response.data);
      setSuccess("Registration successful!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded w-full mt-4"
        disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
          </button>
          </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Register;
