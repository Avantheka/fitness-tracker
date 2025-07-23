import { useState } from "react";
import './Auth.css';
import { Link } from "react-router-dom";
import axios from '../api/axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setSuccess("");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post("/login", { email, password });
      console.log("Login success:", response.data);

      setSuccess("Login successful!");
      setError("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        window.location.href = '/dashboard'; 
      }, 1500);

    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
      setSuccess("");
    }
  };

  return (
    <div className="page-container">
      <div className="info-section">
        <h1>Fitness Tracker</h1>
        <p>
          Our fitness tracking app helps you set goals, monitor progress, and stay motivated.
          Achieve a healthier lifestyle with personalized insights, easy tracking, and real-time progress updates.
        </p>
      </div>
      
      <div className="auth-form-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit">Login</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
