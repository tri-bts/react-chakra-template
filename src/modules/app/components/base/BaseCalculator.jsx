import { useEffect } from 'react';
import { Grid, GridItem, Button } from '@chakra-ui/react';

const BaseCalculator = ({ value, onChange }) => {
  useEffect(() => {
    window.addEventListener('keypress', physicButtonPress);

    return () => window.removeEventListener('keypress', physicButtonPress);
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
    if (char === '=') return;

    return onChange(`${value}${char}`);
  };

  return (
    <Grid templateColumns="repeat(4, auto)" gap="1">
      {buttons.map((button, index) => {
        return (
          <GridItem
            bg={button.bgColor}
            colSpan={button.colspan ?? 1}
            key={index}
            onClick={() => {
              handlePress(button.label);
            }}>
            <Button variant="ghost" color="#ffffff" w="100%" _hover={{ bg: 'transparent' }}>
              {button.label}
            </Button>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default BaseCalculator;
