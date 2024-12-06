import './App.css';
import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './templates/loginform';
import { GoogleLogout } from 'react-google-login';

const clientId = "486049257205-vd8d0oiflg1hq8qt0cl0l3m75olibr7e.apps.googleusercontent.com";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      }).then(() => {
        console.log("Google API Initialized");
      }).catch((error) => {
        console.error("Google API initialization failed:", error);
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = (res) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setUser(res.profileObj);
    navigate("/home");
  };

  const onFailure = (res) => {
    console.log("Login failed:", res);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    setUser(null);
    navigate("/");
  };

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      navigate('/');
      return null;
    }
    return children;
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={<LoginForm onSuccess={onSuccess} onFailure={onFailure} />} 
      />

      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <div className="homepage">
              <h1>Hello, {user ? user.name : 'Guest'}!</h1>
              <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={handleLogout}
              />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
