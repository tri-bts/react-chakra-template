import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalBody,
  ModalCloseButton,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label('title'),
});

function EventInput({ isOpen, onClose, onAddEvent }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={3}>
            <Formik
              initialValues={{ title: '' }}
              validationSchema={validationSchema}
              onSubmit={onAddEvent}>
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
                    <FormControl id="title" isInvalid={!!errors.title && touched.title}>
                      <FormLabel>Title</FormLabel>
                      <Input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                      <FormErrorMessage>{errors.title}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="start" isInvalid={!!errors.start && touched.start}>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        type="datetime-local"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.start}
                      />
                      <FormErrorMessage>{errors.start}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="end" isInvalid={!!errors.End && touched.End}>
                      <FormLabel>End Date</FormLabel>
                      <Input
                        type="datetime-local"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.End}
                      />
                      <FormErrorMessage>{errors.End}</FormErrorMessage>
                    </FormControl>
                    <Stack spacing={6}>
                      <Button type="submit" disabled={isSubmitting} colorScheme="telegram" mr={3}>
                        Add
                      </Button>
                    </Stack>
                  </VStack>
                </form>
              )}
            </Formik>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EventInput;
