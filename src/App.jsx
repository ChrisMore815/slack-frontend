import AppRoutes from './routes'

import "./App.css";
import AuthProvider from './contexts/AuthProvider';
import SocketProvider from './contexts/SocketProvider';

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
