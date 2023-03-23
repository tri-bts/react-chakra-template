import { Box, Center, Text, Stack, VStack, useColorModeValue } from '@chakra-ui/react';

import React from 'react';

const NotFoundScreen = () => {
  return (
    <Center py={6}>
      <Box
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}>
          <VStack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'6xl'} fontWeight={800}>
              404
            </Text>
            <Text fontSize={'xl'} fontWeight={800}>
              Page Not Found
            </Text>
          </VStack>
        </Stack>
      </Box>
    </Center>
  );
};

export default NotFoundScreen;
