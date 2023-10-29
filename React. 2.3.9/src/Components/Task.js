/* eslint-disable */
import React, { Component } from 'react';
import { formatDistance, subDays } from 'date-fns';
import PropTypes from 'prop-types';

import './Task.css';
const _ = require('lodash');

export default class Task extends Component {

  constructor (props) {
    super(props)
  }

timer

  render() {
    const tasks = this.props.state.tasks;
   

    return tasks.map((el, idx) => {
      const { active, editing, minutes, seconds, play, pause } = el;


      this.timer = setInterval(() => {
        parseInt(seconds) + 1
      }, 1000);

      let gfg = _.uniqueId();

      return (
        <li className={el.active ? '' : 'completed'} id={el.id} key={idx}>
          <div className={editing ? 'not-active' : 'view'}>
            <input checked={active ? '' : 'checked'} className="toggle" type="checkbox" onClick={() => this.props.taskCompleted(idx)} id={idx} />
            <label>
              <span className="title description">{el.value}</span>
                <span className="description">
                  <button className="icon icon-play" onClick={() => this.props.playStart(idx)}></button>
                  <button className="icon icon-pause" onClick={() => this.props.pauseStart(idx)}></button>
                  {minutes + ':' + seconds}
                </span>
              <span className='created'>{formatDistance(subDays(new Date(), 0), new Date())}</span>
            </label>
            <button className="icon icon-edit" onClick={() => this.props.taskEdit(idx)}></button>
            <button className="icon icon-destroy" onClick={() => this.props.taskDelete(idx)}></button>
          </div>
          <input
            type="text"
            className={editing ? 'edited' : 'not-active'}
            id={gfg}
            defaultValue={el.value}
            onKeyUp={(e) => this.props.editState(e, idx)}
          />
        </li>
      );
    });
  }
}

Task.defaultProps = {
  tasks: [],
};
Task.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
};
