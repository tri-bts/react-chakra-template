// Guard hoc
import ProtectedRoute from '../hoc/ProtectedRoute';
import { routeAppendPermission } from '@/modules/app/utils/route.util';

// Layout
import DefaultLayout from '../layout/DefaultLayout';

// Screens
import LoginScreen from '../../auth/pages/LoginScreen';
import DashboardScreen from '../../dashboard/pages/DashboardScreen';
import FormAdvanceScreen from '@/modules/form-advance/pages/FormAdvanceScreen';
import FormUniqueScreen from '@/modules/form-unique/pages/FormUniqueScreen';
import InformationScreen from '@/modules/information/pages/InformationScreen';
import NotFoundScreen from '@/modules/not-found/pages/NotFoundScreen';
import FamilyScreen from '@/modules/family-tree/pages/FamilyScreen';
import EventScreen from '@/modules/event/pages/EventScreen';
import TableScreen from '@/modules/table/pages/TableScreen';
import FormulaScreen from '@/modules/formula/pages/FormulaScreen';

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
      { path: '/form-advance', element: <FormAdvanceScreen />, access: 'formAdvance' },
      { path: '/form-unique', element: <FormUniqueScreen />, access: 'formUnique' },
      { path: '/information', element: <InformationScreen />, access: 'graphic' },
      { path: '/family-tree', element: <FamilyScreen isEdit={false} />, access: 'tree' },
      {
        path: '/family-tree/edit',
        index: false,
        element: <FamilyScreen isEdit={true} />,
        access: 'tree',
      },
      { path: '/event', element: <EventScreen />, access: 'event' },
      { path: '/table', element: <TableScreen />, access: 'table' },
      { path: '/formula', element: <FormulaScreen />, access: 'formula' },

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

export default routeAppendPermission(routes);
