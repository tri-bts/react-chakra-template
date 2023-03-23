import { useRoutes } from 'react-router-dom';
import router from '@/modules/app/router/index';

function App() {
  return useRoutes(router);
}

export default App;
