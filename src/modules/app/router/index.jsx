import ProtectedRoute from '../hoc/ProtectedRoute';
import DefaultLayout from '../layout/DefaultLayout';
import LoginScreen from '../../auth/pages/LoginScreen';
import DashboardScreen from '../../dashboard/pages/DashboardScreen';
import FormAdvanceScreen from '@/modules/form-advance/pages/FormAdvanceScreen';
import FormUniqueScreen from '@/modules/form-unique/pages/FormUniqueScreen';
import InformationScreen from '@/modules/information/pages/InformationScreen';

// Lazy load pages

const routes = [
  /**
   * Login
   */
  {
    path: '/auth/login',
    element: <LoginScreen />,
  },

  /**
   * Private Pages
   */
  {
    path: '/',
    element: <ProtectedRoute component={<DefaultLayout />} />,
    children: [
      { index: true, element: <DashboardScreen /> },
      { path: '/form-advance', element: <FormAdvanceScreen /> },
      { path: '/form-unique', element: <FormUniqueScreen /> },
      { path: '/information', element: <InformationScreen /> },
    ],
  },
];

export default routes;
