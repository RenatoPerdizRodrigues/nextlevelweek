import React, { useState } from 'react';
import './App.css';

import Header from './Header';
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

function App() {

  var [counter, setCounter] = useState(0);

  function handleButtonClick(){
    setCounter(counter+1);
  }

  return (
      <Home />
  );
}

export default App;