import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Landing from './components/landing';
import Dashboard from './components/dashboard';
import Background from './components/background';
import PracDash from './components/Prac-dashboard';
import { CssBaseline } from '@material-ui/core';
import Login from './components/Login';
import PracLogin from './components/PracLogin';
import { UserContext } from './components/UserContext';
import { useState } from 'react';
import StackCard from './components/StackList';
import './App.css';

function App() {
  const [user, setUser] = useState('patient');

  return (
    <BrowserRouter>
      <CssBaseline />
      <UserContext.Provider value={user}>
        <div>
          <Navbar />
          <Background />
          <Routes>
            <Route
              path='/'
              element={<Landing user={user} setUser={setUser} />}
            />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/pracdash' element={<PracDash />} />
            <Route path='/login' element={<Login />} />
            <Route path='/praclogin' element={<PracLogin />} />
            <Route path='/stack' element={<StackCard />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
