import React, { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <Dashboard
          onLogout={() => { setIsLoggedIn(false); }}
        />
      ) : (
        <>
          <SignUp />
          <hr />
          <Login onLogin={() => setIsLoggedIn(true)} />
        </>
      )}
    </div>
  );
};

export default App;
