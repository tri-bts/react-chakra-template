import { InputGroup, Input, InputRightAddon } from '@chakra-ui/react';
import { BiCalculator } from 'react-icons/bi';
import { useState } from 'react';
import FormulaCalculator from '../components/FormulaCalculator';

const FormulaScreen = () => {
  const [dialog, setDialog] = useState(false);
  const [input, setInput] = useState('');
  const openCalculator = () => setDialog(true);
  const closeCalculator = () => setDialog(false);

  const handleSubmit = value => setInput(value);

  return (
    <>
      <FormulaCalculator
        isOpen={dialog}
        onClose={closeCalculator}
        onSubmit={handleSubmit}
        value={input}
      />
      <InputGroup>
        <Input value={input} onChange={event => setInput(event.target.value)} readOnly />
        <InputRightAddon onClick={openCalculator}>
          <BiCalculator onClick={closeCalculator} />
        </InputRightAddon>
      </InputGroup>
    </>
  );
};

export default FormulaScreen;
