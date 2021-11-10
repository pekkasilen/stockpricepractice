import './App.css';
import Tabsheet from './Components/Tabsheet'

import React, {useState} from 'react';
function App() {
  
  const stocksToFollow = ["GOOG","AMZN","AAPL","NFLX","MSFT"];

  return (
    <div>
      <Tabsheet stocksToFollow={stocksToFollow}/>
    </div>
  );
}

export default App;
