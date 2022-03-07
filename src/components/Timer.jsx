import React, { useEffect, useContext } from 'react'
import myContext from '../context/context'

function Timer() {
  const { seconds: contextSeconds, setSeconds } = useContext(myContext);
  const { setTimeoutId } = useContext(myContext);
  const { setstartPauseToggle } = useContext(myContext);
  const { setSecondsTitle, setMinutesTitle } = useContext(myContext);
  const { setInputView } = useContext(myContext);

// tratamento dos dados recebidos pelo input para a utilização dentro do meu useEffect
  const minutes = String(Math.floor(contextSeconds / 60)).padStart(2, '0');
  const seconds = String(Math.round(contextSeconds % 60)).padStart(2, '0');
// tratamento dos dados recebidos pelo input para a utilização dentro do meu useEffect

  useEffect(() => {
// captura meu timeOutId e, caso meus segundos sejam diferentes de 0, ele inicia e continua o loop
    const timeoutId = setTimeout(() => {
      if(!contextSeconds){
        return
      }
      setSeconds( state => state - 1)
        }, 1100);
// captura meu timeOutId e, caso meus segundos sejam diferentes de 0, ele inicia e continua o loop

// quando meus segundos chegam a 0, ele reseta o timer mudando algumas variáveis de renderização e estados do contextAPI
      if(contextSeconds === 0 || contextSeconds < 0) {
        clearTimeout(timeoutId);
        setstartPauseToggle(false);
        setInputView(true);
      }
// quando meus segundoc chegam a 0 ele reseta o timer mudando algumas variáveis de renderização e estados do contextAPI

// setup de algumas variáveis usadas em outro componente, utilizano contextAPI
      setTimeoutId(timeoutId);
      setMinutesTitle(minutes);
      setSecondsTitle(seconds);
// setup de algumas variáveis usadas em outro componente, utilizano contextAPI
  }, [ setSeconds, contextSeconds, setTimeoutId, setstartPauseToggle, seconds, minutes, setInputView, setMinutesTitle, setSecondsTitle ])

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