import { createBrowserRouter } from 'react-router-dom';

const loadRoutes = () => {
  const context = require.context('@/modules', true, /router.jsx$/i);
  return context
    .keys()
    .map(context)
    .map(m => m.default);
};

const routes = [];
loadRoutes().forEach(route => routes.push(...route));

const router = createBrowserRouter(routes);

export default router;
