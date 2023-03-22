import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';
import styles from './FormAdvanceScreen.module.scss';

const schema = Yup.object().shape({
  name: Yup.string().required().label('Nama'),
  age: Yup.string().required().label('Usia'),
  maritalStatus: Yup.string().required().label('Status Perkawinan'),
  address: Yup.string().required().label('Alamat'),
  work: Yup.string().required().label('Pekerjaan'),
  summaryLife: Yup.string().required().label('Ringkasan Kehidupan'),
  photo: Yup.string().required().label('Photo'),
});

const formInitialState = {
  name: '',
  age: '',
  maritalStatus: '',
  address: '',
  work: '',
  summaryLife: '',
  photo: '',
};

const FormAdvanceScreen = () => {
  const onSubmit = useCallback(() => {
    console.log('onSubmit');
  }, []);

  return (
    <div className={styles.container}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Form Canggih</Heading>

          <Formik initialValues={formInitialState} validationSchema={schema} onSubmit={onSubmit}>
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <FormLabel>Nama</FormLabel>
                    <Input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.age && touched.age}>
                    <FormLabel>Usia</FormLabel>
                    <NumberInput onChange={handleChange} onBlur={handleBlur} value={values.age}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.age}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.maritalStatus && touched.maritalStatus}>
                    <FormLabel>Status Pernikahan</FormLabel>
                    <Select
                      placeholder="Pilih"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.maritalStatus}>
                      <option value="menikah">Menikah</option>
                      <option value="belum_menikah">Belum Menikah</option>
                      <option value="duda">Duda</option>
                      <option value="janda">Janda</option>
                    </Select>
                    <FormErrorMessage>{errors.maritalStatus}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.address && touched.address}>
                    <Textarea
                      placeholder="Alamat"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    />
                    <FormErrorMessage>{errors.address}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.work && touched.work}>
                    <FormLabel>Pekerjaan</FormLabel>
                    <Input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.work}
                    />
                    <FormErrorMessage>{errors.work}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.summaryLife && touched.summaryLife}>
                    <Textarea
                      placeholder="Ringkasan Kehidupan"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.summaryLife}
                    />
                    <FormErrorMessage>{errors.summaryLife}</FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme={'blue'}
                    variant={'solid'}
                    disabled={isSubmitting}>
                    Simpan
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Stack>
      </Flex>
    </div>
  );
};

export default FormAdvanceScreen;
