import PermissionRoute from '@/modules/app/hoc/PermissionRoute';

export function routeAppendPermission(router = []) {
  return router.reduce((acc, route) => {
    if (route.children && route.children.length) {
      const children = routeAppendPermission(route.children);
      acc.push({ ...route, children });
    } else if (route.access && route.access.length) {
      acc.push({
        ...route,
        element: <PermissionRoute access={route.access}>{route.element}</PermissionRoute>,
      });
    } else {
      acc.push(route);
    }

    return acc;
  }, []);
}
