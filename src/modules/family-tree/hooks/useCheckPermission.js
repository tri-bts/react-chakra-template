import { useSelector } from 'react-redux';

const useCheckPermission = (targetPermission = ['EDIT_TREE']) => {
  const auth_permissions = useSelector(state => state.auth.auth_permissions);
  return auth_permissions.some(permission => targetPermission.includes(permission));
};

export default useCheckPermission;
