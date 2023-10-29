/* eslint-disable */
import React from 'react';
import propTypes from 'prop-types';
import './New-task-form.css';

const NewTaskForm = function (props) {
  return (
    <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={props.newTaskforms}>
          <input className="new-todo inputs" placeholder="Task" autoFocus onKeyUp={props.addTask} onSubmit={(e) => e.target.value = ''}/>
          <input className="new-todo-form__timer inputs" placeholder="Min" type='number' autoFocus onKeyUp={props.addMinutes}/>
          <input className="new-todo-form__timer inputs" placeholder="Sec" type='number' autoFocus onKeyUp={props.addSeconds} />
        </form>
      </header>
  );
};

NewTaskForm.defaulProps = {
  addTask: () => {},
};
NewTaskForm.propTypes = {
  addTask: propTypes.func,
};

export default NewTaskForm;
