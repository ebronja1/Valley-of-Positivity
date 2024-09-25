import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Menu from "../Menu/Menu"; // Adjust the path as needed
import { useAuth } from "../../Context/useAuth";

const Layout: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Menu />
      <div className="page-content">
      {isLoggedIn() ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </>
  );
};

export default Layout;
