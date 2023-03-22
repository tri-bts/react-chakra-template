import BaseNavbar from '../components/base/BaseNavbar';
import BaseSidebar from '../components/base/BaseSidebar';
import { Outlet } from 'react-router-dom';

import { Show } from '@chakra-ui/react';

const AppLayout = () => {
  return (
    <>
      <main>
        <BaseSidebar>
          <Show above="sm">
            <BaseNavbar />
          </Show>
          <Outlet />
        </BaseSidebar>
      </main>
    </>
  );
};

export default AppLayout;
