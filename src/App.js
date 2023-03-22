import React from 'react';
import { BrowserRouter } from "react-router-dom";

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
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
