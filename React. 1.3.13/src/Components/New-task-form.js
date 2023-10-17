import React from "react";
import './New-task-form.css'


const NewTaskForm = function (props) {

    return <header className="header">
                <h1>todos</h1>
                <input 
                className="new-todo"
                 placeholder="What needs to be done?"
                 autofocus
                 
                 onKeyUp = {(e) => props.addTask(e)}
                 />
            </header>
}


export default NewTaskForm;