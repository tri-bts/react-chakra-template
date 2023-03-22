import { useEffect } from 'react';
import { Grid, GridItem, Button, Box, Text } from '@chakra-ui/react';

const BaseCalculator = ({ value, onChange }) => {
  useEffect(() => {
    window.addEventListener('keypress', physicButtonPress);
    // eslint-disable-next-line
  }, []);

  const buttons = [
    ...[...Array(3).keys()].map(n => ({
      label: String(n + 1),
      bgColor: 'blue.900',
    })),
    {
      label: '+',
      bgColor: 'gray.500',
    },
    ...[...Array(3).keys()].map(n => ({
      label: String(n + 4),
      bgColor: 'blue.900',
    })),
    {
      label: '-',
      bgColor: 'gray.500',
    },
    ...[...Array(3).keys()].map(n => ({
      label: String(n + 7),
      bgColor: 'blue.900',
    })),
    {
      label: '*',
      bgColor: 'gray.500',
    },
    {
      label: '0',
      colspan: 2,
      bgColor: 'blue.900',
    },
    {
      label: '.',
      bgColor: 'blue.900',
    },
    {
      label: '/',
      bgColor: 'gray.500',
    },
    {
      label: 'C',
      colspan: 2,
      bgColor: 'blue.500',
    },
    {
      label: '=',
      colspan: 2,
      bgColor: 'red.500',
    },
  ];

  /**
   * @description method to display number when keyboard pressed
   */
  const physicButtonPress = ({ key }) => {
    if (/[0-9]|\+|\/|\*|-|\./g.test(key)) {
      handlePress(String(key));
    }
  };

  /**
   * @description method to display character by button pressed
   */
  const handlePress = char => {
    if (char.toLowerCase() === 'c') {
      return onChange('');
    }
    if (char === '.' && /\./g.test(value)) return;
    if (char === '=') {
      return onChange(`${calculateValue(value)}`);
    }

    return onChange(prevState => `${prevState}${char}`);
  };

  const calculateValue = data => {
    let result = data;
    result = result.replace(/\[option1]/g, '100');
    return eval(result);
  };
  return (
    <Box w="100%">
      <Box h={12} py={4} display="block" style={{ overflowY: 'hidden', overflowX: 'auto' }}>
        <Text fontSize="xl" align="end">
          {value}
        </Text>
      </Box>
      <Grid templateColumns="repeat(4, auto)" gap="1">
        {buttons.map((button, index) => {
          return (
            <GridItem bg={button.bgColor} colSpan={button.colspan ?? 1} key={index}>
              <Button
                colorScheme="teal"
                variant="ghost"
                style={{ width: '100%' }}
                onClick={() => {
                  handlePress(button.label);
                }}>
                {button.label}
              </Button>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
    // <ReactCalculator />
  );
};

export default BaseCalculator;
