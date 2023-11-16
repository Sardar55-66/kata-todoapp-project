/* eslint-disable */
// class
import React, { useState } from 'react';
import './App.css';
import NewTaskForm from './Components/New-task-form';
import TaskList from './Components/Task-list';
import Footer from './Components/Footer';
const _ = require('lodash');


const App = function () {


let initialTask = {
    active : true,
    editing: false,
    id : null,
  };


const [value, setValue] = useState(null)
let [minutes, setMinutes] = useState(0)
let [seconds, setSeconds] = useState(0)
const [task, setTask] = useState(initialTask)
const [tasks, setTasks] = useState([])




//добавления текста задачки
let addTask = (e) => {
  if (e.target.value !== '') setValue(e.target.value)  
  }

//установка минут таймера
let addMinutes = (e) => {
  if (e.target.value !== '') setMinutes(e.target.value)
};

// установка секунд таймера и добавление задачи и очищение полей ввода после добавления задачки
let addSeconds = (e) => {
  
  setSeconds(seconds = e.target.value)
  let gfg = _.uniqueId();
  
  setTask({
    value,
    minutes,
    seconds,
    ...initialTask,
    id: gfg,
  })
  
  if (e.code === 'Enter' && e.target.value !== '' && checkSpace(e.target.value)) {
  tasks.push(task)
  setTasks(tasks)
  let inputValues = Array.from(document.querySelectorAll('.inputs'))
  inputValues.map(el => el.value = '')
    }
    return tasks
  };


  // валтдация пробелов
  let checkSpace = (str) => {
    return  /[^\s]/gim.test(str)
  }

  // удаление задач
  let taskDelete = (index) => {
      const before = tasks.slice(0, index);
      const after = tasks.slice(index + 1);

      setTasks([...before, ...after])
  };


  // изменения свойства в стейте active, чтобы отметить задачку выполненной
  let taskCompleted = (index) => {
      const oldItem = tasks[index];
      const newItem = { ...oldItem, active: !oldItem.active };

      const newArr = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)];
     
      setTasks(newArr)
  };



//   // изменения свойства в стейте для того,
    //чтобы менять классы инпутов для их отображения
  let taskEdit = (index) => {
      const oldItem = tasks[index];
      const newItem = { ...oldItem, editing: !oldItem.editing };

      const newArr = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)];
      
      setTasks(newArr)
    
  };


   // изменения стейта для редактирования задачи
 let editState = (e, index) => {
  const {editing} = tasks[index]

      if (editing) {
      
        const oldItem = tasks[index];
        const newItem = { ...oldItem, value: e.target.value}; 
        const newArr = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)];

        setTasks(newArr)
    } 
};

// изменения стейта для редактирования минут
let editMinutesState = (e, index) => {
  
  const {editing} = tasks[index]

      if (editing) {        
        const oldItem = tasks[index];
        const newItem = { ...oldItem, minutes:e.target.value}; 
        const newArr = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)];

        setTasks(newArr)
    } 
}


// изменения стейта для редактирования секунд
let editSecondsState = (e, index) => {
  const {editing} = tasks[index]
  
  if (e.code === 'Enter' && value && minutes && seconds && editing) {
      const oldItem = tasks[index];
      const newItem = { ...oldItem, seconds: e.target.value, editing: !oldItem.editing };

      const newArr = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)];

      setTasks(newArr)
      setSeconds(e.target.value)
  }
};


// // показать все задачки
let showAllTasks = () => {
  const copy = JSON.parse(JSON.stringify(tasks));
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


// // показать только активные задачки
let showActiveTasks = () => {
  const copy = JSON.parse(JSON.stringify(tasks));
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

// // показать только завершенные задачи
let showCompletedTasks = () => {
  const copy = JSON.parse(JSON.stringify(tasks));
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

// // очистить завершенные
let clearCompleted = () => {
  const copy = JSON.parse(JSON.stringify(tasks));
  let filtered = copy.filter((el) => el.active);

  setTasks(filtered)
};


  return (
      
      <section className="todoapp">
        <NewTaskForm 
        addTask={addTask} 
        addMinutes={addMinutes}
        addSeconds={addSeconds}
        />

        <section className="main">
          <TaskList
            tasks={tasks}
            taskEdit={taskEdit}
            taskCompleted={taskCompleted}
            taskDelete={taskDelete}
            editState={editState}
            editMinutesState = {editMinutesState}
            editSecondsState = {editSecondsState}

            idx={() => {
              showActiveTasks();
              showCompletedTasks();
            }}/>

          <Footer
            state={tasks}
            showActiveTasks={showActiveTasks}
            showAllTasks={showAllTasks}
            showCompletedTasks={showCompletedTasks}
            clearCompleted={clearCompleted}
          />
        </section>
      </section>
  )
}
export default App;
