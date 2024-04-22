import * as React from 'react';
import MainContainer from './navigation/MainContainer';
import Login from './navigation/screens/FirstPage';
import FirstPage from './navigation/screens/FirstPage';
import Donate from './navigation/screens/Donate';

import { GlobalStateProvider } from './navigation/screens/GlobalContext';

export default function App() {
  return (
    <GlobalStateProvider>
      <MainContainer />    
    </GlobalStateProvider>
    
)};
