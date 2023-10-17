import React, {Component} from "react";
import './Task-list.css'
import Task from "./Task";
import PropTypes from 'prop-types'



export default class TaskList extends Component {

    constructor (props) {
        super(props)
    }


    render () {

        

        const tasks = this.props.state.tasks
        return <ul className="todo-list"> 
        
            <Task
            state = {this.props.state}
            taskEdit = {this.props.taskEdit}
            taskCompleted = {this.props.taskCompleted}
            taskDelete = {this.props.taskDelete}
            editState = {this.props.editState}
            id = {this.props.id}
            idx = {this.props.idx}
            />
        
        </ul>
        
    }
}


TaskList.defaulProps = {
    tasks : []
}
TaskList.propTypes = {
    tasks : PropTypes.array
}
