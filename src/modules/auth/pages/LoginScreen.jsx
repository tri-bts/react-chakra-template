import React, { useCallback } from 'react';

import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { auth_doLogin } from '../slice/auth.slice';
import { Formik } from 'formik';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const toast = useToast();

  const onSubmit = useCallback(
    async values => {
      try {
        await dispatch(auth_doLogin(values)).unwrap();

        toast({
          title: 'Information',
          description: 'Selamat dating di KiSeratus!',
          status: 'success',
          position: "top-right"
        });
      } catch (err) {
        toast({
          title: 'Information',
          description: err.message,
          status: 'error',
          position: "top-right"
        });
      }
    },
    [dispatch, toast]
  );

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>

          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </FormControl>
                  <Stack spacing={6}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={'blue.500'}>Forgot password?</Link>
                    </Stack>
                    <Button
                      type="submit"
                      colorScheme={'blue'}
                      variant={'solid'}
                      disabled={isSubmitting}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </VStack>
              </form>
            )}
          </Formik>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}
