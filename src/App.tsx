import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { CurrentUserIF } from './interfaces';
import { AlertsContext, CurrentUserContext } from './contexts';
import { Orders, Stations } from './pages';
import { HeaderBar } from './components';
import { useAuth } from "react-oidc-context";
import { User } from "oidc-client-ts";
import './App.scss';
import Joyride from 'react-joyride';
import tour from './features/tour';
import Alert from './components/alert/alert';
import { Stack } from '@mui/material';


function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUserIF | undefined>()
  const [alerts, setAlerts] = useState<any[]>([])
  const auth = useAuth();

  const addAlert = (message: string) => {
    const newAlert =  { onClose: () => {}, text: message };
    setAlerts([ ...alerts, newAlert])
  };

  const authSigninRedirect = async () => void auth.signinRedirect();

  const authSignout = async () => void auth.removeUser();


  /*useEffect(() => {
    console.log(auth.isAuthenticated, auth.isLoading, auth.error)
    if (!auth.isAuthenticated && !auth.isLoading && !auth.error) {
      authSigninRedirect();
    }
  }, [])*/

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      console.log(auth.user)
      setCurrentUser({
        firstName: auth.user?.profile?.given_name,
        lastName: auth.user?.profile?.family_name,
        username: `${auth.user?.profile['cognito:username']}`,
        token: `${auth.user?.id_token}`
      });
    }
  }, [auth.user?.profile.sub])


  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) {
    authSigninRedirect();
    return <div>Redirecting to sign in ...</div>;
  }

  if (auth.isAuthenticated) {

    return (
      <AlertsContext.Provider value={{ addAlert }}>
        <CurrentUserContext.Provider value={currentUser}>
          {currentUser && (<BrowserRouter>
            <Joyride steps={tour} run={false} continuous={true} floaterProps={{
              styles: {
                wrapper: {
                  position: 'absolute',
                  top: 0,
                  left: '50vw',
                  zIndex: 2000
                },
              },
            }} />
            <HeaderBar />
            <Routes>
              <Route path='/stations/:step' element={<Stations />} />
              <Route path='/orders' element={<Orders />} />
              <Route path="/*" element={<Navigate to="/stations/preproduction" />} />
              <Route path='/' element={<Stations />} />
            </Routes>
          </BrowserRouter>)}
          <div id="alerts">
            <Stack spacing={2} sx={{  maxWidth: 600, position: 'fixed', bottom: 0, right: 0, height: '100vh' }} >
              { alerts.map((alert, index) => <Alert onClose={alert.onClose} text={alert.text} /> ) }
            </Stack>
          </div>
        </CurrentUserContext.Provider>
      </AlertsContext.Provider>
    );
  }

  return (<div>Oops... Something went wrong!</div>)

  
}

export default App;
