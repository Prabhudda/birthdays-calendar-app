import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BirthdayList from './components/BirthdayList';
import Favorites from './components/Favorites';

const App = () => {
  return (
    <Router>
      <div className='container-fluid p-0'>
        <Routes>
          <Route exact path='/' element={<BirthdayList />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
