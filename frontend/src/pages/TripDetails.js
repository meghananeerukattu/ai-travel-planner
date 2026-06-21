
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItinerary, setEditedItinerary] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/trips/${id}`,
        {
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

      setTrip(data);
      setEditedItinerary(data.itinerary || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch trip details");
    }
  };

  const saveTrip = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://ai-travel-planner-backend-olrl.onrender.com/api/trips/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            itinerary: editedItinerary,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setTrip(data);
      setEditedItinerary(data.itinerary || []);
      setIsEditing(false);

      alert("Trip Updated Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  if (!trip) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <h2>Loading...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div style={{ width: "900px" }}>
          <div className="trip-card">
            <h1>{trip.destination}</h1>

            <p>
              <strong>Days:</strong> {trip.durationDays}
            </p>

            <p>
              <strong>Budget:</strong> {trip.budgetTier}
            </p>
          </div>

          <div className="trip-card">
            <h2>Itinerary</h2>

            {trip.itinerary?.length > 0 ? (
              trip.itinerary.map((item, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "20px" }}
                >
                  <h3>Day {item.day}</h3>

                  {isEditing ? (
                    <textarea
                      rows="6"
                      style={{
                        width: "100%",
                        padding: "10px",
                      }}
                      value={
                        editedItinerary[index]?.activities?.join(
                          "\n"
                        ) || ""
                      }
                      onChange={(e) => {
                        const updated = [
                          ...editedItinerary,
                        ];

                        updated[index].activities =
                          e.target.value.split("\n");

                        setEditedItinerary(updated);
                      }}
                    />
                  ) : (
                    <ul>
                      {item.activities?.map(
                        (activity, i) => (
                          <li key={i}>
                            {activity}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p>No itinerary available</p>
            )}
          </div>

          <div className="trip-card">
            <h2>Hotels</h2>

            {trip.hotels?.length > 0 ? (
              trip.hotels.map((hotel, index) => (
                <p key={index}>
                  {hotel.name}
                </p>
              ))
            ) : (
              <p>No hotels available</p>
            )}
          </div>

          <div className="trip-card">
            <h2>Budget Estimate</h2>

            <p>
              <strong>Flights:</strong> $
              {trip.estimatedBudget?.flights}
            </p>

            <p>
              <strong>Accommodation:</strong> $
              {trip.estimatedBudget?.accommodation}
            </p>

            <p>
              <strong>Food:</strong> $
              {trip.estimatedBudget?.food}
            </p>

            <p>
              <strong>Activities:</strong> $
              {trip.estimatedBudget?.activities}
            </p>

            <p>
              <strong>Total:</strong> $
              {trip.estimatedBudget?.total}
            </p>
          </div>
           <div className="trip-card">
  <h2>Trip Summary</h2>

  <p>
    <strong>Destination:</strong>{" "}
    {trip.destination}
  </p>

  <p>
    <strong>Duration:</strong>{" "}
    {trip.durationDays} Days
  </p>

  <p>
    <strong>Total Activities:</strong>{" "}
    {trip.itinerary?.reduce(
      (total, day) =>
        total +
        (day.activities?.length || 0),
      0
    )}
  </p>

  <p>
    <strong>Recommended Hotel:</strong>{" "}
    {trip.hotels?.[0]?.name ||
      "Not Available"}
  </p>

  <p>
    <strong>Total Budget:</strong> $
    {trip.estimatedBudget?.total}
  </p>
</div>
          <div className="trip-card">
            <h2>Packing List</h2>

            <ul>
              {trip.packingList?.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {!isEditing ? (
              <button
                style={{ width: "180px" }}
                onClick={() =>
                  setIsEditing(true)
                }
              >
                Edit Trip
              </button>
            ) : (
              <button
                style={{ width: "180px" }}
                onClick={saveTrip}
              >
                Save Changes
              </button>
            )}

            <button
              onClick={() =>
                navigate("/my-trips")
              }
              style={{
                width: "180px",
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

export default TripDetails;

