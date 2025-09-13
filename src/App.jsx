import AppRoutes from './routes'

import "./App.css";
import AuthProvider from './contexts/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
