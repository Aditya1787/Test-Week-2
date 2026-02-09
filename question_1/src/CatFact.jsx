import React, { useState } from "react";
import "./App.css";

function Catfact() {
  const [fact, setFact] = useState(
    "Click the button to get a cat fact!"
  );
  const [loading, setLoading] = useState(false);

  const getCatFact = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://catfact.ninja/fact");
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      setFact("Failed to load cat fact 😿");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>🐱 Random Cat Fact</h2>
      <p>{loading ? "Loading..." : fact}</p>
      <button onClick={getCatFact}>Get New Fact</button>
    </div>
  );
}

export default Catfact;
