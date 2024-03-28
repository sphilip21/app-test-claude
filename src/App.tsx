import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { CurrentUserIF } from './interfaces';
import { AlertsContext, CurrentUserContext } from './contexts';
import { Orders, Stations } from './pages';
import { HeaderBar } from './components';
import keycloak from './keycloak';

import './App.scss';
import Joyride from 'react-joyride';
import tour from './features/tour';
import Alert from './components/alert/alert';
import { Stack } from '@mui/material';



function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUserIF | undefined>()
  const [alerts, setAlerts] = useState<any[]>([])


  const initKeycloak = useCallback(async() => {
    let token: string | undefined = keycloak.token
    if (!token) {
      const res = await keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        enableLogging: true
      })
      // If authenticated
      if (res) {
        setCurrentUser({
          ...keycloak.tokenParsed, // TODO - Review this
          firstName: keycloak.tokenParsed?.given_name,
          lastName: keycloak.tokenParsed?.family_name,
          email: keycloak.tokenParsed?.email,
          username: keycloak.tokenParsed?.preferred_username,
          token: keycloak.token
        })
        token = keycloak.token
      } else {
        // reset to properly clean up state
        setCurrentUser(undefined)
        window.location.reload()
      }
    }
  }, [])

  useEffect(() => {
    if (!keycloak.token) {
      initKeycloak()
    }
  }, [initKeycloak])

  const addAlert = (message: string) => {
    const newAlert =  { onClose: () => {}, text: message };
    setAlerts([ ...alerts, newAlert])
  };

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

export default App;
