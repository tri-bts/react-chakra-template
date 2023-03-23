import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

function EventInput({ isOpen, onClose }) {
  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {};

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}></ModalBody>
      </ModalContent>
      <ModalFooter>
        <Button colorScheme="telegram" mr={3} onClick={handleSave}>
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default EventInput;
