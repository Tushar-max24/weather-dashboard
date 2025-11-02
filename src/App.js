import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import CityDetail from "./pages/CityDetail";
import LoginPage from "./pages/LoginPage";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public route for login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected dashboard */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <>
              <Header />
              <Dashboard />
            </>
          </PrivateRoute>
        }
      />

      {/* Protected city details */}
      <Route
        path="/city/:name"
        element={
          <PrivateRoute>
            <>
              <Header />
              <CityDetail />
            </>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
