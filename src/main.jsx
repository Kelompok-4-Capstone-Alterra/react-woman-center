import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Dashboard from "./layouts/Dashboard.jsx";
import Login from "./pages/Login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
