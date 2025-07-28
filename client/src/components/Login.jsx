import { useState } from "react";
import './Auth.css';
import { Link } from "react-router-dom";
import axios from '../api/axios';

import { auth, provider } from "../firebase"; // Import Firebase config
import { signInWithPopup } from "firebase/auth"; // Import Google sign-in

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      localStorage.setItem("token", response.data.token);
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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      console.log("Google Sign-In successful:", user);


      localStorage.setItem("token", token);
      setSuccess("Google login successful!");
      setError("");

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);

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
