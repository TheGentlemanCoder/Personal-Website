import React from 'react';
import './App.css';

function App() {
  const [text, setText] = React.useState('');
  const [lines, setLines] = React.useState([]);

  function checkNewline(e) {
      if (e.key === 'Enter') {
        lines.push(text); // add another line
        setLines(lines);
        setText(''); // clear next line
      }
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black text-left text-primary">
        <PreviousLines lines={lines}/>
        <span>$ </span>
        <input autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" value={text} onChange={(e) => setText(e.target.value)} onKeyPress={(e) => checkNewline(e)} style={{width: `${text.length === 0 ? 1 : text.length}ch`}} type="text" className="bg-black m-0 border-0 terminal-input"></input>
        <span className="animate-ping rounded-full text-primary">&#x0008;</span>
    </div>
  );
}

function PreviousLines(props) {
    return (
        <div>
            {props.lines.map((line, index) => <Line text={line} key={index}/>)}
        </div>
    );
}

function Line(props) {
    return (
        <div className="left-0 w-screen text-left bg-black text-primary">
            <span>$ </span>
            <span style={{width: `${props.text.length}ch`}} className="m-0 border-0 terminal-input">{props.text}</span>
        </div>
    );
}

export default App;
