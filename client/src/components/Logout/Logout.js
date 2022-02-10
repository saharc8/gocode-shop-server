import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Logout.css";

const Logout = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="logout_btn"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Logout
    </button>
  );
};

export default Logout;
