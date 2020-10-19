import React, { useEffect, useState } from 'react';

import Cell from './Cell';
import './styles/canvas.css';

function Canvas({ rows, cols, width }) {
  const [cells, setCells] = useState([]);
  const [display, setDisplay] = useState(false); // change to true onces the alg is done

  useEffect(() => {
    setCells(create_cells());
  }, []);

  const create_cells = () => {
    /*
      This function creates the cells with all their walls set to true
      to have their wall up
    */
    let cells_arr = [];
    for(let i = 0; i < rows; i++) {
      for(let j = 0; j < cols; j++) {
        let cell = {
          "top": true,
          "right": true,
          "bottom": true,
          "left": true,
          "visited": false,
          "row": i,
          "col": j,
          "current": false
        }
        cells_arr = [...cells_arr, cell];
      }
    }
    return cells_arr;
  }
  
  const show = () => {
    recursiveImp();
    setDisplay(true);
  }

  const change = (cell, ind) => {
    let f = cells.slice(0, ind);
    f = f.concat(cell);
    let e = f.concat(cells.slice(ind + 1, cells.length));
    return e;
  }
  const animation = () => {
    /* 
      This function creates the maze in a animated way, updating the state causing a re-render 
      of each cell
    */
   
    // set up the current cell and visited nodes
    let c = cells;
    let current = c[0];
    current.visited = true;
    current.current = true;
    let vis_nodes = [current];

    function myLoop() {
      setTimeout(function() {
        let next = neighbours(current); // get the next node and check if its not defined
        if (typeof next !== "undefined") {
          let ind = index(next.row, next.col);

          vis_nodes.push(current); // pushes to stack to make sure all cells are visited
          removeWalls(current, next); // removes the walls between cells
          next.visited = true;
          next.current = true;

          // make current cell no longer the current one
          current.current = false;
          current = next;
          
          let e = change(current, ind); // change cells array to force a render of the new cells causing the animation
          setCells(e);
        } else {
          current.current = false; // make the current array no longer current because there are no more unvisited nodes around
          current = vis_nodes.pop(); // pop from array and make last visited cell the current

          let ind = index(current.row, current.col); // get the index of the current cell
          current.current = true;

          let e = change(current, ind);  // change cells array to force a render of the new cells causing the animation
          setCells(e);
        }
        if (vis_nodes.length > 0) myLoop();   //  decrement i and call myLoop again if i > 0
      }, 20)
    }
    myLoop();
    setDisplay(true); // display the canvas
  }

  const index = (row, col) => {
    /*
      This function takes in the row and col index of the specific 
      cell and then returns the index of the next

      (0,1) => 1
    */
    if (row < 0 || col < 0 || row > rows - 1 || col > cols - 1) {
      return -1;
    }

    let index = (row * cols) + col;
    return index;
  }

  const recursiveImp = () => {
    /*
      This function creates the maze in a non-animated way
    */
    let c = cells;
    let current = c[0];
    current.visited = true;

    let vis_nodes = [current];
    while (vis_nodes.length > 0) {
      let next = neighbours(current);
      if (typeof next !== "undefined") {
        vis_nodes.push(current);
        removeWalls(current, next);
        next.visited = true;
        current = next;
      } else {
        current = vis_nodes.pop();
      }
    }
    

  }

  const neighbours = (cell) => {
    /*
      This function takes in the cell as an argument and then
      finds its neighbours if they are defined and have not
      already been visited
    */
    let nb = []

    let top = cells[index(cell.row - 1, cell.col)]; // (0,1) -> (-1,1) -> -1
    let right = cells[index(cell.row, cell.col + 1)]; // (0,1) -> (0,2) -> 2
    let bot = cells[index(cell.row + 1, cell.col)]; // (0,1) -> (1,0) -> 20
    let left = cells[index(cell.row, cell.col - 1)]; // (0,1) -> (0,0) -> 0

    if (typeof top !== "undefined" && !top.visited) {
      nb.push(top);
    }
    if (typeof right !== "undefined" && !right.visited) {
      nb.push(right);
    }
    if (typeof bot !== "undefined" && !bot.visited) {
      nb.push(bot);
    }
    if (typeof left !== "undefined" && !left.visited) {
      nb.push(left);
    }
    if (nb.length > 0) {
      let rn = Math.round(Math.random() * (nb.length - 1));
      return nb[rn];
    } else {
      return undefined;
    }
  }

  const removeWalls = (current, next) => {
    /*
      This function takes in the current cell and next cell
      and checks which changed and then removes the wall
      between them
    */
    if (current.col > next.col) {
      current.left = false;
      next.right = false;
    } else if (current.col < next.col) {
      current.right = false;
      next.left = false;
    } else if (current.row < next.row) {
      current.bottom = false;
      next.top = false;
    } else if (current.row > next.row) {
      current.top = false;
      next.bottom = false;
    } else {
      console.log("none");
    }
  }

  return (
    <div>
      { display && 
        <div className="canvas" style={{'width': width}}>
          {cells.map((cell,id) => (
            <Cell key={id} cell={cell}/>
          ))}
        </div>
      }
      {!display && 
      <div>
        <button onClick={() => show()}>Show Maze</button>
        <button onClick={() => animation()}>Animation</button>
      </div>
      }
    </div>

  );
}

export default Canvas;