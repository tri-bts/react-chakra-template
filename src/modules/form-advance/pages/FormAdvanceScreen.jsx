import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import styles from './FormAdvanceScreen.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { formAdvance_setForm } from '@/modules/form-advance/slice/formAdvance.slice';
import { useFormik } from 'formik';
import useOnline from '@/modules/form-advance/hooks/checkOnline';
import { getBase64 } from '@/modules/app/utils';
import useIdle from '@/modules/form-advance/hooks/idleTimer';

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

  // Check idle
  useEffect(() => {
    if (isIdle) {
      onSave(formik.values);
    }
  }, [isIdle, formik.values, onSave]);

  const onChangePhoto = useCallback(async event => {
    const img = await getBase64(event);
    setPhoto(img);
  }, []);

  return (
    <div className={styles.container}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Form Canggih</Heading>

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

              <FormControl isInvalid={!!formik.errors.age && formik.touched.age} id="age">
                <FormLabel>Usia</FormLabel>
                <Input
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                />
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

              <FormControl
                isInvalid={!!formik.errors.address && formik.touched.address}
                id="address">
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
                <Textarea
                  placeholder="Ringkasan Kehidupan"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.summaryLife}
                />
                <FormErrorMessage>{formik.errors.summaryLife}</FormErrorMessage>
              </FormControl>

              {(persistValues.photo || photo) && (
                <div>
                  <img src={persistValues.photo || photo} alt="photo" />
                </div>
              )}

              <input type="file" id="photo" onChange={onChangePhoto} />

              <Button type="submit" colorScheme={'blue'} variant={'solid'}>
                Simpan
              </Button>
            </VStack>
          </form>
        </Stack>
      </Flex>
    </div>
  );
};

export default FormAdvanceScreen;
