import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hospitalImage from '../assets/hospital_login.jpg'

const LoginPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error
      
        try {
          const response = await fetch('https://localhost:5001/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
          
          const data = await response.json();
          
          if (response.ok) {
            localStorage.setItem('authToken', data.token);
            navigate('/home');
          } else {
            setError(data.message || 'Usuário ou senha são inválidos');
          }
        } catch (err) {
          setError('Something went wrong');
        }
      };
      

    return (
        <div className="container min-vh-100">
            <div className="row min-vh-100">
                {/* First column: Login form */}
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <div className="w-75">
                        <h1 className="text-center mb-4">ConsultaFácil</h1>
                        <h6 className="text-center mb-4">Alaska</h6>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Nome de usuário</label>
                                <input
                                    type="username"
                                    id="username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <button type="submit" className="btn btn-primary w-100">Entrar</button>
                        </form>
                    </div>
                </div>

                {/* Second column: Image */}
                <div className="col-md-8 d-none d-md-block">
                    <img

                        src={hospitalImage}  // Use your image URL here
                        alt="Login Illustration"
                        className="img-fluid"
                        style={{ objectFit: 'contain', height: '100vh' }}
                    />
                </div>
            </div>
        </div>);
};

export default LoginPage;
