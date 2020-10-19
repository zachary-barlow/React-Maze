import React from 'react';

import './styles/canvas.css';

function Cell({ cell }) {

  return (
    <div className="cell" 
    style={{
      borderTop: cell.top ? '1px solid white' : '1px solid black',
      borderRight: cell.right ? '1px solid white' : '1px solid black',
      borderBottom: cell.bottom ? '1px solid white' : '1px solid black',
      borderLeft: cell.left ? '1px solid white' : '1px solid black',
      backgroundColor: cell.current ? 'red' : cell.visited ? 'black' : 'grey'
    }}>
    </div>
  );
}

export default Cell;