import React, { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import {
  Flex,
  Box,
  Badge,
  Input,
  FormControl,
  FormLabel,
  Select,
  Button,
  FormErrorMessage,
  useNumberInput,
  HStack,
  useToast,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  formUnique_doSave,
  formUnique_doDelete,
  formUnique_doEdit,
  formUnique_edit,
  formUnique_reset,
} from '../slice/formUnique.slice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './FormUniqueScreen.module.scss';

const schema = Yup.object().shape({
  type: Yup.string().required().label('Type'),
  label: Yup.string().label('Label'),
  maxLength: Yup.number().label('Jumlah karakter'),
});

const FormUniqueScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [startDate, setStartDate] = useState(new Date());
  const formValues = useSelector(({ formUnique }) => formUnique.formUnique_form);
  const formUniqueData = useSelector(({ formUnique }) => formUnique.formUnique_data);
  const isEdit = useSelector(({ formUnique }) => formUnique.isEdit);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 0,
    min: 0,
    precision: 0,
  });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: values => {
      onSave(values);
      formik.resetForm();
    },
  });

  const onSave = useCallback(
    async values => {
      try {
        await dispatch(formUnique_doSave(values)).unwrap();

        toast({
          title: 'Information',
          description: 'Berhasil menambahkan data',
          status: 'success',
          position: 'top-right',
        });
      } catch (err) {
        toast({
          title: 'Information',
          description: err.message,
          status: 'error',
          position: 'top-right',
        });
      }
    },
    [dispatch, toast]
  );

  const onDelete = useCallback(
    async value => {
      try {
        await dispatch(formUnique_doDelete(value)).unwrap();
        toast({
          title: 'Information',
          description: 'Berhasil menghapus data',
          status: 'success',
          position: 'top-right',
        });
      } catch (err) {
        toast({
          title: 'Information',
          description: err.message,
          status: 'error',
          position: 'top-right',
        });
      }
    },
    [dispatch, toast]
  );

  const onEdit = useCallback(
    async value => {
      try {
        await dispatch(formUnique_doEdit(value)).unwrap();
        toast({
          title: 'Information',
          description: 'Berhasil mengubah data',
          status: 'success',
          position: 'top-right',
        });
      } catch (err) {
        toast({
          title: 'Information',
          description: err.message,
          status: 'error',
          position: 'top-right',
        });
      }
    },
    [dispatch, toast]
  );

  const edit = useCallback(
    async value => {
      try {
        await dispatch(formUnique_edit(value)).unwrap();
      } catch (err) {
        toast({
          title: 'Information',
          description: err.message,
          status: 'error',
          position: 'top-right',
        });
      }
    },
    [dispatch, toast]
  );

  const reset = useCallback(
    async value => {
      try {
        await dispatch(formUnique_reset(value)).unwrap();
      } catch (err) {
        toast({
          title: 'Information',
          description: err.message,
          status: 'error',
          position: 'top-right',
        });
      }
    },
    [dispatch, toast]
  );

  return (
    <div className={styles.container}>
      <Flex flex={1} direction={'column'} h={'full'} gap={4}>
        <Box flexGrow={1} overflow="auto">
          {formUniqueData.map(formField => (
            <Box
              key={formField.label}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              mt={4}>
              {isEdit && formValues.id === formField.id ? (
                <Button
                  mr={2}
                  colorScheme={'gray'}
                  size="xs"
                  variant={'solid'}
                  onClick={() => reset()}>
                  Cancel edit
                </Button>
              ) : (
                <Button colorScheme="orange" size="xs" mr={2} onClick={() => edit(formField)}>
                  Edit
                </Button>
              )}

              <Button colorScheme="pink" size="xs" onClick={() => onDelete(formField.id)}>
                Delete
              </Button>
              {formField.type && (
                <FormControl mt={2}>
                  <FormLabel>{formField.label ? formField.label : 'Label'}</FormLabel>
                  {formField.type === 'text' && <Input type="text" />}
                  {formField.type === 'number' && (
                    <HStack>
                      <Button {...inc}>+</Button>
                      <Input {...input} />
                      <Button {...dec}>-</Button>
                    </HStack>
                  )}
                  {formField.type === 'date' && (
                    <ReactDatePicker
                      portalId={formField.id}
                      showIcon
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      dateFormat="MM/dd/yyyy"
                    />
                  )}
                </FormControl>
              )}
            </Box>
          ))}
        </Box>
        <Box borderWidth="1px" borderRadius="lg" overflow="auto" p={4}>
          <form onSubmit={formik.handleSubmit}>
            <Flex flex={1} gap="20px">
              <Box flexGrow={1}>
                <FormControl isInvalid={!!formik.errors.type && formik.touched.type} id="type">
                  <FormLabel>Type</FormLabel>
                  <Select
                    placeholder="Select option"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}>
                    <option value="text">Text</option>
                    <option value="date">Date</option>
                    <option value="number">Number</option>
                  </Select>
                  <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
                </FormControl>
                {formik.values.type && (
                  <FormControl isInvalid={!!formik.errors.label && formik.touched.label} id="label">
                    <FormLabel>Nama Label</FormLabel>
                    <Input
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.label}
                    />
                    <FormErrorMessage>{formik.errors.label}</FormErrorMessage>
                  </FormControl>
                )}
                {formik.values.type === 'text' && (
                  <FormControl
                    isInvalid={!!formik.errors.maxLength && formik.touched.maxLength}
                    id="maxLength">
                    <FormLabel>Jumlah max karakter</FormLabel>
                    <Input
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.maxLength}
                    />
                    <FormErrorMessage>{formik.errors.maxLength}</FormErrorMessage>
                  </FormControl>
                )}
                {formik.values.type === 'number' && (
                  <FormControl
                    isInvalid={!!formik.errors.dataType && formik.touched.dataType}
                    id="dataType">
                    <FormLabel>Type</FormLabel>
                    <Select
                      placeholder="Select option"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dataType}>
                      <option value="integer">Integer</option>
                      <option value="float">Float</option>
                      <option value="positive">Positive</option>
                      <option value="negative">Negative</option>
                    </Select>
                    <FormErrorMessage>{formik.errors.dataType}</FormErrorMessage>
                  </FormControl>
                )}

                {!isEdit && (
                  <Button type="submit" mt={2} colorScheme={'blue'} variant={'solid'}>
                    Save
                  </Button>
                )}

                {isEdit && (
                  <div>
                    <Button
                      mt={2}
                      mr={2}
                      colorScheme={'blue'}
                      variant={'solid'}
                      onClick={() => onEdit(formik.values)}>
                      Update
                    </Button>
                    <Button mt={2} colorScheme={'gray'} variant={'solid'} onClick={() => reset()}>
                      Cancel
                    </Button>
                  </div>
                )}
              </Box>
              <Box w="40%" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Badge borderRadius="full" px="2">
                  Preview
                </Badge>
                {formik.values.type && (
                  <FormControl mt={2}>
                    <FormLabel>{formik.values.label ? formik.values.label : 'Label'}</FormLabel>
                    {formik.values.type === 'text' && <Input type="text" />}
                    {formik.values.type === 'number' && (
                      <HStack>
                        <Button {...inc}>+</Button>
                        <Input {...input} />
                        <Button {...dec}>-</Button>
                      </HStack>
                    )}
                    {formik.values.type === 'date' && (
                      <ReactDatePicker
                        portalId="preview"
                        showIcon
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                      />
                    )}
                  </FormControl>
                )}
              </Box>
            </Flex>
          </form>
        </Box>
      </Flex>
    </div>
  );
};

export default FormUniqueScreen;
