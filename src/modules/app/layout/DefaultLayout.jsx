import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <>
      <div>HEADER</div>
      <div>SIDEBAR</div>
      <Outlet />
    </>
  );
};

export default DefaultLayout;
