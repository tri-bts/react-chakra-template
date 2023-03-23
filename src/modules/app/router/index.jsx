import ProtectedRoute from '../hoc/ProtectedRoute';
import DefaultLayout from '../layout/DefaultLayout';
import LoginScreen from '../../auth/pages/LoginScreen';
import DashboardScreen from '../../dashboard/pages/DashboardScreen';
import FormAdvanceScreen from '@/modules/form-advance/pages/FormAdvanceScreen';
import FormUniqueScreen from '@/modules/form-unique/pages/FormUniqueScreen';
import InformationScreen from '@/modules/information/pages/InformationScreen';
import NotFoundScreen from '@/modules/not-found/pages/NotFoundScreen';
import FamilyScreen from '@/modules/family-tree/pages/FamilyScreen';
import EventScreen from '@/modules/event/pages/EventScreen';
import TableScreen from '@/modules/table/pages/TableScreen';

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
      { path: '/family-tree', element: <FamilyScreen isEdit={false} /> },
      { path: '/family-tree/edit', index: false, element: <FamilyScreen isEdit={true} /> },
      { path: '/event', element: <EventScreen /> },
      { path: '/table', element: <TableScreen /> },

      /**
       * 404 Page not found
       */
      {
        path: '*',
        element: <NotFoundScreen />,
      },
    ],
  },
];

export default routes;
