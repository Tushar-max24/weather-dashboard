import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUnit } from "../redux/weatherSlice";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebaseConfig";

const Header = () => {
  const unit = useSelector((s) => s.weather.unit);
  const status = useSelector((s) => s.weather.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (e) {
      console.error("Error signing out:", e);
    }
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "linear-gradient(90deg, #74ebd5, #ACB6E5)",
      }}
    >
      <div className="header-left" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link to="/" className="logo" style={{ fontWeight: "bold", fontSize: "20px", color: "#333" }}>
          WeatherDash
        </Link>
        <SearchBar />
      </div>

      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {status === "loading" && <span style={{ fontSize: "12px", color: "#555" }}>Refreshing…</span>}

        <button
          onClick={() => dispatch(setUnit(unit === "C" ? "F" : "C"))}
          className="btn"
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: "#fff",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          {unit === "C" ? "°C" : "°F"}
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            background: "#ff4c4c",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
