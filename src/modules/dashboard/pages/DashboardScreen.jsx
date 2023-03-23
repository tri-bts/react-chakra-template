import React from 'react';

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const DashboardScreen = () => {
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            KiSeratus
          </Text>
          <Heading>Selamat Datang di Aplikasi KiSeratus</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore
          </Text>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={require('@/assets/images/medical-banner-with-doctor-holding-stethoscope.jpg')}
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default DashboardScreen;
