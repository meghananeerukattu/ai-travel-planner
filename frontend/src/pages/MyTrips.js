import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyTrips() {
const [trips, setTrips] = useState([]);
const navigate = useNavigate();

useEffect(() => {
fetchTrips();
}, []);

const fetchTrips = async () => {
try {
const token = localStorage.getItem("token");
  const response = await fetch(
    "http://localhost:5000/api/trips",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  console.log("TRIPS DATA:", data);

  if (!response.ok) {
    alert(data.message);
    return;
  }

  setTrips(Array.isArray(data) ? data : []);
} catch (error) {
  console.error(error);
}


};
const deleteTrip = async (id) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (!confirmDelete) {
      return;
    }
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/trips/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return;
    }
    alert("Trip Deleted Successfully");
    fetchTrips();
  } catch (error) {
    console.error(error);
  }
};
return (
<> <Navbar />
  <div className="page-container">
    <div style={{ width: "800px" }}>
      <h1 style={{ marginBottom: "20px" }}>
        My Trips
      </h1>
      {trips.length === 0 ? (
        <p>No Trips Found</p>
      ) : (
        <div className="trips-container">
          {trips.map((trip) => (
            <div
              className="trip-card"
              key={trip._id}
            >
              <h2>{trip.destination}</h2>
              <p>
                <strong>Days:</strong>{" "}
                {trip.durationDays}
              </p>
              <p>
                <strong>Budget:</strong>{" "}
                {trip.budgetTier}
              </p>
             <div
  className="trip-buttons"
  style={{
    display: "flex",
    gap: "10px",
  }}
>
  <button
    onClick={() =>
      navigate(`/trip/${trip._id}`)
    }
  >
    View Details
  </button>

  <button
    onClick={() => deleteTrip(trip._id)}
    style={{
      backgroundColor: "#dc2626",
    }}
  >
    Delete
  </button>
</div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() =>
            navigate("/dashboard")
          }
          style={{
            width: "150px",
            backgroundColor: "#6b7280",
          }}
        >
          Back →
        </button>
      </div>
    </div>
  </div>
</>


);
}

export default MyTrips;
