import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="App min-h-screen overflow-y-auto">
      {showDashboard ? (
        <Dashboard />
      ) : (
        <LandingPage onEnterDashboard={() => setShowDashboard(true)} />
      )}
    </div>
  );
}

export default App;
