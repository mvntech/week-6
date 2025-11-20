import React from 'react'

const Dashboard = ({ onLogout }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
    }
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
