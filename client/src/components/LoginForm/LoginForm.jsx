import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import StyledBox from '../StyledBox/StyledBox';
import Background from '../Background/Background';
import { serverUrl } from '../../utils/serverUrl';
import styles from './LoginForm.module.css';

const LoginForm = ({ setUserData }) => {
  const [accCredentials, setAccCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAccCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(null);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password } = accCredentials;

    if (!isEmail(email)) {
      setError('Invalid email address');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must contain at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${serverUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);

      setUserData(data);
    } catch (e) {
      let message = 'Something went wrong :(';

      try {
        const parsedError = JSON.parse(e.message);
        if (parsedError.message) message = parsedError.message;
      } catch (parseError) { }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Background url='/assets/bg.jpg' />

    <StyledBox>
      <Typography variant="h5" gutterBottom>Login Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          required
          fullWidth
          margin="normal"
          value={accCredentials.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          required
          fullWidth
          margin="normal"
          value={accCredentials.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={styles.submit_button}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        {error && (
          <Typography color="error" className={styles.error}>
            {error}
          </Typography>
        )}
      </form>
    </StyledBox>
  </>
};

export default LoginForm;
