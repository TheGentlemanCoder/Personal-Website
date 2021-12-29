import React from 'react';
import './App.css';

function App() {
  const [text, setText] = React.useState('');

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black text-left text-primary">
        <span>$ </span>
        <input autoFocus value={text} onChange={(e) => setText(e.target.value)} style={{width: `${text.length == 0 ? 1 : text.length}ch`}} type="text" class="bg-black m-0 border-0 terminal-input"></input>
        <span class="animate-ping rounded-full text-primary">&#x0008;</span>
    </div>
  );
}

export default App;
