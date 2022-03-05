import React, { useState } from 'react';
import context from './context';


export default function ContextProvide({ children }) {
  const [seconds, setSeconds] = useState(0);
  const [timeoutId, setTimeoutId] = useState('')
  const [startPauseToggle, setstartPauseToggle] = useState(false)
  const [songPlay, setSongPlay] = useState(true)
  const [minutesTitle, setMinutesTitle] = useState(0)
  const [secondsTitle, setSecondsTitle] = useState(0)


  const contextValue = {
    seconds,
    setSeconds,
    timeoutId,
    setTimeoutId,
    startPauseToggle,
    setstartPauseToggle,
    songPlay,
    setSongPlay,
    minutesTitle,
    setMinutesTitle,
    secondsTitle,
    setSecondsTitle,
  };

  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}