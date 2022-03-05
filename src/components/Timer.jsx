import React, { useEffect, useContext } from 'react'
import myContext from '../context/context'

function Timer() {
  const { seconds: contextSeconds, setSeconds } = useContext(myContext);
  const { setTimeoutId } = useContext(myContext);
  const { setstartPauseToggle } = useContext(myContext);
  const { setSecondsTitle, setMinutesTitle } = useContext(myContext);

  const minutes = String(Math.floor(contextSeconds / 60)).padStart(2, '0');
  // quantidade de minutos / 60, nesse caso, arredondando para baixo e usando o 'resto' abaixo.

  const seconds = String(Math.round(contextSeconds % 60)).padStart(2, '0');
  // quantidade de segundos menor que 60, segundos % 60, o 'resto' da divisão por 60.

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if(!contextSeconds){
        return
      }
      setSeconds( state => state - 1)
        }, 1100);

      if(contextSeconds === 0 || contextSeconds < 0) {
        clearTimeout(timeoutId);
        setstartPauseToggle(false);
      }
      setTimeoutId(timeoutId);
      setMinutesTitle(minutes);
      setSecondsTitle(seconds);
  }, [ setSeconds, contextSeconds, setTimeoutId, setstartPauseToggle, seconds, minutes ])

  return (
    <>
    <div>
    <span style={{ fontSize: "10vw" }} >{ minutes }</span>
    <span style={{ fontSize: "10vw" }} >:</span>
    <span style={{ fontSize: "10vw" }} >{ seconds }</span>
    </div>
    </>
  )
}

export default Timer