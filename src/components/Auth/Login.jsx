import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const Login = () => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    const { username, password } = input;
    if (username === 'admin' && password === '123') {
      login();
      navigate('/TodoList');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <Box
        sx={{
          backgroundImage: `url('../pexels_pixabay.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: 4,
              borderRadius: 1,
              boxShadow: 5,
              textAlign: 'center',
            }}
          >
            {errorMessage && (
              <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField
              variant="outlined"
              label="Username"
              name="username"
              value={input.username}
              onChange={handleInput}
              fullWidth
              margin="normal"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              fullWidth
              margin="normal"
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default Login;
