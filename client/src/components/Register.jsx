import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css"; 
 
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
 
    setError("");
    console.log("Registering user:", { name, email, password });
 
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
 
  return (
<div className="auth-form-container">
<h2>Create Account</h2>
<form onSubmit={handleSubmit}>
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
 
        <button type="submit">Register</button>
</form>
 
      <Link to="/">Already have an account? Login</Link>
</div>
  );
};
 
export default Register;