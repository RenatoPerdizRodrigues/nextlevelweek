import React, { useState } from 'react';
import './App.css';

import Routes from './routes';

function App() {

  var [counter, setCounter] = useState(0);

  function handleButtonClick(){
    setCounter(counter+1);
  }

  return (
      <Routes />
  );
}

export default App;