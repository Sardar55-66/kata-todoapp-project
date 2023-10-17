import React from "react";
import propTypes from 'prop-types'
import './New-task-form.css'


const NewTaskForm = function (props) {

    return <header className="header">
                <h1>todos</h1>
                <input 
                className="new-todo"
                 placeholder="What needs to be done?"
                 autoFocus
                 
                 onKeyUp = {(e) => props.addTask(e)}
                 />
            </header>
}

NewTaskForm.defaulProps = {
    addTask : () => {}
}
NewTaskForm.propTypes = {
    addTask : propTypes.func
}

export default NewTaskForm;