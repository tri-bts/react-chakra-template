import { Input, InputGroup, InputRightAddon, Text, useToast } from '@chakra-ui/react';
import { BiCalculator } from 'react-icons/bi';
import FormulaCalculator from '@/modules/formula/components/FormulaCalculator';
import { useCallback, useMemo, useState } from 'react';
import { formula_edit } from '@/modules/formula/redux/formula.thunk';
import { useDispatch } from 'react-redux';

const FormulaInput = ({ label = '', formula = '', id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const propsMemo = useMemo(() => ({ label, formula }), [formula, label]);

  const onSubmit = useCallback(
    async value => {
      try {
        await dispatch(formula_edit({ ...value, id })).unwrap();
        toast({
          title: 'Information',
          description: 'Berhasil mengubah formula',
          status: 'success',
          position: 'top-right',
        });
      } catch (error) {
        toast({
          title: 'Information',
          description: error.message,
          status: 'error',
          position: 'top-right',
        });
      }
    },
    [dispatch, toast]
  );

  return (
    <>
      <FormulaCalculator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        {...propsMemo}
        onSubmit={onSubmit}
      />

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
