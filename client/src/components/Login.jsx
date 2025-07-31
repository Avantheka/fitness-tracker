import { useState } from "react";
import './Auth.css';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';

import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
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

      // ✅ On success, store token & email
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);

      setSuccess("Login successful!");
      setError("");

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
      setSuccess("");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();

      // ✅ Save Firebase token and email
      localStorage.setItem("token", token);
      localStorage.setItem("email", user.email);

      setSuccess("Google login successful!");
      setError("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error("Google Sign-In Error:", err.message);
      setError("Google Sign-In failed");
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

        <button onClick={handleGoogleSignIn} className="google-signin-btn">
          Sign in with Google
        </button>

        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
