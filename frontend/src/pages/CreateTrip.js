import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [destination, setDestination] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [budgetTier, setBudgetTier] = useState("Medium");
  const [interests, setInterests] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://ai-travel-planner-backend-olrl.onrender.com/api/trips",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            destination,
            durationDays: Number(durationDays),
            budgetTier,
            interests: interests
              .split(",")
              .map((item) => item.trim()),
          }),
        }
      );
      const data = await response.json();
if (!response.ok) {
  alert(data.message);
  return;
}
console.log(data);
alert("Trip Created Successfully");
navigate("/my-trips");
    } 
  catch (error) {
  console.error("TRIP ERROR:", error);
  alert("Failed to create trip");
}
  };
 return (
  <>
    <Navbar />
    <div className="page-container">
      <div className="card">
        <h1>Create Trip</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="number"
            placeholder="Duration Days"
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
          />
          <select
            value={budgetTier}
            onChange={(e) => setBudgetTier(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            placeholder="Food, Culture, Shopping"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
          <button type="submit">
  Generate Trip
</button>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  }}
>
  <button
    type="button"
    onClick={() => navigate("/dashboard")}
    style={{
      width: "150px",
      backgroundColor: "#6b7280",
    }}
  >
   ← Back
  </button>
</div>
        </form>
      </div>
    </div>
  </>
);
}

export default CreateTrip;