import { Flex, Button, Box, useColorMode, useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import styles from '../style/formulaStyle.module.scss';
import FormulaCalculator from '@/modules/formula/components/FormulaCalculator';
import { useDispatch, useSelector } from 'react-redux';
import { formula_save } from '@/modules/formula/redux/formula.thunk';
import FormulaInput from '@/modules/formula/components/FormulaInput';

const FormulaScreen = () => {
  // const [input, setInput] = useState('');
  const [dialog, setDialog] = useState(false);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const formulas = useSelector(({ formula }) => formula.formula_data);
  const toast = useToast();

  const submitFormula = useCallback(
    async value => {
      try {
        await dispatch(formula_save(value)).unwrap();
        toast({
          title: 'Information',
          description: 'Berhasil menambahkan formula',
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
        isOpen={dialog}
        onClose={() => setDialog(false)}
        onSubmit={submitFormula}
      />

      <Box bg={colorMode === 'light' ? 'white' : 'gray.700'} className={styles.container}>
        <Flex justify="end" mb={10}>
          <Button colorScheme="green" variant="solid" onClick={() => setDialog(true)}>
            Add Formula
          </Button>
        </Flex>

        {formulas.map((formula, index) => {
          return (
            <Box key={index} my={2}>
              <FormulaInput label={formula.label} formula={formula.formula} />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default FormulaScreen;
