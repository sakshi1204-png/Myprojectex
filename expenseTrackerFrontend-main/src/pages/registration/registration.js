import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import styled from 'styled-components';
import { Button, TextField, Typography, Paper, Box, FormHelperText } from '@mui/material';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle registration logic here
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);

        // Redirect to login page
        navigate('/login');
    };

    return (
        <RegistrationPageStyled>
            <Box className="container">
                <Paper elevation={3} className="registration-form">
                    <Typography variant="h4" gutterBottom>
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box className="form-group">
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={!!errors.username}
                                helperText={errors.username}
                                required
                            />
                        </Box>
                        <Box className="form-group">
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
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
                                error={!!errors.password}
                                helperText={errors.password}
                                required
                            />
                        </Box>
                        <Box className="form-group">
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                required
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Sign Up
                        </Button>
                        <Box className="login-link">
                            <Typography variant="body2">
                                Already have an account?{' '}
                                <Link to="/login">Login</Link>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </RegistrationPageStyled>
    );
};

const RegistrationPageStyled = styled.div`
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

    .registration-form {
        padding: 2rem;
        border-radius: 8px;
        background-color: #ffffff;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .login-link {
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

export default RegistrationPage;
