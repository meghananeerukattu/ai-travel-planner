function TripCard({ trip }) {
  return (
    <div>
      <h3>{trip.destination}</h3>
      <p>{trip.durationDays} Days</p>
      <p>{trip.budgetTier}</p>
    </div>
  );
}

export default TripCard;