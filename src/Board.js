import Row from "./Row";
import { useState, useEffect } from "react";

function Board() {

  const size = 3;
  const [board, setBoard] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

  useEffect(() => {
    startBoard();
  }, []);

  const startBoard = () => {

    let first = getRandomInt(0, size*size-1);
    let second = getRandomInt(0, size*size-1);
    while(second === first)
      second = getRandomInt(0, 8);
    
    let tempBoard = [...board];
    newBlock(tempBoard, first);
    newBlock(tempBoard, second);
    setBoard(tempBoard);
  }

  const updateBoard = (e) => {
    e.target.value = "";
    
    let tempBoard = [...board];

    if (e.keyCode === 38)
      moveUp(tempBoard);

    else if (e.keyCode === 40)
      moveDown(tempBoard);

    else if (e.keyCode === 39)
      moveRight(tempBoard);

    else if (e.keyCode === 37)
      moveLeft(tempBoard);

    newBlock(tempBoard);
    setBoard(tempBoard);
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const newBlock = (tempBoard, newPosition = getRandomInt(0, size*size-1)) => {
    
    let number = 0;
    let i = 0;
    
    while (i < size)
    {
      let restart = false;

      for (let j = 0; j < size; j++, number++)
      {
        if (number === newPosition)
        {
          if (!(tempBoard[i][j] === 0))
          {
            restart = true;
            break;
          }
          
          else
            tempBoard[i][j] = getRandomInt(0, 1) === 0 ? 2 : 4;
        }
      }

      if (restart)
      {
        i = number = 0;
        newPosition = getRandomInt(0, size*size-1);
        continue;
      }

      i++;
    }
  }

  const moveUp = (tempBoard) => {
    for (let i = 0; i < size; i++)
    {
      shiftUp(tempBoard, i);

      // Add Numbers
      for (let j = 0; j < size - 1; j++)
      {
        if (tempBoard[j][i] === tempBoard[j + 1][i] && tempBoard[j][i] !== 0)
        {
          tempBoard[j][i] += tempBoard[j + 1][i];
          tempBoard[j + 1][i] = 0;
        }
      }

      shiftUp(tempBoard, i);
    }
  }

  const moveDown = (tempBoard) => {
    for (let i = 0; i < size; i++)
    {
      shiftDown(tempBoard, i);
    
      // Add Numbers  
      for (let j = size - 1; j > 0; j--)
      {
        if (tempBoard[j][i] === tempBoard[j - 1][i] && tempBoard[j][i] !== 0)
        {
          tempBoard[j][i] += tempBoard[j - 1][i];
          tempBoard[j - 1][i] = 0;
        }
      }

      shiftDown(tempBoard, i);
    }
  }

  const moveRight = (tempBoard) => {
    for (let j = 0; j < size; j++)
    {
      shiftRight(tempBoard, j);
      
      // Add Numbers
      for (let i = size - 1; i > 0; i--)
      {
        if (tempBoard[j][i] === tempBoard[j][i - 1] && tempBoard[j][i] !== 0)
        {
          tempBoard[j][i] += tempBoard[j][i - 1];
          tempBoard[j][i - 1] = 0;
        }
      }

      shiftRight(tempBoard, j);
    }
  }
  
  const moveLeft = (tempBoard) => {
    for (let j = 0; j < size; j++)
    {
      shiftLeft(tempBoard, j);
      
      // Add Numbers
      for (let i = 0; i < size - 1; i++)
      {
        if (tempBoard[j][i] === tempBoard[j][i + 1] && tempBoard[j][i] !== 0)
        {
          tempBoard[j][i] += tempBoard[j][i + 1];
          tempBoard[j][i + 1] = 0;
        }
      }
      
      shiftLeft(tempBoard, j);
    }
  }
    
  const shiftUp = (tempBoard, i) => {
    for (let j = 0, index = 0; j < size; j++)
      if (tempBoard[j][i] > 0)
        shiftDU(tempBoard, i, j, index++);
  }

  const shiftDown = (tempBoard, i) => {
    for (let j = size - 1, index = size - 1; j >= 0; j--)
      if (tempBoard[j][i] > 0)
        shiftDU(tempBoard, i, j, index--);
  }

  const shiftRight = (tempBoard, j) => {
    for (let i = size - 1, index = size - 1; i >= 0; i--)
      if (tempBoard[j][i] > 0)
        shiftLR(tempBoard, i, j, index--);
  }

  const shiftLeft = (tempBoard, j) => {
    for (let i = 0, index = 0; i < size; i++)
      if (tempBoard[j][i] > 0)
        shiftLR(tempBoard, i, j, index++);
  }

  const shiftDU = (tempBoard, i, j, index) => {
    if (index !== j)
    {
      tempBoard[index][i] = tempBoard[j][i];
      tempBoard[j][i] = 0;  
    }
  }

  const shiftLR = (tempBoard, i, j, index) => {
    if (index !== i)
    {
      tempBoard[j][index] = tempBoard[j][i];
      tempBoard[j][i] = 0;  
    }
  }


  return (
    <div className="container w-25 mt-5">
      <Row row = {0} board = {board} />
      <Row row = {1} board = {board} />
      <Row row = {2} board = {board} />
      <input type="text" className="row mt-5 text-center" autoFocus={true} onKeyDown={updateBoard} />
    </div>
  );
}

export default Board;