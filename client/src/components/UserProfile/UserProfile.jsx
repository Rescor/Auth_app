import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './UserProfile.module.css';
import StyledBox from '../StyledBox/StyledBox';
import Background from '../Background/Background';
import Loader from '../Loader';

const UserProfile = ({ data, setUserData, setIsLoggedIn }) => {
  function handleLogout() {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserData(null);
  }

  if (data) return <>
    <Background url='/assets/bg2.jpg' />

    <StyledBox>
      <p className={styles.welcome}>
        Welcome, {data.user.email}!
      </p>

      <Button variant="contained" color="secondary" startIcon={<LogoutIcon />} onClick={handleLogout}>
        Logout
      </Button>
    </StyledBox>
  </>

  return <Loader />
};

export default UserProfile;
