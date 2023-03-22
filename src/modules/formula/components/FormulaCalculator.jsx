import { Box, Flex, Select, Spacer, Button } from '@chakra-ui/react';
import BaseCalculator from '@/modules/app/components/base/BaseCalculator';
import BaseDialog from '@/modules/app/components/base/BaseDialog';
import { useState } from 'react';

const FormulaCalculator = ({ isOpen, onClose, onSubmit, value }) => {
  const [item, setItem] = useState('');
  const [calculator, setCalculator] = useState('');

  const handleSubmit = () => {
    setCalculator(prevState => `${prevState}[${item}]`);
    setItem('');
  };

  const handleClose = () => {
    console.log(value);
    setCalculator(value);
    onClose();
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={() => handleClose()}>
      <Box py={10}>
        <Flex>
          <Box w="80%">
            <Select
              placeholder="Select option"
              value={item}
              onChange={event => setItem(event.target.value)}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
          <Spacer />
          <Button onClick={handleSubmit}>Input</Button>
        </Flex>
        <BaseCalculator value={calculator} onChange={value => setCalculator(value)} />
      </Box>
      <Flex justify="end" gap={2}>
        <Button variant="outline" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button onClick={() => onSubmit(calculator)}>Save</Button>
      </Flex>
    </BaseDialog>
  );
};

export default FormulaCalculator;
