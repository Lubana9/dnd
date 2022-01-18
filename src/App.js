import { useState } from 'react';
import './App.css';

function App() {
  const [boards, setBoard] = useState([{ id: 1,  items: [{}]  },
    { id: 2, items: [{ id: 1, content: "" }, { id: 2, content: "" }] }])
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setcurrentItem] = useState(null);
  const dragStartHandler = (e, board, item) => {

    setCurrentBoard(board);
    setcurrentItem(item);

  }
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none"
  }
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none"
  }
  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "item") {
      e.target.style.boxShadow = "0 4px 3px gray"
    }
  }
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoard(boards.map(b => {
      if (b.id === board.id) {
        return board;
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b;
    }))
    e.target.style.boxShadow = "none"
  }
  const dropCardHendler = (e, board) => {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    setBoard(boards.map(b => {
      if (b.id === board.id) {
        return board;
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b;
    }))
    e.target.style.boxShadow = "none"
  }
  return (
    <div className='DragAnd-drop'>
      {boards.map(board => <div
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropCardHendler(e,board)}
        key={board.id} className='board'>
        {board.items.map(item => <div key={item.id}
          draggable={true}
          onDragOver={(e) => dragOverHandler(e)  }
          onDragStart={(e) => dragStartHandler(e, board, item)}
          onDrop={(e) => dropHandler(e,board, item)}
          onDragLeave={(e) => dragLeaveHandler(e)  }
          onDragEnd={(e) => dragEndHandler(e)   }
         
          className={`${item.id === 2 ? "circle" : ""} ${item.id === 1 ? "rec" : ""}`}>
          {item.content} </div>)} </div>)}
    </div>
  );
}

export default App;
