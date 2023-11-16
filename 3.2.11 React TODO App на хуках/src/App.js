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

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       value: null,
//       minutes: 0,
//       seconds: 0,
//       active : true,
//       editing: false,
//       id : null,
//       tasks: [],
//     };
//   }

  
//   // добaление текста задачки
//   addTask = (e) => {
//         this.setState(() => {
//           return {
//             value: e.target.value,
//           }
//         });
//         if (e.code === 'Enter' && this.state.minutes && this.state.seconds) return this.formSubmit()
//   };

//   // установка минут таймера
//   addMinutes = (e) => {
//       this.setState(() => {
//         return {
//           minutes: e.target.value
//         }
//       })
//     if (e.code === 'Enter' && this.state.seconds) return this.formSubmit()
// };

// // установка секунд таймера
//   addSeconds = (e) => {
//   if (e.code === 'Enter' && e.target.value && this.checkSpace(this.state.value) && this.state.minutes) {
//     this.setState(() => {
//       return {
//         seconds: e.target.value
//       }
//     });

//     return this.formSubmit()
//   } else return
  
//   };

//   //валтдация пробелов
//   checkSpace = (str) => {
//     return  /[^\s]/gim.test(str)
//   }

//   // удаление задач
//   taskDelete = (index) => {
//     this.setState((state) => {
//       const before = state.tasks.slice(0, index);
//       const after = state.tasks.slice(index + 1);

//       return (state = {
//         tasks: [...before, ...after],
//       });
//     });
//   };

//   // изменения свойства в стейте active, чтобы отметить задачку выполненной
//   taskCompleted = (index) => {
//     this.setState((state) => {
//       const oldItem = state.tasks[index];
//       const newItem = { ...oldItem, active: !oldItem.active };

//       const newArr = [...state.tasks.slice(0, index), newItem, ...state.tasks.slice(index + 1)];
//       return {
//         tasks: newArr,
//       };
//     });
//     const data = this.state.tasks[index]
//     const {active} = data
//     console.log(active)
//   };

//   // изменения свойства в стейте для того,чтобы менять классы инпутов для их отображения
//   taskEdit = (index) => {
//     this.setState((state) => {
//       const oldItem = state.tasks[index];
//       const newItem = { ...oldItem, editing: !oldItem.editing };

//       const newArr = [...state.tasks.slice(0, index), newItem, ...state.tasks.slice(index + 1)];
//       return {
//         tasks: newArr,
//       };
//     });
//   };

//   // изменения стейта для редактирования задачи
//   editState = (e, index) => {
    
//       this.setState((state) => {
//         const oldItem = state.tasks[index];
//         const newItem = { ...oldItem, value: e.target.value};

//         const newArr = [...state.tasks.slice(0, index), newItem, ...state.tasks.slice(index + 1)];

//         return {
//           tasks: newArr,
//         };
//       });    
//   };

//   editMinutesState = (e, index) => {
//     const {editing} = this.state.tasks[index]
    
//       if (editing) {
//         this.setState((state) => {
//           const oldItem = state.tasks[index];
//           const newItem = { ...oldItem, minutes: e.target.value}; 
//           const newArr = [...state.tasks.slice(0, index), newItem, ...state.tasks.slice(index + 1)];
  
//           return {
//             tasks: newArr,
//           };
//         }); 
//       } 
//   }


//   editSecondsState = (e, index) => {
  
//     if (e.code === 'Enter' && this.state.minutes && this.state.value) {
//       this.setState((state) => {
//         const oldItem = state.tasks[index];
//         const newItem = { ...oldItem, seconds: e.target.value, editing: !oldItem.editing };

//         const newArr = [...state.tasks.slice(0, index), newItem, ...state.tasks.slice(index + 1)];

//         return {
//           tasks: newArr,
//         };
//       });
//     }
//   }

//   // показать все задачки
//   showAllTasks = (e, index) => {
//     const copy = JSON.parse(JSON.stringify(this.state.tasks));
//     let filtered = copy.filter((el) => el.active);
//     let id = filtered.map((el) => el.id);
//     id.map((el) => {
//       document.getElementById(el).classList.remove('not-active');
//     });

//     let filtered2 = copy.filter((el) => !el.active);
//     let id2 = filtered2.map((el) => el.id);
//     id2.map((el) => {
//       document.getElementById(el).classList.remove('not-active');
//     });
//   };

//   // показать только активные задачки
//   showActiveTasks = () => {
//     const copy = JSON.parse(JSON.stringify(this.state.tasks));
//     let filtered = copy.filter((el) => !el.active);
//     let id = filtered.map((el) => el.id);
//     id.map((el) => {
//       document.getElementById(el).classList.add('not-active');
//     });

//     let filtered2 = copy.filter((el) => el.active);
//     let id2 = filtered2.map((el) => el.id);
//     id2.map((el) => {
//       document.getElementById(el).classList.remove('not-active');
//     });
//   };

//   // показать только завершенные задачи
//   showCompletedTasks = () => {
//     const copy = JSON.parse(JSON.stringify(this.state.tasks));
//     let filtered = copy.filter((el) => el.active);
//     let id = filtered.map((el) => el.id);
//     id.map((el) => {
//       document.getElementById(el).classList.add('not-active');
//     });

//     let filtered2 = copy.filter((el) => !el.active);
//     let id2 = filtered2.map((el) => el.id);
//     id2.map((el) => {
//       document.getElementById(el).classList.remove('not-active');
//     });
//   };

//   // очистить завершенные
//   clearCompleted = () => {
//     const copy = JSON.parse(JSON.stringify(this.state.tasks));
//     let filtered = copy.filter((el) => el.active);

//     this.setState(() => {
//       return {
//         tasks: filtered,
//       };
//     });
//   };


//   // добавление задачи
//   formSubmit = () => {
//     this.setState((state) => {
//       let gfg = _.uniqueId();
//       let newTask = {
//         ...this.state,
//         active: state.active,
//         editing: state.editing,
//         id: gfg,
//       }
      
//       return ((state) = {
//         tasks: [...state.tasks, newTask],
//       });
//     });




//     this.setState(() => {
      
//     const inputs = Array.from(document.querySelectorAll('.inputs'))
//     inputs.map(el => el.value = '')
//     })
      

    
    
//   };


//   render() {

//     console.log(this.state.minutes)
   
//     return (
//       <section className="todoapp">
//         <NewTaskForm 
//         addTask={this.addTask} 
//         addMinutes={this.addMinutes}
//         addSeconds={this.addSeconds}
//         newTaskForms={this.formSubmit}
//         />

//         <section className="main">
//           <TaskList
//             state={this.state}
//             taskEdit={this.taskEdit}
//             taskCompleted={this.taskCompleted}
//             taskDelete={this.taskDelete}
//             editState={this.editState}
//             id={this.id}
//             idx={() => {
//               this.showActiveTasks();
//               this.showCompletedTasks();
//             }}
//             playStart = {this.playStart}
//             pauseStart = {this.pauseStart}
//             editMinutesState = {
//               this.editMinutesState
//             }
//             editSecondsState = {this.editSecondsState}

//           />

//           <Footer
//             state={this.state}
//             showActiveTasks={this.showActiveTasks}
//             showAllTasks={this.showAllTasks}
//             showCompletedTasks={this.showCompletedTasks}
//             clearCompleted={this.clearCompleted}
//           />
//         </section>
//       </section>
//     );
//   }
// }