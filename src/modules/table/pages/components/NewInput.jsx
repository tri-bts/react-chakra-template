import { Input } from '@chakra-ui/react';

const NewInputColumn = ({ index, newColumnTitle }) => {
  const handleChange = value => {
    newColumnTitle[index] = value;
  };

  return (
    <Input placeholder={`New Header ${index + 1}`} onChange={e => handleChange(e.target.value)} />
  );
};

export { NewInputColumn };
