import BaseNavbar from '../components/base/BaseNavbar';
import BaseSidebar from '../components/base/BaseSidebar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <>
      <main>
        <BaseSidebar>
          <BaseNavbar />
          <Outlet />
        </BaseSidebar>
      </main>
    </>
  );
};

export default AppLayout;
