import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider, theme } from '@chakra-ui/react';
import LoginScreen from './modules/auth/pages/LoginScreen';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <LoginScreen />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
