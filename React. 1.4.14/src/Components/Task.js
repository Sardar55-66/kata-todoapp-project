import React, {Component} from "react";
import { formatDistance, subDays } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'
const _ = require("lodash");





export default class Task extends Component {


  


    render () {

      const tasks = this.props.state.tasks
    


       return tasks.map((el, idx) => {

      const {id, active, editing} = el

        let gfg = _.uniqueId(); 
          
          return <li className= {el.active ? '' : 'completed'} id = {el.id} key={idx}>
          <div className={editing ? 'not-active' : 'view'}>
            <input 
            checked = {active ? '' : 'checked'}
            className="toggle" 
            type="checkbox"
            onClick = {() => this.props.taskCompleted(idx)}
            idx = {idx}
            />
            <label>
              <span className="description">{el.value}</span>
              <span className="created">{formatDistance(subDays(new Date(), 0), new Date())}</span>
            </label>
            <button 
            className="icon icon-edit"
            onClick = {() => this.props.taskEdit(idx)}
            >
            </button>
            <button 
            className="icon icon-destroy"
            onClick = {() => this.props.taskDelete(idx)}
            >
            </button>
          </div>
          <input 
          type="text" 
          className = {editing ? 'edited' : 'not-active'}
          id = {gfg}
          defaultValue={el.value}
          onKeyUp = {(e) => this.props.editState(e, idx)}
          />
        </li>

        })
        
    }
}


Task.defaultProps = {
  tasks : []
}
Task.propTypes = {
  tasks : PropTypes.arrayOf(PropTypes.object)
}