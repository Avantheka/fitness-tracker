import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard"; 
import Tracking from "./pages/Tracking";
import Progress from "./pages/Progress";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;