import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task-filter.css';

export default class TaskFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTasks: false,
      activeTasks: false,
      completedTasks: false,
    };
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button
            onClick={(e) => {
              this.setState({
                activeTasks: false,
                allTasks: !this.state.allTasks,
                completedTasks: false,
              });
              this.props.showAllTasks(e);
            }}
            className={this.state.allTasks ? 'selected' : ''}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              this.setState({
                allTasks: false,
                activeTasks: !this.state.activeTasks,
                completedTasks: false,
              });
              this.props.showActiveTasks(e);
            }}
            className={this.state.activeTasks ? 'selected' : ''}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              this.setState({
                completedTasks: !this.state.completedTasks,
                allTasks: false,
                activeTasks: false,
              });
              this.props.showCompletedTasks(e);
            }}
            className={this.state.completedTasks ? 'selected' : ''}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

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
