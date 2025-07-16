import { useState } from "react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <br />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
