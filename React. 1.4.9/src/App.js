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


  addTask =  (e) => {
    
    if (e.code === 'Enter' && e.target.value.length > 0 && e.target.value !== '') {

      

      this.setState((state) => {
        let gfg = _.uniqueId(); 
        let newTask = {
          value: e.target.value,
          editing: false,
          completed: false,
          id: gfg
        }
        return state = {
          tasks : [...state.tasks, newTask]
        }
      })

      this.setState((state) => {
        e.target.value = ''
      })
    }
  }



  taskDelete = (id) => {
    this.setState((state) => {
      const before = state.tasks.slice(0, id)
      const after = state.tasks.slice(id + 1)
    

      return state = {
        tasks : [...before, ...after]
      }
    })
  }



  taskCompleted = (idx) => {
    
    this.state.tasks.map((el) => {
      if (el.id === idx) {
        document.getElementById(idx).classList.toggle('completed')
      }
    })
  
  
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
