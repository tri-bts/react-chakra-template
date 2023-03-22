import ProtectedRoute from '../hoc/ProtectedRoute';
import DefaultLayout from '../layout/DefaultLayout';
import LoginScreen from '../../auth/pages/LoginScreen';
import DashboardScreen from '../../dashboard/pages/DashboardScreen';
import FormAdvanceScreen from '@/modules/form-advance/pages/FormAdvanceScreen';
import FamilyRouter from '@/modules/family-tree/router/family.router';

// Lazy load pages

const routes = [
  /**
   * Login
   */
  {
    path: '/auth/login',
    element: <LoginScreen />
  },

  /**
   * Private Pages
   */
  {
    path: '/',
    element: <ProtectedRoute component={<DefaultLayout />} />,
    children: [
      { index: true, element: <DashboardScreen /> },
      { path: '/form-advance', element: <FormAdvanceScreen /> }
    ]
  },

  ...FamilyRouter
];

export default routes;
