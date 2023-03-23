import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from '@chakra-ui/react';
import { NewInputColumn } from './NewInput';

const MyModal = ({ isOpen, onClose, setData, column, setColumn }) => {
  const totalCurrentColumn = column.length;
  let newColumnTitle = [];
  const [newRow, setNewRow] = useState(0);
  const [newColumn, setNewColumn] = useState(0);
  const [newColumns, setNewColumns] = useState([]);

  const handleSave = () => {
    //Save New Column
    for (let i = 1; i <= newColumn; i++) {
      setColumn(prev => {
        return [
          ...prev,
          {
            Header: `${newColumnTitle[i - 1] ?? `New Header ${i}`}`,
            accessor: `col${totalCurrentColumn + i}`,
          },
        ];
      });
    }

    //Save New Row
    for (let i = 0; i < newRow; i++) {
      setData(prev => {
        return [...prev, { col1: ``, col2: `` }];
      });
    }
    handleClose();
  };

  const handleNewColumn = value => {
    setNewColumn(value);
    let new_Columns = [];
    for (let i = 0; i < value; i++) {
      new_Columns.push(i);
    }
    setNewColumns(new_Columns);
  };

  const handleClose = () => {
    onClose();
    setNewRow(0);
    setNewColumn(0);
    setNewColumns([]);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Configuration Table</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Add Row</FormLabel>
            <Input
              placeholder="Add Row"
              type="number"
              value={newRow}
              onChange={e => setNewRow(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Add Column</FormLabel>
            <Input
              placeholder="Add Column"
              type="number"
              value={newColumn}
              onChange={e => handleNewColumn(e.target.value)}
            />
          </FormControl>
          {newColumns.length !== 0 && (
            <HStack sx={{ marginTop: 3 }}>
              {newColumns.map(item => (
                <NewInputColumn key={item} index={item} newColumnTitle={newColumnTitle} />
              ))}
            </HStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="telegram" mr={3} onClick={handleSave}>
            Generate
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
