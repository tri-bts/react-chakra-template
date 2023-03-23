import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
  List,
  ListItem,
  ListIcon,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Input,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label('title'),
});

import { FiHash, FiCalendar } from 'react-icons/fi';
import { formatDate } from '@fullcalendar/core';

function EventDetail({ isOpen, onClose, event, removeEvent }) {
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setIsEdit(false);
  }, [event]);

  const [isEdit, setIsEdit] = useState(false);

  const onEditEvent = () => {
    setIsEdit(!isEdit);
  };
  const onUpdateEvent = values => {
    event.setDates(values.start, values.end);
    handleClose();
  };

  let startStr = formatDate(event.start, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'local',
    locale: 'id',
  });
  let endStr = formatDate(event.end, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'local',
    locale: 'id',
  });

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Event Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {!isEdit && (
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FiHash} color="green.500" />
                {event.title}
              </ListItem>
              <ListItem>
                <ListIcon as={FiCalendar} color="green.500" />
                {startStr} {event.end && `- ${endStr}`}
              </ListItem>
            </List>
          )}
          {isEdit && (
            <Formik
              initialValues={{ title: event.title }}
              validationSchema={validationSchema}
              onSubmit={onUpdateEvent}>
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
                        Update
                      </Button>
                    </Stack>
                  </VStack>
                </form>
              )}
            </Formik>
          )}
        </ModalBody>
        {!isEdit && (
          <ModalFooter>
            <Button colorScheme="telegram" mr={3} onClick={onEditEvent}>
              Edit
            </Button>
            <Button color="red" mr={3} onClick={removeEvent}>
              Remove
            </Button>
          </ModalFooter>
        )}
        {isEdit && (
          <ModalFooter>
            <Button color="orange" mr={3} onClick={onEditEvent}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EventDetail;
