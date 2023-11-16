/* eslint-disable */
// hooked
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Task-filter.css';

const TaskFilter = function (props) {
  const [allTasks, setAllTasks] = useState(false);
  const [activeTasks, setActiveTasks] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(false);

  return (
    <ul className="filters">
      <li>
        <button
          onClick={(e) => {
            setAllTasks((all) => {all = !all})
            props.showAllTasks(e);
          }}
          className={allTasks ? 'selected' : ''}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={(e) => {
            setActiveTasks((active) => active = !active)
            props.showActiveTasks(e);
          }}
          className={activeTasks ? 'selected' : ''}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={(e) => {
            setCompletedTasks((complete) => complete = !complete)
            props.showCompletedTasks(e);
          }}
          className={completedTasks ? 'selected' : ''}
        >
          Completed
        </button>
      </li>
    </ul>
  )};


TaskFilter.defaulProps = {
  showAllTasks: () => {},
  showActiveTasks: () => {},
  showCompletedTasks: () => {},
};
TaskFilter.propTypes = {
  showAllTasks: PropTypes.func,
  showActiveTasks: PropTypes.func,
  showCompletedTasks: PropTypes.func,
};


export default TaskFilter;