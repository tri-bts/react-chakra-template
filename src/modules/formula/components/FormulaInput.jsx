import { Input, InputGroup, InputRightAddon, Text } from '@chakra-ui/react';
import { BiCalculator } from 'react-icons/bi';

const FormulaInput = ({ label = '', formula = '' }) => {
  return (
    <>
      <Text mb={2}>{label}</Text>
      <InputGroup>
        <Input value={formula} readOnly />
        <InputRightAddon>
          <BiCalculator />
        </InputRightAddon>
      </InputGroup>
    </>
  );
};

export default FormulaInput;
