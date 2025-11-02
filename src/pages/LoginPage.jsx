import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebaseConfig";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/"); // already logged in → go to dashboard
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/"); // redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
      alert("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>🌤️ WeatherDash</h1>
      <p style={{ marginBottom: "30px", fontSize: "1rem" }}>
        Sign in to continue to your weather dashboard
      </p>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          background: "#4285F4",
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          style={{ width: "20px", height: "20px" }}
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
