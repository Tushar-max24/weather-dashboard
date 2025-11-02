// src/redux/weatherSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getForecast } from "../api/weatherApi";

const readLocal = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) { return fallback; }
};
const writeLocal = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

const user = readLocal("user", null);
const uid = user?.uid || "anon";
const initialFavorites = readLocal(`favorites_${uid}`, uid === "anon" ? ["London", "Delhi"] : []);
const initialUnit = readLocal("unit", "C");
const initialCache = readLocal(`cache_${uid}`, {});

export const fetchCityForecast = createAsyncThunk(
  "weather/fetchCityForecast",
  async (city, thunkAPI) => {
    const state = thunkAPI.getState();
    const cache = state.weather.cache || {};
    const entry = cache[city];
    const now = Date.now();
    if (entry && now - entry.ts < 60 * 1000) {
      return { city, data: entry.data, cached: true };
    }
    const data = await getForecast(city, 7);
    return { city, data, cached: false, ts: now };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    citiesData: {},
    favorites: initialFavorites,
    unit: initialUnit,
    status: "idle",
    cache: initialCache,
    searchResults: [],
    user: user // store basic user info
  },
  reducers: {
    toggleFavorite(state, action) {
      const city = action.payload;
      if (state.favorites.includes(city)) state.favorites = state.favorites.filter((c) => c !== city);
      else state.favorites.push(city);
      const uidLocal = state.user?.uid || "anon";
      writeLocal(`favorites_${uidLocal}`, state.favorites);
    },
    setUnit(state, action) {
      state.unit = action.payload;
      writeLocal("unit", state.unit);
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
      // migrate favorites/cache if needed
      const newUid = state.user?.uid || "anon";
      state.favorites = readLocal(`favorites_${newUid}`, state.favorites);
      state.cache = readLocal(`cache_${newUid}`, state.cache);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityForecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCityForecast.fulfilled, (state, action) => {
        const { city, data, ts } = action.payload;
        state.citiesData[city] = { data, lastUpdated: ts || Date.now() };
        state.cache[city] = { data, ts: ts || Date.now() };
        const uidLocal = state.user?.uid || "anon";
        writeLocal(`cache_${uidLocal}`, state.cache);
        state.status = "idle";
      })
      .addCase(fetchCityForecast.rejected, (state) => {
        state.status = "error";
      });
  }
});

export const { toggleFavorite, setUnit, setSearchResults, setUser } = weatherSlice.actions;
export default weatherSlice.reducer;
