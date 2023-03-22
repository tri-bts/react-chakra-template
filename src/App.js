import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ChakraProvider, Grid, theme } from '@chakra-ui/react';
import LoginScreen from './modules/auth/pages/LoginScreen';
import Header from 'modules/app/components/Header/index';
import Jadwal from 'modules/jadwal/pages/Jadwal';
import SilsilahKeluarga from 'modules/silsilah-keluarga/pages/SilsilahKeluarga';
import FormUnik from 'modules/form-unik/pages/FormUnik';
import FormCanggih from 'modules/form-canggih/pages/FormCanggih';
import Formula from 'modules/formula/pages/Formula';
import Tabel from 'modules/tabel/pages/Tabel';
import Informasi from 'modules/infromasi/pages/Informasi';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Grid minH="90vh" px={5} py={7}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/jadwal" element={<Jadwal />} />
            <Route path="/silsilah-keluarga" element={<SilsilahKeluarga />} />
            <Route path="/form-unik" element={<FormUnik />} />
            <Route path="/form-canggih" element={<FormCanggih />} />
            <Route path="/formula" element={<Formula />} />
            <Route path="/tabel" element={<Tabel />} />
            <Route path="/informasi" element={<Informasi />} />
          </Routes>
        </Grid>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
