import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for auth token (this is where you'll check with an API)
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      setUser({ name: 'John Doe' }); // Mock user data
    }
  }, [navigate]);

  return user ? (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={() => {
        localStorage.removeItem('authToken');
        navigate('/login');
      }}>Logout</button>
    </div>
  ) : null;
};

export default HomePage;
