import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';

const AppContent: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();

  if (user) {
    return <Dashboard/>;
  }

  return (
    <AuthForm 
      mode={authMode} 
      onToggle={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} 
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent/>
    </AuthProvider>
  );
}

export default App;