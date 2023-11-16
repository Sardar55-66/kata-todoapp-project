/* eslint-disable */
import React, { useState } from "react";
import './TimeUpAlert.css'
import { CloseCircleOutlined } from '@ant-design/icons'



const TimeUpAlert = function (props) {

    const [active, setActive] = useState(true)

    if (active) {
        return (

            <div className="time-up">
                <CloseCircleOutlined onClick = {() => setActive(false)}/>
                <span className="time-up__alert">
                    <div className="time-up__title">Time is up!</div>
                </span>
            </div>
        )
    } else return 
}

export default TimeUpAlert