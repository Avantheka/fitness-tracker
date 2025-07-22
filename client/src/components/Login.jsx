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

    if (!email || !password) {
      setError("Please fill in all fields");
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      console.log("Login success:", response.data);

      setError('');
      setSuccess("Login successful!");

      setEmail('');
      setPassword('');

    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
      setSuccess('');
    }
  };

  return (
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
        <br />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
