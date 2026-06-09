const { useState } = React;

const tictactoeItems = [
    { text: '', show: false },
    { text: '', show: false },
    { text: '', show: false },
    { text: '', show: false },
    { text: '', show: false },
    { text: '', show: false },
    { text: '', show: false },
    { text: '', show: false },
    { text: '', show: false },
]

const patterns = [
  [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,4,6], [2,5,8], [3,4,5], [6,7,8]
]

export function Board() {
  const [items, setItems] = useState(tictactoeItems)
  const [letter, setLetter] = useState("X")
  const [canReset, setCanReset] = useState(false)


  const checkWinner = (currentItems) => {
    for (let pattern of patterns) {
      const [a, b, c] = pattern;
      if (
        currentItems[a].text &&
        currentItems[a].text === currentItems[b].text &&
        currentItems[a].text === currentItems[c].text
      ) {
        return currentItems[a].text; // Returns 'X' or 'O'
      }
    }

    const isDraw = currentItems.every(item => item.text !== '');
    if (isDraw) return 'Draw';

    return null;
  };

  const winner = checkWinner(items);

  const handleBtnClick = (id) => {

    if (items[id].text || winner) return;

    setCanReset(true)

    const updatedItems = items.map((item, index) => 
      index === id ? { ...item, text: letter, show: true } : item
    );
    setItems(updatedItems);

    if (!checkWinner(updatedItems)) {
      setLetter(prev => prev === "X" ? "O" : "X");
    }
  }


  const handleReset = () => {
    setLetter("X")
    setItems(tictactoeItems.map(item => ({ ...item })))
    setCanReset(false)
  }


  let statusMessage = `Next Turn: ${letter}`;
  if (winner === 'Draw') {
    statusMessage = "Game is a draw";
  } else if (winner) {
    statusMessage = `Winner: ${winner}`;
  }

  return(
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div id="status" className="status">{statusMessage}</div>
      <div className="btn-container">
        {items.map((item, index)=>(
          <button 
            className="square" 
            onClick={() => handleBtnClick(index)} 
            key={index}
          >
            {item.text}
          </button>
        ))}
      </div>

      <button 
        id="reset"
        className="reset-btn"
        disabled={!canReset} 
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  )
}
lab-tic-tac-toe
