/* eslint-disable */
// hooked
import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from './Task-filter';
import './Footer.css';

const Footer = function (props) {
  const tasks = props.state;
  const taskCount = tasks.filter((el) => el.active).length;

  return (
    <footer className="footer">
      <span className="todo-count"> {taskCount} items left</span>

      <TaskFilter
        state={props.state}
        showActiveTasks={props.showActiveTasks}
        showAllTasks={props.showAllTasks}
        showCompletedTasks={props.showCompletedTasks}
      />
      <button onClick={props.clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  tasks: [],
};

Footer.propTypes = {
  tasks: PropTypes.array,
};

export default Footer;
