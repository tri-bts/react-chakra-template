import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';

const PermissionRoute = ({ children, access }) => {
  const roles = useSelector(({ auth }) => auth.auth_roles);
  const navigate = useNavigate();

  const handleBackToDashboard = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (!roles.includes(access)) {
    return (
      <VStack p={8} flex={1} align="center" justify="center" borderRadius="lg">
        <div style={{ marginBottom: '16px' }}>
          Maaf, anda tidak mempunyai izin membuka halaman ini
        </div>
        <Button
          type="submit"
          colorScheme={'blue'}
          variant={'solid'}
          onClick={handleBackToDashboard}>
          Kembali ke halaman awal
        </Button>
      </VStack>
    );
  }

  return children;
};

PermissionRoute.propTypes = {
  children: PropTypes.node.isRequired,
  access: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default memo(PermissionRoute);
