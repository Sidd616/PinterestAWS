import React from "react";
import { useAuth } from "react-oidc-context";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  const auth = useAuth();

  const signIn = () => {
    auth.signinRedirect();
  };

  const signOut = async () => {
    await auth.removeUser(); // Clears the session

    const clientId = "f2gt4v2ut7bn16tl7ctbunu6e"; // Replace with your Cognito App Client ID
    const logoutUri = "http://localhost:5173/";//"https://main.dp42myfy09fyo.amplifyapp.com/";//"http://localhost:5173/";
    const cognitoDomain = "https://us-east-1brgr5kgvm.auth.us-east-1.amazoncognito.com";

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) return <div className="loading-container">Loading...</div>;
  if (auth.error) return <div className="error-container">Oops... {auth.error.message}</div>;

  return (
    <Router>
      <div className="app-container">
        <Navbar signIn={signIn} signOut={signOut} />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home user={auth.user} isAuthenticated={auth.isAuthenticated} />} />
            <Route 
              path="/profile" 
              element={auth.isAuthenticated ? <Profile user={auth.user} isAuthenticated={auth.isAuthenticated} /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;