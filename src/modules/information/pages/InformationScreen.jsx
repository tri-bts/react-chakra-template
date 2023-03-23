import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { information_fetchStatistic } from '../slice/information.slice';

import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';

import { Box, chakra, SimpleGrid, Stat, useColorModeValue, Spinner } from '@chakra-ui/react';

function InformationScreen() {
  const [population, setPopulation] = useState('');
  const isLoading = useSelector(({ information }) => information.information_loading);

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
          DATA POPULASI ASIA
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
              {population.length < 1 && !isLoading && <div>no data</div>}
              {population.length > 0 && !isLoading && <BarChart data={population} />}
              {isLoading && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
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
              {population.length < 1 && !isLoading && <div>no data</div>}
              {population.length > 0 && <LineChart data={population} />}
              {isLoading && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
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
              {population.length < 1 && !isLoading && <div>no data</div>}
              {population.length > 0 && <PieChart data={population} />}
              {isLoading && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
            </Stat>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}

export default InformationScreen;
