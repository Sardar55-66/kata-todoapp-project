import React, {Component} from "react";
import { formatDistance, subDays } from 'date-fns'
import './Task.css'
const _ = require("lodash");




export default class Task extends Component {



    render () {

    


       return this.props.state.tasks.map((el, idx) => {


        let gfg = _.uniqueId(); 
          
          return <li className="" id = {el.id}>
          <div className="view">
            <input 
            className="toggle" 
            type="checkbox"
            onClick = {() => this.props.taskCompleted(el.id)}
            />
            <label>
              <span className="description">{el.value}</span>
              <span className="created">{formatDistance(subDays(new Date(), 0), new Date())}</span>
            </label>
            <button 
            className="icon icon-edit"
            onClick = {() => this.props.taskEdit(el.id, gfg)}
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
          className="edit"
          id = {gfg}
          defaultValue={el.value}
          onKeyUp = {(e) => this.props.editState(e, el.id, gfg, idx)}
          />
        </li>

        })
        
    }
}