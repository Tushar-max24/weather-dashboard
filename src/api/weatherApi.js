import axios from "axios";

const KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE = "https://api.weatherapi.com/v1";

const api = axios.create({
  baseURL: BASE,
  params: { key: KEY }
});

export async function searchCities(q) {
  // /search.json
  const res = await api.get("/search.json", { params: { q } });
  return res.data;
}

export async function getForecast(city, days = 7) {
  // returns current + forecast (with hourly)
  const res = await api.get("/forecast.json", {
    params: { q: city, days, aqi: "no", alerts: "no" }
  });
  return res.data;
}

export async function getCurrent(city) {
  const res = await api.get("/current.json", { params: { q: city } });
  return res.data;
}

export default api;
