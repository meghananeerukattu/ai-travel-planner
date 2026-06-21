import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  return (
  <>
    <Navbar />
    <div className="page-container">
      <div className="card">
        <h1>Dashboard</h1>
        <button onClick={() => navigate("/create-trip")}>
          Create Trip
        </button>
        <br /><br />
        <button onClick={() => navigate("/my-trips")}>
          My Trips
        </button>
      </div>
    </div>
  </>
);
}

export default Dashboard;