import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import AddMovie from './pages/AddMovie';
import Movies from './pages/Movies';
import {jwtDecode} from 'jwt-decode';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser  = () => {
    localStorage.clear();
  };

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    setUser({
      id: decodedToken['id'], 
      isAdmin: decodedToken.isAdmin
    });
  }
}, []);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser  }}>
        <Router>
          <AppNavbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addMovie" element={<AddMovie />} />
              <Route path="/getMovies" element={<Movies />} />
            </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;