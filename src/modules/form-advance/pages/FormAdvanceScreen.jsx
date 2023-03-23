import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { formAdvance_setForm } from '@/modules/form-advance/slice/formAdvance.slice';
import { useFormik } from 'formik';
import useOnline from '@/modules/form-advance/hooks/checkOnline';
import { getBase64 } from '@/modules/app/utils';
import useIdle from '@/modules/form-advance/hooks/idleTimer';
import styles from './FormAdvanceScreen.module.scss';

const schema = Yup.object().shape({
  name: Yup.string().required().label('Nama'),
  age: Yup.string().required().label('Usia'),
  maritalStatus: Yup.string().required().label('Status Perkawinan'),
  address: Yup.string().required().label('Alamat'),
  work: Yup.string().required().label('Pekerjaan'),
  summaryLife: Yup.string().required().label('Ringkasan Kehidupan'),
});

const FormAdvanceScreen = () => {
  const dispatch = useDispatch();
  const isOnline = useOnline();
  const isIdle = useIdle();
  const persistValues = useSelector(({ formAdvance }) => formAdvance.formAdvance_form);
  const [photo, setPhoto] = useState(null);
  const photoRef = useRef();

  const toast = useToast({
    position: 'top-right',
    isClosable: true,
    duration: 2000,
    title: 'Informasi',
  });

  const onSave = useCallback(
    (values, isAutomate = true, withToast = true) => {
      dispatch(formAdvance_setForm({ ...values, photo }));
      if (withToast) {
        toast({
          status: 'success',
          description: isAutomate ? 'form telah tersimpan otomatis' : 'form telah tersimpan',
        });
      }
    },
    [dispatch, toast, photo]
  );

  const formik = useFormik({
    initialValues: persistValues,
    validationSchema: schema,
    onSubmit: values => {
      onSave(values, false);
    },
  });

  // Set Photo
  useEffect(() => {
    setPhoto(persistValues.photo);
  }, [persistValues.photo]);

  // Save automatically after 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOnline) {
        onSave(formik.values);
      }
    }, 1000 * 60); // 1 minute

    return () => clearInterval(interval);
  }, [formik.values, onSave, isOnline]);

  // Check if is connectivity back to online will automatically save
  useEffect(() => {
    if (isOnline !== null) {
      if (isOnline) {
        toast({
          status: 'success',
          description: 'Anda sudah online, menyimpan data...',
        });
        onSave(formik.values, false, false);
      } else {
        toast({
          status: 'warning',
          description: 'Anda sedang dalam keadaan offline',
        });
      }
    }
  }, [isOnline, toast, onSave, formik.values]);

  // Check idle and auto save after 15 seconds idel
  useEffect(() => {
    if (isIdle) {
      onSave(formik.values);
    }
  }, [isIdle, formik.values, onSave]);

  const onTriggerPhoto = useCallback(() => {
    photoRef.current.click();
  }, []);

  const onChangePhoto = useCallback(async event => {
    const img = await getBase64(event);
    setPhoto(img);
  }, []);

  return (
    <Flex
      p={8}
      flex={1}
      align="center"
      justify="center"
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg">
      <Stack spacing={4} w="full" maxW="md">
        <Alert status="info">
          <AlertIcon />
          Form ini akan menyimpan data secara otomatis
        </Alert>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={!!formik.errors.name && formik.touched.name} id="name">
              <FormLabel>Nama</FormLabel>
              <Input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>

            <SimpleGrid spacing={4} columns={2}>
              <FormControl isInvalid={!!formik.errors.age && formik.touched.age} id="age">
                <FormLabel>Usia</FormLabel>
                <NumberInput
                  value={formik.values.age}
                  onChange={val => formik.setFieldValue('age', val)}
                  min={1}
                  max={80}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <FormErrorMessage>{formik.errors.age}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!formik.errors.maritalStatus && formik.touched.maritalStatus}
                id="maritalStatus">
                <FormLabel>Status Pernikahan</FormLabel>
                <Select
                  placeholder="Pilih"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.maritalStatus}>
                  <option value="menikah">Menikah</option>
                  <option value="belum_menikah">Belum Menikah</option>
                  <option value="duda">Duda</option>
                  <option value="janda">Janda</option>
                </Select>
                <FormErrorMessage>{formik.errors.maritalStatus}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>

            <FormControl isInvalid={!!formik.errors.address && formik.touched.address} id="address">
              <FormLabel>Alamat</FormLabel>
              <Textarea
                placeholder="Alamat"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.work && formik.touched.work} id="work">
              <FormLabel>Pekerjaan</FormLabel>
              <Input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.work}
              />
              <FormErrorMessage>{formik.errors.work}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!formik.errors.summaryLife && formik.touched.summaryLife}
              id="summaryLife">
              <FormLabel>Ringkasan Hidup</FormLabel>
              <Textarea
                placeholder="Ringkasan Kehidupan"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.summaryLife}
              />
              <FormErrorMessage>{formik.errors.summaryLife}</FormErrorMessage>
            </FormControl>

            <div onClick={onTriggerPhoto} className={styles.photo}>
              {photo ? (
                <img src={photo} alt="photo" />
              ) : (
                <div className={styles.photoThumbnail}>Upload Photo</div>
              )}
            </div>

            <input
              type="file"
              id="photo"
              ref={photoRef}
              onChange={onChangePhoto}
              style={{ display: 'none' }}
            />

            <Button type="submit" colorScheme="blue" variant="solid" isFullWidth>
              Simpan
            </Button>
          </VStack>
        </form>
      </Stack>
    </Flex>
  );
};

export default FormAdvanceScreen;
