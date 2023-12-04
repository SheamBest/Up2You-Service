import { useState, useEffect } from "react";
import "../App.css";

function Timer() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toLocaleDateString());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setDate(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="clock">
      <p className="date">{date}</p>
      <p className="time">{time}</p>
    </div>
  );
}

export default Timer;