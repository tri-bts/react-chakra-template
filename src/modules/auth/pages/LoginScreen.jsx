import React, { useCallback } from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  useToast,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { auth_doLogin } from '../slice/auth.slice';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  password: Yup.string().required().label('Password'),
});

export default function LoginScreen() {
  const dispatch = useDispatch();
  const toast = useToast({
    position: 'top-right',
    title: 'Information',
    isClosable: true,
    duration: 2000,
  });
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async values => {
      try {
        await dispatch(auth_doLogin(values)).unwrap();

        toast({
          description: 'Selamat dating di KiSeratus!',
          status: 'success',
        });

        navigate('/');
      } catch (err) {
        toast({
          description: err.message,
          status: 'error',
        });
      }
    },
    [dispatch, toast, navigate]
  );

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>

          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl id="username" isInvalid={!!errors.username && touched.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                  <FormControl id="password" isInvalid={!!errors.password && touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Stack spacing={6}>
                    <Button
                      type="submit"
                      colorScheme={'blue'}
                      variant={'solid'}
                      disabled={isSubmitting}>
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
