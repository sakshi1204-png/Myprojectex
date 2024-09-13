import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextField, Typography, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <LoginPageStyled>
            <Box className="container">
                <Paper elevation={3} className="login-form">
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box className="form-group">
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Box>
                        <Box className="form-group">
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                    <Box className="register-link">
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link to="/register">Register</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </LoginPageStyled>
    );
};

const LoginPageStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;

    .container {
        width: 100%;
        max-width: 400px;
        padding: 2rem;
    }

    .login-form {
        padding: 2rem;
        border-radius: 8px;
        background-color: #ffffff;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .register-link {
        margin-top: 1.5rem;
        text-align: center;

        a {
            text-decoration: none;
            color: #007bff;
            font-weight: 500;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

export default LoginPage;
