import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectRoute({ children }: Props) {
  const token = Cookies.get("Authorization");
  const location = useLocation();

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to={`/login?redirectUrL=${location.pathname}`} replace />;
}
