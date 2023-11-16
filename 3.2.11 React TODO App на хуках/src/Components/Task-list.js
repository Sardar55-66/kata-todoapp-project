//class
/* eslint-disable */
// hooked
import React from 'react';
import Task from './Task';
import './Task-list.css';

const TaskList = (props) => {
  {
    return (
      <ul className="todo-list">
        <Task
          tasks={props.tasks}
          taskEdit={props.taskEdit}
          taskCompleted={props.taskCompleted}
          taskDelete={props.taskDelete}
          editState={props.editState}
          editMinutesState = {props.editMinutesState}
          editSecondsState = {props.editSecondsState}
          idx={props.idx}/>
      </ul>
    );
  }
}
export default TaskList;