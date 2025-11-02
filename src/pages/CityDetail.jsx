import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCityForecast } from "../redux/weatherSlice";
import TemperatureChart from "../Charts/TemperatureChart";
import PrecipitationChart from "../Charts/PrecipitationChart";
import WindChart from "../Charts/WindChart";

const API_KEY = "944838617941485da6d71736250211"; // 🔹 Replace with your WeatherAPI key

const CityDetail = () => {
  const { name } = useParams();
  const cityName = decodeURIComponent(name);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cityData = useSelector((s) => s.weather.citiesData[cityName]);
  const unit = useSelector((s) => s.weather.unit);
  const [tab, setTab] = useState("temp");
  const [apiData, setApiData] = useState(null);

  // 🧠 Fetch weather data every 60 seconds
  useEffect(() => {
    if (!cityName) return;

    const loadData = async () => {
      try {
        // 1️⃣ Redux Fetch
        dispatch(fetchCityForecast(cityName));

        // 2️⃣ Fallback API Fetch (direct from WeatherAPI)
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7`
        );
        const json = await res.json();
        if (json && json.location) {
          setApiData(json);
        } else {
          console.warn("⚠️ No forecast found for:", cityName);
        }
      } catch (err) {
        console.error("❌ Error fetching city forecast:", err);
      }
    };

    loadData();
    const id = setInterval(loadData, 60 * 1000);
    return () => clearInterval(id);
  }, [dispatch, cityName]);

  // 🧩 Use Redux data if available, otherwise fallback to API data
  const data = cityData?.data || apiData;
  if (!data) return <div className="detail">Loading...</div>;

  // 🔹 Process data for charts
  const hourly = data.forecast.forecastday.flatMap((d) =>
    d.hour.map((h) => ({
      time: h.time,
      temp_c: h.temp_c,
      temp_f: h.temp_f,
      precip_mm: h.precip_mm,
      wind_kph: h.wind_kph,
    }))
  );

  const daily = data.forecast.forecastday.map((d) => ({
    date: d.date,
    max_c: d.day.maxtemp_c,
    min_c: d.day.mintemp_c,
    max_f: d.day.maxtemp_f,
    min_f: d.day.mintemp_f,
    total_precip_mm: d.day.totalprecip_mm,
    avg_wind_kph: d.day.maxwind_kph,
  }));

  return (
    <div className="detail container" style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2>
          {data.location.name} — {data.current.condition.text}
        </h2>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "6px 12px",
            background: "#007bff",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* Tabs for Chart Selection */}
      <div style={{ marginTop: 10 }}>
        <button
          className={`btn ${tab === "temp" ? "active" : ""}`}
          onClick={() => setTab("temp")}
        >
          Temperature
        </button>
        <button
          className={`btn ${tab === "prec" ? "active" : ""}`}
          onClick={() => setTab("prec")}
        >
          Precipitation
        </button>
        <button
          className={`btn ${tab === "wind" ? "active" : ""}`}
          onClick={() => setTab("wind")}
        >
          Wind
        </button>
      </div>

      {/* Dynamic Chart Display */}
      <div style={{ marginTop: 20 }}>
        {tab === "temp" && <TemperatureChart data={hourly} unit={unit} />}
        {tab === "prec" && <PrecipitationChart data={daily} unit={unit} />}
        {tab === "wind" && <WindChart data={daily} />}
      </div>

      {/* Hourly Table */}
      <section style={{ marginTop: "30px" }}>
        <h3>Hourly Forecast</h3>
        <div className="hourly-table" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={{ padding: "8px" }}>Time</th>
                <th style={{ padding: "8px" }}>Temp ({unit})</th>
                <th style={{ padding: "8px" }}>Precip (mm)</th>
                <th style={{ padding: "8px" }}>Wind (kph)</th>
              </tr>
            </thead>
            <tbody>
              {hourly.slice(0, 72).map((h) => (
                <tr key={h.time} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>
                    {new Date(h.time).toLocaleString()}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {unit === "C" ? h.temp_c : h.temp_f}
                  </td>
                  <td style={{ padding: "8px" }}>{h.precip_mm}</td>
                  <td style={{ padding: "8px" }}>{h.wind_kph}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CityDetail;
