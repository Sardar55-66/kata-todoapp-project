import React, {Component} from 'react';
import './App.css';
import NewTaskForm from './Components/New-task-form';
import TaskList from './Components/Task-list';
import Footer from './Components/Footer';

const _ = require("lodash");  




export default class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      tasks : []
    }
  }


  addTask =  () => {
    
  }



  taskDelete = () => {
    
  }



  taskCompleted = () => {
  
  }


  taskEdit = () => {
  
  }


  editState = () => {
    
  }


render () {

  

  return (
    <section className="todoapp">

      <NewTaskForm addTask = {this.addTask}/>

      <section class="main">

      <TaskList
      state = {this.state}
      taskEdit = {this.taskEdit}
      taskCompleted = {this.taskCompleted}
      taskDelete = {this.taskDelete}
      editState = {this.editState}
      />

    <Footer/>
      </section>

    </section>
  )
}


}
