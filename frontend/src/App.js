import './App.css';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Auth from './contexts/Auth';
import Navbar from './components/Navbar';
import axios from './api/axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoading(true);
    if (token) {
      axios.get("/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then((response) => {
        if (response.data.auth) {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
        console.log(response);
      }).catch((error) => {
        console.error(error);
      });
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated])

  return (
    isLoading ? (
      <div></div>
    ) : (
      <Auth.Provider value={{ isAuthenticated }}>
        <Router>
          <div>
            <Navbar />

            <Routes>
              <Route exact path="/" element={<div>HOME</div>} />
              <Route exact path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              {isAuthenticated && <Route exact path="/dashboard" element={<div>DASHBOARD</div>} />}
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </div>
        </Router>
      </Auth.Provider>
    )
  );
}

export default App;
