import React from 'react';
import './App.css';
import whoami from './whoami.js';
import internships from './internships.js';

function App() {
    const [text, setText] = React.useState('');
    const [lines, setLines] = React.useState([]);
    const [commandHistory, setCommandHistory] = React.useState([]);
    const [commandHistoryPointer, setCommandHistoryPointer] = React.useState(0);
    const [displayingPhoto, setDisplayingPhoto] = React.useState(false);

    function checkKeystroke(e) {
        if (e.key === 'Enter') {
            lines.push(["$ " + text, true]); // add another line (true means to display caret)
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
            if (commandHistoryPointer === commandHistory.length - 1) {
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

    function getFormattedDateDifference(earlierDate, laterDate) {
        let difference_s = parseInt((laterDate - earlierDate) / 1000);

        const difference_days = parseInt(difference_s / (60 * 60 * 24));
        difference_s -= (difference_days * 60 * 60 * 24);

        const difference_hours = parseInt(difference_s / (60 * 60));
        difference_s -= (difference_hours * 60 * 60);

        const difference_minutes = parseInt(difference_s / (60));
        difference_s -= (difference_minutes * 60);

        const time_elapsed = difference_days.toString() + "-" +
            difference_hours.toString() + ":" +
            difference_minutes.toString() + ":" +
            difference_s.toString();
        
        return time_elapsed;
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
                lines.push(["help (?)     Display this list", false]);
                lines.push(["clear        Clear the screen", false]);
                lines.push(["exit         Exit where?", false]);
                lines.push(["alias        Author contact info."]);
                lines.push(["cat          List file arg. contents"]);
                lines.push(["git          Author's GitHub", false]);
                lines.push(["ls           List files in directory", false]);
                lines.push(["ps           List of running processes", false]);
                lines.push(["whoami       Author's general bio", false]);
                setLines(lines);
                setDisplayingPhoto(false);
                break;
            case "alias":
                lines.push(["alias email='nicholasrsmith1600@gmail.com'", false]);
                lines.push(["alias phone='5097157088'", false]);
                lines.push(["alias github='TheGentlemanCoder'"]);
                lines.push(["alias linkedin='linkedin.com/nicholas-smith-2022'", false]);
                lines.push(["alias twitter='@johnDeSilencio'", false]);
                setLines(lines);
                setDisplayingPhoto(false);
                break;
            case "git":
                window.location.href = "https://github.com/TheGentlemanCoder"; // redirect user to GitHub
                setLines(lines);
                setDisplayingPhoto(false);
                break;
            case "ls":
                lines.push(["internship_experience.json", false]);
                setLines(lines);
                setDisplayingPhoto(false);
                break;
            case "cat internship_experience.json":
                internships.map(line => lines.push(line)); // output prepared resume
                setLines(lines);
                setDisplayingPhoto(false);
                break;
            case "ps":
                // list some notable "processes"
                const currentDate = new Date();
                
                const orientationDate = new Date("2018-08-24");
                const time_elapsed_orientation = getFormattedDateDifference(orientationDate, currentDate);

                const eagleScoutAwardDate = new Date("2018-02-22");
                const time_elapsed_eagle = getFormattedDateDifference(eagleScoutAwardDate, currentDate);

                const presidentGonzagaIEEEDate = new Date("2020-01-01");
                const time_elapsed_ieee = getFormattedDateDifference(presidentGonzagaIEEEDate, currentDate);

                lines.push(["  PID TTY          TIME CMD", false]);
                lines.push(["  460 tty1 " + time_elapsed_eagle + "\teagle_scout.py", false]);
                lines.push(["    3 tty2 " + time_elapsed_ieee + "\tgu_ieee_prez.sh", false]);
                lines.push([" 2018 tty3 " + time_elapsed_orientation + "\tearn_degree.dat", false]);
                setLines(lines);
                setDisplayingPhoto(false);
                break;
            case "whoami":
                whoami.map(line => lines.push(line)); // output prepared bio
                setLines(lines);
                setDisplayingPhoto(true);
                break;
            default:
                if (command.length >= 3 && command.slice(0, 3) === "cat") {
                    lines.push(["Error: No such file as \"" + command.slice(4) + "\"", false]);
                } else {
                    lines.push(["Unrecognized command: \"" + text + "\".", false]); // false means to display caret
                }

                lines.push(["Try \"help\" or \"?\" for available options.", false]);
                setLines(lines);
                setDisplayingPhoto(false);
                break;
        }
    }

    if (displayingPhoto) {
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-black text-left text-primary overflow-x-clip overflow-y-scroll">
                <img src="/whoami.jpg" alt="The author's handsome mug"
                     className="object-cover absolute w-1/2 top-0 right-0
                                transition-opacity duration-1000 opacity-0
                                hover:opacity-100 ease-out invisible lg:visible"></img>
                <PreviousLines lines={lines}/>
                <span>$ </span>
                <input autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" 
                       value={text} onChange={(e) => setText(e.target.value)} onKeyPress={(e) => checkKeystroke(e)}
                       onKeyDown={(e) => checkArrowKey(e)} style={{width: `${text.length === 0 ? 1 : text.length}ch`}}
                       type="text" className="bg-black m-0 border-0 terminal-input"></input>
                <span className="animate-ping rounded-full text-primary">_</span>
            </div>
        );
    } else {
        // displayingPhoto == false
        return (
            <div className="fixed top-0 left-0 h-screen w-screen bg-black text-left text-primary overflow-x-clip overflow-y-scroll">
                <PreviousLines lines={lines}/>
                <span>$ </span>
                <input autoFocus autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" 
                       value={text} onChange={(e) => setText(e.target.value)} onKeyPress={(e) => checkKeystroke(e)}
                       onKeyDown={(e) => checkArrowKey(e)} style={{width: `${text.length === 0 ? 1 : text.length}ch`}}
                       type="text" className="bg-black m-0 border-0 terminal-input"></input>
                <span className="animate-ping rounded-full text-primary">_</span>
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
    var div_css_classes = "left-0 max-w-lg text-left bg-black text-primary whitespace-pre-wrap";

    if (props.text[0].length > 0 && props.text[0][0] === "$") {
        div_css_classes += " m-0"; // command line doesn't need a tab
    } else {
        div_css_classes += " ml-4"; // add a tab to distinguish between input and output lines
    }

    return (
        <div className={div_css_classes}>
            <span className="m-0 border-0 whitespace-pre-wrap">{props.text[0]}</span>
        </div>
    );
}

export default App;
