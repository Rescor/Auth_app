import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import UserProfile from './components/UserProfile/UserProfile';
import Loader from "./components/Loader";
import { serverUrl } from './utils/serverUrl';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setIsLoggedIn(false);
    }

    if (token) {
      async function getUserData() {
        try {
          const response = await fetch(`${serverUrl}/api/data`, {
            headers: { Authorization: `${token}` }
          });

          if (response.status === 401) {
            localStorage.removeItem('authToken');
            setIsLoading(false)
            setIsLoggedIn(false);
            return;
          }

          const data = await response.json();

          if (data.user.email) {
            setUserData(data);
            setIsLoading(false)
            setIsLoggedIn(true);
          }
        } catch (e) {
          alert('Something went wrong :(');
          setIsLoading(false)
          setIsLoggedIn(false);
        }
      }

      getUserData();
    }
  }, [token])

  if (!isLoading && !isLoggedIn && !userData) return <LoginForm setUserData={setUserData} />

  if (userData) return <UserProfile data={userData} setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} />

  return <Loader />
}
