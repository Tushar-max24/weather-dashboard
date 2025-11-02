import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/weatherSlice";

const CityCard = ({ cityName, data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((s) => s.weather.favorites);
  const unit = useSelector((s) => s.weather.unit);
  const isFav = favorites.includes(cityName);

  // 🟡 Loading Skeleton
  if (!data) {
    return (
      <div className="card placeholder">
        <div
          style={{
            height: 18,
            width: 120,
            background: "#eee",
            borderRadius: 6,
            marginBottom: 8,
          }}
        />
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              height: 64,
              width: 64,
              background: "#eee",
              borderRadius: 8,
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 20,
                width: "60%",
                background: "#eee",
                marginBottom: 6,
              }}
            />
            <div
              style={{
                height: 16,
                width: "40%",
                background: "#eee",
              }}
            />
          </div>
        </div>
        <div
          style={{
            height: 12,
            width: "30%",
            background: "#eee",
            marginTop: 12,
          }}
        />
      </div>
    );
  }

  // 🌤️ Weather Data
  const current = data.data.current;
  const temp = unit === "C" ? current.temp_c : current.temp_f;
  const icon = current.condition.icon.startsWith("http")
    ? current.condition.icon
    : `https:${current.condition.icon}`;

  return (
    <div className="card">
      {/* 🔹 Header with Favorite Toggle */}
      <div className="card-top">
        <h3>{data.data.location.name}</h3>
        <button
          className={`fav ${isFav ? "active" : ""}`}
          onClick={() => dispatch(toggleFavorite(cityName))}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? "★" : "☆"}
        </button>
      </div>

      {/* 🔹 Weather Info */}
      <Link
        to={`/city/${encodeURIComponent(cityName)}`}
        className="card-link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card-body">
          <img
            src={icon}
            alt={current.condition.text}
            className="cond-icon"
            style={{ width: 64, height: 64 }}
          />
          <div>
            <div
              className="temp"
              style={{
                fontSize: "1.6rem",
                fontWeight: "700",
                color: "#0048ff",
              }}
            >
              {Math.round(temp)}°{unit}
            </div>
            <div
              className="cond-text"
              style={{ fontWeight: "500", marginBottom: 4 }}
            >
              {current.condition.text}
            </div>
            <div className="small">💧 Humidity: {current.humidity}%</div>
            <div className="small">💨 Wind: {current.wind_kph} kph</div>
          </div>
        </div>
      </Link>

      {/* 🔹 Footer */}
      <div className="card-footer small">
        Updated:{" "}
        {data.lastUpdated
          ? new Date(data.lastUpdated).toLocaleTimeString()
          : "—"}
      </div>
    </div>
  );
};

export default CityCard;
