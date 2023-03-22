import React from 'react';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

import { Box, chakra, SimpleGrid, Stat, useColorModeValue } from '@chakra-ui/react';

function InformationScreen() {
  return (
    <>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
          DATA STATISTIC COVID
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <Box>
            <Stat
              px={{ base: 4, md: 8 }}
              py={'5'}
              shadow={'xl'}
              border={'1px solid'}
              borderColor={useColorModeValue('gray.800', 'gray.500')}
              rounded={'lg'}>
              <BarChart />
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
              <LineChart />
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
              <LineChart />
            </Stat>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}

export default InformationScreen;
