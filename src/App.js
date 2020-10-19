import React, {useState} from 'react';
import './App.css';

import Canvas from './Components/Canvas';

function App() {
  
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(30);

  return (
    <div className="App">
      <Canvas rows={rows} cols={cols} width={rows*25 + rows*2}/>
    </div>
  );
}

export default App;
