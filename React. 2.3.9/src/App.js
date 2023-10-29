/* eslint-disable */
import React, { Component } from 'react';

import './App.css';
import NewTaskForm from './Components/New-task-form';
import TaskList from './Components/Task-list';
import Footer from './Components/Footer';
import { parse } from 'path-browserify';

const _ = require('lodash');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      active : true,
      editing: false,
      id : null,
      tasks: [],
      minutes: null,
      seconds: null,
      play: false,
      pause: false,
    };
  }

  timer;

  // добвление задач
  addTask = (e) => {
    
      this.setState(() => {
        return {
          value: e.target.value,
        }
      });

      if (e.code === 'Enter') {
        e.target.value = ''
      }
    
  };

  // установка минут таймера
  addMinutes = (e) => {
  
    
      this.setState(() => {
        return {
          minutes: e.target.value
        }
      })
    
};

// установка секунд таймера
  addSeconds = (e) => {
  if (e.code === 'Enter' && e.target.value) {
    this.setState(() => {
      return {
        seconds: e.target.value
      }
    });

    return this.formSubmit()
  }
  
  };

  // удаление задач
  taskDelete = (index) => {
    this.setState((state) => {
      const before = state.tasks.slice(0, index);
      const after = state.tasks.slice(index + 1);

      return (state = {
        tasks: [...before, ...after],
      });
    });
    return this.stopTick()
  };

  // изменения свойства в стейте active, чтобы отметить задачку выполненной
  taskCompleted = (index) => {
    this.setState((state) => {
      const oldItem = state.tasks[index];
      const newItem = { ...oldItem, active: !oldItem.active };

      const newArr = [...state.tasks.slice(0, index), newItem, ...state.tasks.slice(index + 1)];
      return {
        tasks: newArr,
      };
    });
    return this.stopTick()
  };

  // изменения свойства в стейте для того,чтобы менять классы инпутов для их отображения
  taskEdit = (index) => {
    this.setState((state) => {
      const oldItem = state.tasks[index];
      const newItem = { ...oldItem, editing: !oldItem.editing };

      const newArr = [...state.tasks.slice(0, index), newItem, ...state.tasks.slice(index + 1)];
      return {
        tasks: newArr,
      };
    });
    return this.stopTick()
  };

  // изменения стейта для редактирования задачи
  editState = (e, index) => {
    if (e.code === 'Enter') {
      this.setState((state) => {
        const oldItem = state.tasks[index];
        const newItem = { ...oldItem, value: e.target.value, editing: !oldItem.editing };

        const newArr = [...state.tasks.slice(0, index), newItem, ...state.tasks.slice(index + 1)];

        return {
          tasks: newArr,
        };
      });
    }
    return this.stopTick()
  };

  // показать все задачки
  showAllTasks = () => {
    const copy = JSON.parse(JSON.stringify(this.state.tasks));
    let filtered = copy.filter((el) => el.active);
    let id = filtered.map((el) => el.id);
    id.map((el) => {
      document.getElementById(el).classList.remove('not-active');
    });

    let filtered2 = copy.filter((el) => !el.active);
    let id2 = filtered2.map((el) => el.id);
    id2.map((el) => {
      document.getElementById(el).classList.remove('not-active');
    });
  };

  // показать только активные задачки
  showActiveTasks = () => {
    const copy = JSON.parse(JSON.stringify(this.state.tasks));
    let filtered = copy.filter((el) => !el.active);
    let id = filtered.map((el) => el.id);
    id.map((el) => {
      document.getElementById(el).classList.add('not-active');
    });

    let filtered2 = copy.filter((el) => el.active);
    let id2 = filtered2.map((el) => el.id);
    id2.map((el) => {
      document.getElementById(el).classList.remove('not-active');
    });
  };

  // показать только завершенные задачи
  showCompletedTasks = () => {
    const copy = JSON.parse(JSON.stringify(this.state.tasks));
    let filtered = copy.filter((el) => el.active);
    let id = filtered.map((el) => el.id);
    id.map((el) => {
      document.getElementById(el).classList.add('not-active');
    });

    let filtered2 = copy.filter((el) => !el.active);
    let id2 = filtered2.map((el) => el.id);
    id2.map((el) => {
      document.getElementById(el).classList.remove('not-active');
    });
  };

  // очистить завершенные
  clearCompleted = () => {
    const copy = JSON.parse(JSON.stringify(this.state.tasks));
    let filtered = copy.filter((el) => el.active);

    this.setState(() => {
      return {
        tasks: filtered,
      };
    });
  };

  // добавление задачи
  formSubmit = () => {
    this.setState((state) => {
      let gfg = _.uniqueId();
      let newTask = {
        value: state.value,
        active: state.active,
        editing: state.editing,
        id: gfg,
        minutes: state.minutes,
        seconds: state.seconds,
        play: state.play,
        pause: state.play,
      };
      return (state = {
        tasks: [...state.tasks, newTask],
      });
    });

    this.setState(() => {
      
    const inputs = Array.from(document.querySelectorAll('.inputs'))
    inputs.map(el => el.value = '')
    })
      
    
  };

  //нажатие кнопки плей
  playStart = (idx) => {
    
    this.setState((state) => {
      const oldItem = state.tasks[idx];
      const newItem = { ...oldItem, play: !oldItem.play, pause: oldItem.pause ? !oldItem.pause : oldItem.pause };

      const newArr = [...state.tasks.slice(0, idx), newItem, ...state.tasks.slice(idx + 1)];
      return {
        tasks: newArr,
      };
    })
    return this.tick(idx)

}
  //нажатие кнопки пауза
  pauseStart = (idx) => {
    this.setState((state) => {
      const oldItem = state.tasks[idx];
      const newItem = { ...oldItem, pause: !oldItem.pause, play: !oldItem.play };

      const newArr = [...state.tasks.slice(0, idx), newItem, ...state.tasks.slice(idx + 1)];
      return {
        tasks: newArr,
      };
    })
    return this.stopTick(idx)


    
  };

  //таймер
  tick = (idx) => {
    this.timer = setInterval(() => {
      

      this.setState((state) => {
        let timeSeconds = parseInt(this.state.tasks[idx].seconds, 10)
      let timeMinutes = parseInt(this.state.tasks[idx].minutes, 10)
      if (timeSeconds === 0 && timeMinutes > 0) { 
        this.state.tasks[idx].minutes = timeMinutes - 1;
        this.state.tasks[idx].seconds = 59
      }
      else if (timeMinutes === 0 && timeSeconds === 0) {
        return this.stopTick()
      }

        const oldItem = state.tasks[idx]
      const newItem = { ...oldItem, seconds: parseInt(oldItem.seconds, 10) - 1};

      const newArr = [...state.tasks.slice(0, idx), newItem, ...state.tasks.slice(idx + 1)];
      return {
        tasks: newArr,
      };
      })
    }, 1000)
  }

  //сброс таймера
  stopTick = () => {
      clearInterval(this.timer)
  }


  render() {
   

    
    
    return (
      <section className="todoapp">
        <NewTaskForm 
        addTask={this.addTask} 
        addMinutes={this.addMinutes}
        addSeconds={this.addSeconds}
        newTaskForms={this.formSubmit}
        />

        <section className="main">
          <TaskList
            state={this.state}
            taskEdit={this.taskEdit}
            taskCompleted={this.taskCompleted}
            taskDelete={this.taskDelete}
            editState={this.editState}
            id={this.id}
            idx={() => {
              this.showActiveTasks();
              this.showCompletedTasks();
            }}
            playStart = {this.playStart}
            pauseStart = {this.pauseStart}
          />

          <Footer
            state={this.state}
            showActiveTasks={this.showActiveTasks}
            showAllTasks={this.showAllTasks}
            showCompletedTasks={this.showCompletedTasks}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
