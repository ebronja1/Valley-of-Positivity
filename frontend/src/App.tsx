// src/App.tsx
import React from "react";
import { Outlet } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Outlet /> {/* This renders the child routes */}
      <ToastContainer /> {/* Toast notifications */}
    </UserProvider>
  );
};

export default App;

