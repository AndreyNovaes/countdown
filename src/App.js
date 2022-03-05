import React, { useContext, useState, useEffect } from 'react'
import Timer from './components/Timer'
import Input from './components/Input'
import { Form } from '@unform/web'
import myContext from './context/context'
import backgroundVideo from './media/video/wallpaper-60fpsfixo.m4v'
import song from './media/song/song_solitude.mp3'
import playIcon from './media/icons/icon_Play.png'
import stopIcon from './media/icons/icon_Stop.png'
import resetIcon from './media/icons/icon_Reset.png'
// import mute from './media/icons/icon_Mute.png'

function App() {
  const { seconds ,setSeconds } = useContext(myContext);
  const { timeoutId } = useContext(myContext);
  const { startPauseToggle, setstartPauseToggle } = useContext(myContext);
  const { songPlay, setSongPlay } = useContext(myContext);
  const [ emptyInput, setEmptyInput ] = useState(true);
  const { secondsTitle, minutesTitle } = useContext(myContext);
  const audio = new Audio(song);
  const inputs = document.querySelectorAll("input");


  const play = () => {
    audio.volume = 0.2;
    audio.play();
  }
  
  useEffect(() => {
    document.title = `${minutesTitle}:${secondsTitle}`
  }, [minutesTitle, secondsTitle])

  const handleSubmit = (data, { reset }) => {
    if(seconds !== 0){
      setSeconds(seconds + 0.0001)
    }
    else{
    const seconds = Number(data.minutes) * 60 + Number(data.seconds)
    setSeconds(seconds);
    }
    setstartPauseToggle(true)
    if(songPlay){
      play();
      setSongPlay(false);
    }
    setEmptyInput(true);
    reset();
  }

  const handlePause = () => {
    setstartPauseToggle(false)
    if(seconds !== 0) {
      setEmptyInput(false)
    }
    clearTimeout(timeoutId);
  }

  const handleReset = () => {
    if(seconds !== 0) {
      clearTimeout(timeoutId);
      setSeconds(0);
    }
    setstartPauseToggle(false);
    setEmptyInput(true);
    inputs[0].value = '';
    inputs[1].value = '';
  }
  
  const inputValidation = (e) => {
    const value = e.target.value
    if(value && seconds === 0){
      setEmptyInput(false)    
    }
    else if(seconds === 0) {
      setEmptyInput(true)
    }
    if(e.target.value.length > 5){
      e.target.value = `${e.target.value[0]}${e.target.value[1]}${e.target.value[2]}${e.target.value[3]}${e.target.value[4]}${e.target.value[5]}`}
  }

  return (
    <div >
      <video autoPlay loop muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
          }} >
        <source src={backgroundVideo} type='video/mp4'></source>
      </video>
      <div 
      style={{
        display: "block",
        marginLeft: "auto",
        marginRight:"auto",
        width: '28%'
        }}>
          <div style={{
            backgroundColor: 'rgba(0,0,0, 0.4)',
            color: 'white',
            fontWeight: 'bold',
            border: '3px solid #f1f1f1',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '2',
            width: '80%',
            padding: '20px',
            textAlign: 'center',
            backdropFilter: 'opacity(0.8) blur(4px) saturate(150%)',
        }}>
        <Timer />
        <Form onSubmit={handleSubmit}>
        <div styles={{ position: 'relative' }}>
        <Input required={emptyInput} onChange={ inputValidation } name='minutes'  type='number' min="1" placeholder="Minuto(s)" 
        style={{fontSize: "1vw", color: 'black'}} 
        />
        <Input required={emptyInput} onChange={ inputValidation } name='seconds' type='number' min="1" placeholder="Segundo(s)" style={{ fontSize: "1vw" }}/>
        </div>
        <button style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          paddingRight: '25px'
        }} type='submit' hidden={startPauseToggle}>
          <img width='96px' src={playIcon} alt='botão com o icone play'></img>
        </button>
        {
          startPauseToggle &&
          <button style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'red',
            cursor: 'pointer',
            paddingRight: '25px'
          }} type='button' onClick={handlePause}>
            <img width='96px' src={stopIcon} alt='botão com o icone pause'></img>
         </button>
        }
        <button style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          paddingLeft: '25px'
        }} type='button' onClick={handleReset}>
          <img width='100px' src={resetIcon} alt='botão com o icone reset'></img>
        </button>
        </Form>
        {/* <img style={{ backgroundColor: 'transparent' }} width='96px' src={mute} alt='botão com o icone de audio'></img> */}
        </div>
      </div>
    </div>
  )
}

export default App