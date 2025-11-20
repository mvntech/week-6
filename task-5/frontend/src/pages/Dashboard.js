import React from "react";
import UserProfile from "../components/UserProfile";

const Dashboard = ({ onLogout }) => {
  const userId = localStorage.getItem("userId");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    onLogout();
  };
  return (
    <div>
      <UserProfile userId={userId} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
