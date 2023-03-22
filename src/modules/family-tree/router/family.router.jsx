import ProtectedRoute from '@/modules/app/hoc/ProtectedRoute';
import DefaultLayout from '@/modules//app/layout/DefaultLayout';
import FamilyScreen from '../pages/FamilyScreen';

const router = [
  {
    path: '/family-tree',
    element: <ProtectedRoute component={<DefaultLayout />} />,
    children: [
      { index: true, element: <FamilyScreen isEdit={false} /> },
      { path: 'edit', index: false, element: <FamilyScreen isEdit={true} /> },
    ],
  },
];

export default router;
