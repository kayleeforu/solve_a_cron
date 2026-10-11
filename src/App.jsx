import './App.css';
import { useRef, useState } from 'react';

function App() {
  const cronArguments = GetTodaysArguments();

  const [cron, setCron] = useState(cronArguments);
  const [chosenCron, setChosenCron] = useState(-1);
  const argumentNames = ["minute", "hour", "day", "month", "weekday"]
  const inputRefs = useRef([]);

  function handleChange(index, value) {
    const updated = [...cron];
    updated[index] = value;
    setCron(updated);
  }

  function handleKeyDown(index, event) {
    if (event.code === "KeyB") {
      event.preventDefault();
      if (index === 0) {
        event.target.setSelectionRange(0, 0);
      } else {
        inputRefs.current[index - 1].focus();
      }
      return;
    }

    if (event.code === "KeyW") {
      event.preventDefault();
      if (index === cron.length - 1) {
        event.target.setSelectionRange(cron[index].length, cron[index].length);
      } else {
        inputRefs.current[index + 1].focus();
      }
      return;
    }

    if ((event.key === "ArrowLeft" || event.key === "Backspace") && event.target.selectionStart === 0) {
      if (index === 0) {
        return;
      }
      if (event.key === "ArrowLeft") event.preventDefault();
      inputRefs.current[index - 1].focus();
      return;
    }

    if (event.key === "ArrowRight" && event.target.selectionStart === cron[index].length) {
      if (index === cron.length - 1) {
        return;
      }
      event.preventDefault();
      inputRefs.current[index + 1].focus();
      return;
    }

    if (event.key === " ") {
      event.preventDefault();
      if (index !== cron.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      return;
    }

    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      const isAllowed = /[\d*,\-/]/.test(event.key);

      if (!isAllowed) {
        event.preventDefault();
      }
    }
  }

  return (
    <div className="relative flex justify-center w-screen h-screen bg-cron-bg">
      <div className="title absolute top-[27%] tracking-widest text-cron-100 font-medium flex items-center justify-center flex-col">
        <span className="text-5xl">Solve Today's Cron</span>
        <div className="text-xl">
          <span>Updates daily, but you can also check out </span>
          <a className="no-underline" href="/archive">the archive</a>
        </div>
        <div>
          <div className="cron-enter mt-10 border-2 rounded-2xl w-200 h-20 flex items-center justify-center gap-8 text-3xl">
            {cron.map((value, index) => (
              <input 
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                className="w-24 text-center bg-transparent outline-none"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <div className="cron-under mt-4 w-205 h-20 flex flex-row justify-center gap-8 text-xl">
            {argumentNames.map((value, index) => (
              <span className={index == chosenCron ? "bg-cron-200 text-cron-bg cursor-pointer" : "cursor-pointer"}>
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GetTodaysArguments() {
  const date = new Date();

  const day = date.getDate().toString();
  const hours = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  const month = (date.getMonth() + 1).toString();

  return [minutes, hours, day, month, "*"];
}

export default App;