import React, { Component } from 'react';

import './App.css';
import NewTaskForm from './Components/New-task-form';
import TaskList from './Components/Task-list';
import Footer from './Components/Footer';

const _ = require('lodash');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  // добвление задач
  addTask = (e) => {
    if (e.code === 'Enter' && e.target.value) {
      this.setState((state) => {
        let gfg = _.uniqueId();
        let newTask = {
          value: e.target.value,
          active: true,
          editing: false,
          id: gfg,
        };
        return (state = {
          tasks: [...state.tasks, newTask],
        });
      });

      this.setState(() => {
        e.target.value = '';
      });
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

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />

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
