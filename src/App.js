import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching countries data...");
    fetch("https://xcountries-backend.azurewebsites.net/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data fetched:", data);
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1>Countries and Flags</h1>
      <div className="countries-container">
        {countries.map((country) => (
          <div key={country.name} className="country">
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="flag"
            />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
