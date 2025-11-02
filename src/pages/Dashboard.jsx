import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CityCard from "../components/CityCard";

import { fetchCityForecast } from "../redux/weatherSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((s) => s.weather.favorites);
  const citiesData = useSelector((s) => s.weather.citiesData);

  useEffect(() => {
    // Fetch favorites on mount
    favorites.forEach((city) => dispatch(fetchCityForecast(city)));

    // Auto refresh every 60s for visible favorites
    const id = setInterval(() => {
      favorites.forEach((city) => dispatch(fetchCityForecast(city)));
    }, 60 * 1000);

    return () => clearInterval(id);
  }, [dispatch, favorites]);

  const cities = Object.keys(citiesData);

  // show favorites first, then other fetched cities
  const ordered = Array.from(new Set([...favorites, ...cities]));

  return (
    <div className="dashboard">
      {ordered.length === 0 && <p>No cities yet. Use search to add some.</p>}
      <div className="cards-grid">
        {ordered.map((city) => (
          <CityCard key={city} cityName={city} data={citiesData[city]} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
