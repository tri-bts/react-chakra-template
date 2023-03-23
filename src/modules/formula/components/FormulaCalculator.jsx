import { Box, Flex, Select, Spacer, Button, Text, Input } from '@chakra-ui/react';
import BaseCalculator from '@/modules/app/components/base/BaseCalculator';
import BaseDialog from '@/modules/app/components/base/BaseDialog';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const FormulaCalculator = ({ isOpen, onClose, onSubmit, formula = '', label = '' }) => {
  const [result, setResult] = useState({
    label: label,
    formula: formula,
  });
  const [item, setItem] = useState('');
  const formUniq = useSelector(({ formUnique }) => formUnique.formUnique_data);

  /**
   * @description method to add data from form unique to formula
   */
  const inputToFormula = () => {
    setResult(prevResult => ({ ...prevResult, formula: `${prevResult.formula}${item}` }));
    setItem('');
  };

  /**
   * @description method to close dialog calculator and sync value
   */
  const closeDialog = () => {
    setResult(prevResult => ({ ...prevResult, formula: formula }));
    onClose();
  };

  /**
   * @description method to submit formula
   */
  const submitResultFormula = () => {
    onSubmit(result);
    onClose();
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={() => closeDialog()}>
      <Box py={10}>
        <Box mb={4}>
          <Text>Label</Text>
          <Input
            placeholder="Input label"
            value={result.label}
            onChange={event =>
              setResult(prevResult => ({ ...prevResult, label: event.target.value }))
            }
          />
        </Box>
        <Box>
          <Text>Data</Text>
          <Flex>
            <Box w="80%">
              <Select
                placeholder="Select data"
                value={item}
                onChange={event => setItem(event.target.value)}>
                {formUniq.map((form, index) => {
                  return (
                    <option value={form?.label} key={index}>
                      {form?.label}
                    </option>
                  );
                })}
              </Select>
            </Box>
            <Spacer />
            <Button isDisabled={!item} colorScheme="green" onClick={inputToFormula}>
              Input
            </Button>
          </Flex>
        </Box>

        <Box mt={6}>
          <Input placeholder="Input label" mb={1} value={result.formula} readOnly />
          <BaseCalculator
            value={result.formula}
            onChange={value => setResult(prevResult => ({ ...prevResult, formula: `${value}` }))}
          />
        </Box>
      </Box>
      <Flex justify="end" gap={2}>
        <Button variant="outline" colorScheme="blue" onClick={() => closeDialog()}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={submitResultFormula}>
          Save
        </Button>
      </Flex>
    </BaseDialog>
  );
};

export default FormulaCalculator;
