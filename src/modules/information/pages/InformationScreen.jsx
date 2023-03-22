import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { information_fetchStatistic } from '../slice/information.slice';

import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

import { Box, chakra, SimpleGrid, Stat, useColorModeValue } from '@chakra-ui/react';

function InformationScreen() {
  const [population, setPopulation] = useState('');

  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const data = await dispatch(information_fetchStatistic()).unwrap();
    setPopulation(data);
  }, [dispatch]);

  return (
    <>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
          DATA PENDUDUK BENUA ASIA
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 1 }} spacing={{ base: 5, lg: 8 }}>
          <Box>
            <Stat
              px={{ base: 4, md: 8 }}
              py={'5'}
              shadow={'xl'}
              border={'1px solid'}
              borderColor={useColorModeValue('gray.800', 'gray.500')}
              rounded={'lg'}>
              {population.length > 0 && <BarChart data={population} />}
            </Stat>
          </Box>
          <Box>
            <Stat
              px={{ base: 4, md: 8 }}
              py={'5'}
              shadow={'xl'}
              border={'1px solid'}
              borderColor={useColorModeValue('gray.800', 'gray.500')}
              rounded={'lg'}>
              {population.length > 0 && <LineChart data={population} />}
            </Stat>
          </Box>
          <Box>
            <Stat
              px={{ base: 4, md: 8 }}
              py={'5'}
              shadow={'xl'}
              border={'1px solid'}
              borderColor={useColorModeValue('gray.800', 'gray.500')}
              rounded={'lg'}></Stat>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}

export default InformationScreen;
