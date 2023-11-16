/* eslint-disable */
// hooked
import React, { useState } from "react";
import './Timer.css'
import TimeUpAlert from "./TimeUpAlert";





const StartTimer = function (props) {
  const data = props.mainState
  const id = props.index
  const tasks = data[id]
  
  
  const {minutes, seconds} = tasks

  const [minute, setMinutes] = useState(minutes)
  const [second, setSeconds] = useState(seconds)
  const [timer, setTimer] = useState(null)
  let timeUp = false
  

  if (minutes <= 0 && seconds === 0) {
    clearInterval(timer)
    timeUp = true
  }
  if (minutes > 0 && seconds === 0) {
    setMinutes((m) => m - 1)
    setSeconds(59)
  }

if (timeUp) {
 return <span className="description">
          <TimeUpAlert/> 
      <button className="icon icon-play" onClick={ 
            () => {                      
              if (timer)  clearInterval(timer) 
                  setTimer(setInterval(() => {
                      setSeconds((s) => parseInt(s, 10) - 1)                                                
                     }, 1000)
                  ) 
                              
            }
        }>
        </button>
      <button className="icon icon-pause" onClick={
        () => {
          if (timer) clearInterval(timer)
        }}
        >

        </button>
      {minutes + ':' + seconds}
              </span>
} else return <span className="description">
  
      <button className="icon icon-play" onClick={ 
            () => {                      
              if (timer)  clearInterval(timer) 
                  setTimer(setInterval(() => {
                      setSeconds((s) => parseInt(s, 10) - 1)                                                
                     }, 1000)
                  ) 
                              
            }
        }>
        </button>
      <button className="icon icon-pause" onClick={
        () => {
          if (timer) clearInterval(timer)
        }}
        >

        </button>
      {minute + ':' + second}
              </span>

}


export default StartTimer
