import { Link, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NavLink = ({ label, route }) => {
  const navigate = useNavigate();
  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      onClick={() => navigate(route)}
    >
      {label}
    </Link>
  );
};

export default NavLink;
