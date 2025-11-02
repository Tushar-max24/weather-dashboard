import React, { useState, useEffect } from "react";
import { searchCities } from "../api/weatherApi";
import { useDispatch } from "react-redux";
import { fetchCityForecast } from "../redux/weatherSlice";

const SearchBar = () => {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!q) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const res = await searchCities(q);
        setResults(res || []);
      } catch (e) {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  const onSelect = (name) => {
    setQ("");
    setResults([]);
    dispatch(fetchCityForecast(name));
  };

  return (
    <div className="search">
      <input
        value={q}
        placeholder="Search city..."
        onChange={(e) => setQ(e.target.value)}
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="search-list">
          {results.map((r) => (
            <li key={r.url || r.name} onClick={() => onSelect(r.name)}>
              {r.name}, {r.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
