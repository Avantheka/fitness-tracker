import React from "react";
import "../components/Auth.css"; // or create a new CSS file if needed

const GreetingCard = ({ name }) => {
  const currentHour = new Date().getHours();
  let greeting = "Welcome";

  if (currentHour < 12) greeting = "Good Morning";
  else if (currentHour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <div className="greeting-card">
      <h2>{greeting}, {name}</h2>
      <p>Let’s achieve your goals today with focus and determination.</p>
    </div>
  );
};

export default GreetingCard;