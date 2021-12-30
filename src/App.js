import React from 'react';
import './App.css';
import whoami from './whoami.js';

function App() {
    const [text, setText] = React.useState('');
    const [lines, setLines] = React.useState([]);
    const [commandHistory, setCommandHistory] = React.useState([]);
    const [commandHistoryPointer, setCommandHistoryPointer] = React.useState(0);
    const [displayingPhoto, setDisplayingPhoto] = React.useState(false);

    function checkKeystroke(e) {
        if (e.key === 'Enter') {
            lines.push([text, true]); // add another line (true means to display caret)
            setLines(lines);

            commandHistory.push(text); // save command
            setCommandHistoryPointer(commandHistory.length); // point to empty prompt
            setCommandHistory(commandHistory);
            
            checkCommand(text); // see if the user has entered a valid command
            setText(''); // clear next line
        }
    }

    function checkArrowKey(e) {
        if (e.key === "ArrowUp") {
            if (commandHistory.length > 0 && commandHistoryPointer > 0) {
                // scroll to previous command
                setCommandHistoryPointer(commandHistoryPointer - 1);
                setText(commandHistory[commandHistoryPointer - 1]);
            }
        } else if (e.key === "ArrowDown") {
            if (commandHistoryPointer == commandHistory.length - 1) {
                // bring back a blank prompt
                setCommandHistoryPointer(commandHistoryPointer + 1);
                setText('');
            } else if (commandHistoryPointer < commandHistory.length - 1) {
                // scroll to following command
                setCommandHistoryPointer(commandHistoryPointer + 1);
                setText(commandHistory[commandHistoryPointer + 1]);
            }
        }
    }

    function checkCommand(command) {
        switch(command) {
            case "exit":
                window.location.href = "https://www.youtube.com/watch?v=a3Z7zEc7AXQ"; // hehe
                break;
            case "clear":
                setLines([]); // clear the screen
                setCommandHistory([]); // clear command history
                setDisplayingPhoto(false);
                break;
            case "help":
            case "?":
                lines.push(["help (?)     Display this list of available commands", false]);
                lines.push(["clear        Clear the screen and command history", false]);
                lines.push(["exit         Leave the terminal and go... somewhere else", false]);
                lines.push(["git          Redirects the user to the author's GitHub"]);
                lines.push(["whoami       Display general information about the author", false]);
                setDisplayingPhoto(false);
                break;
            case "git":
                window.location.href = "https://github.com/TheGentlemanCoder"; // redirect user to GitHub
                break;
            case "whoami":
                console.log(whoami);
                whoami.map(line => lines.push(line)); // output prepared bio
                setDisplayingPhoto(true);
                break;
            default:
                lines.push(["Unrecognized command: \"" + text + "\".", false]); // false means to display caret
                lines.push(["Try \"help\" or \"?\" for available options.", false]);
                setLines(lines);
                setDisplayingPhoto(false);
                break;
        }
    }

    if (displayingPhoto) {
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-black text-left text-primary">
                <img src="/whoami.jpg" className="object-cover absolute w-1/2 top-0 right-0 transition-opacity duration-1000 opacity-0 hover:opacity-100 ease-out"></img>
                <PreviousLines lines={lines}/>
                <span>$ </span>
                <input autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" 
                       value={text} onChange={(e) => setText(e.target.value)} onKeyPress={(e) => checkKeystroke(e)}
                       onKeyDown={(e) => checkArrowKey(e)} style={{width: `${text.length === 0 ? 1 : text.length}ch`}}
                       type="text" className="bg-black m-0 border-0 terminal-input"></input>
                <span className="animate-ping rounded-full text-primary">&#x0008;</span>
            </div>
        );
    } else {
        // displayingPhoto == false
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-black text-left text-primary">
                <PreviousLines lines={lines}/>
                <span>$ </span>
                <input autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" 
                       value={text} onChange={(e) => setText(e.target.value)} onKeyPress={(e) => checkKeystroke(e)}
                       onKeyDown={(e) => checkArrowKey(e)} style={{width: `${text.length === 0 ? 1 : text.length}ch`}}
                       type="text" className="bg-black m-0 border-0 terminal-input"></input>
                <span className="animate-ping rounded-full text-primary">&#x0008;</span>
            </div>
        );
    }
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
        <div className="left-0 w-screen text-left bg-black text-primary whitespace-pre">
            <span>{props.text[1] ? "$ " : "  "}</span>
            <span style={{width: `${props.text[0].length}ch`}} className="m-0 border-0 terminal-input whitespace-pre">{props.text[0]}</span>
        </div>
    );
}

export default App;
