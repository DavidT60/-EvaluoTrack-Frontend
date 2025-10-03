import React, { useState } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import SignUp from './components/SignUp';
import  './index.css';

type View = 'landing' | 'login' | 'signup';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <Login onNavigate={setCurrentView} />;
      case 'signup':
        return <SignUp onNavigate={setCurrentView} />;
      default:
        return <Landing onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="app">
      {renderView()}
    </div>
  );
};

export default App;
