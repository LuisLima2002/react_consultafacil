import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    navigate('/login');
    return null; // Return nothing while redirecting
  }
  
  return children; // Render the child components if the user is authenticated
};

export default ProtectedRoute;
