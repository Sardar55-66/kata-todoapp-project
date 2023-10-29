/* eslint-disable */
import React, { Component } from 'react';
import './Task-list.css';

import Task from './Task';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="todo-list">
        <Task
          state={this.props.state}
          taskEdit={this.props.taskEdit}
          taskCompleted={this.props.taskCompleted}
          taskDelete={this.props.taskDelete}
          editState={this.props.editState}
          id={this.props.id}
          idx={this.props.idx}
          playStart = {this.props.playStart}
          pauseStart = {this.props.pauseStart}
        />
      </ul>
    );
  }
}
