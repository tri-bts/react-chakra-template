import { useMemo, useState } from 'react';
import './TableScreen.css';
import { Button, useDisclosure, Heading } from '@chakra-ui/react';
import MyModal from './components/Modal';
import Table from './components/Table';

const TableScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dataa = useMemo(
    () => [
      {
        col1: 'Adi',
        col2: 'Nugraha',
      },
      {
        col1: 'Chaka',
        col2: 'Rancaka',
      },
      {
        col1: 'Rudi',
        col2: 'Gunawan',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Nama Depan',
        accessor: 'col1',
      },
      {
        Header: 'Nama Belakang',
        accessor: 'col2',
      },
    ],
    []
  );

  const [data, setData] = useState(dataa);
  const [column, setColumn] = useState(columns);

  const updateMyData = (rowIndex, columnId, value) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <div className="container">
      <div className="configuration">
        <div className="header">
          <Heading size="md">Table 4.0</Heading>
          <Button colorScheme="telegram" size="sm" onClick={onOpen}>
            Add Configuration
          </Button>
        </div>
      </div>
      <div className="table">
        <Table columns={column} data={data} updateMyData={updateMyData} />
      </div>
      {onOpen && (
        <MyModal
          isOpen={isOpen}
          onClose={onClose}
          setData={setData}
          column={column}
          setColumn={setColumn}
          totalCurrentColumn={column.length}
        />
      )}
    </div>
  );
};

export default TableScreen;
