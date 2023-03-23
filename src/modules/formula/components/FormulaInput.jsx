import { Input, InputGroup, InputRightAddon, Text } from '@chakra-ui/react';
import { BiCalculator } from 'react-icons/bi';
import FormulaCalculator from '@/modules/formula/components/FormulaCalculator';
import { useCallback, useMemo, useState } from 'react';

const FormulaInput = ({ label = '', formula = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const propsMemo = useMemo(() => ({ label, formula }), [formula, label]);

  const onSubmit = useCallback(values => {
    console.log('onSubmit', values);
  }, []);

  return (
    <>
      <FormulaCalculator isOpen={isOpen} {...propsMemo} onSubmit={onSubmit} />

      <Text mb={2}>{label}</Text>
      <InputGroup>
        <Input value={formula} readOnly />
        <InputRightAddon onClick={() => setIsOpen(!isOpen)}>
          <BiCalculator />
        </InputRightAddon>
      </InputGroup>
    </>
  );
};

export default FormulaInput;
