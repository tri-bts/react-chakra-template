import { Modal, ModalContent, ModalOverlay, ModalBody } from '@chakra-ui/react';

const BaseDialog = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BaseDialog;
