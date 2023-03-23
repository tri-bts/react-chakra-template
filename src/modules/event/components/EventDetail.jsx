import React from 'react';
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
} from '@chakra-ui/react';
import { FiHash, FiCalendar } from 'react-icons/fi';
import { formatDate } from '@fullcalendar/core';

function EventDetail({ isOpen, onClose, event, removeEvent }) {
  const handleClose = () => {
    onClose();
  };

  let startStr = formatDate(event.start, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    locale: 'id',
  });

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Event Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={FiHash} color="green.500" />
              {event.title} {event.id}
            </ListItem>
            <ListItem>
              <ListIcon as={FiCalendar} color="green.500" />
              {startStr}
            </ListItem>
          </List>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="telegram" mr={3} onClick={removeEvent}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EventDetail;