import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import Form from './components/Form';
import Filterbutton from './components/Filterbutton';
import { useState } from 'react';
import {nanoid} from "nanoid";
import FilterButton from './components/Filterbutton';




function App(props) {

  
  function addTask(name){
    const newTask = {id:`todo-${nanoid()}`,name,completed:false};
    setTasks([...tasks,newTask]);
  }

  function toggleTaskCompleted(id){
     const updatedTasks = tasks.map((task)=>{
      if(id === task.id){
          return{ ...task,completed: !task.completed}; //use object spread to make a new object whose completd peop has been inverted
      }
      return task;
     });
     setTasks(updatedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task)=> id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id,newName){
    const editedTaskList = tasks.map((task)=>{
      //if the task ha sthe same id as the edited task
      if(id === task.id){
        //copy the task and update its name
        return{...task,name:newName};
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  const[tasks, setTasks] = useState(props.tasks);
  const [filter,setFilter] = useState("All");
  const FILTER_MAP={
   All:()=> true,
   Active:(task) => !task.completed,
   Completed: (task) => task.completed,
  };

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted ={toggleTaskCompleted}
      deleteTask ={deleteTask}
      editTask ={editTask}
    />
  ));

  const tasksNoun = taskList !==1 ? "tasks": "tasks";
  const headingText =`${taskList.length} ${tasksNoun} remaining`;


   //Adding filter hook
  
   const FILTER_NAMES = Object.keys(FILTER_MAP);
   const filterList = FILTER_NAMES.map((name)=>(
    <FilterButton key ={name} name={name} isPressed={name === filter} setFilter={setFilter}/>
   ));

   
  return (
    <div className="todoapp stack-large">
    <h1>Todo App</h1>
    <Form addTask={addTask}/>
  

    {/*Form Component */}
    {/* <form>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form> */}

    {/* Filterbutton Component */}
     <div className="filters btn-group stack-exception">
         {filterList}

      {/* <button type="button" className="btn toggle-btn" aria-pressed="true">
        <span className="visually-hidden">Show </span>
        <span>all</span>
        <span className="visually-hidden"> tasks</span>
      </button>
      <button type="button" className="btn toggle-btn" aria-pressed="false">
        <span className="visually-hidden">Show </span>
        <span>Active</span>
        <span className="visually-hidden"> tasks</span>
      </button>
      <button type="button" className="btn toggle-btn" aria-pressed="false">
        <span className="visually-hidden">Show </span>
        <span>Completed</span>
        <span className="visually-hidden"> tasks</span>
      </button> */}
    </div> 
    <h2 id="list-heading">{headingText}</h2>
    <ul
  role="list"
  className="todo-list stack-large stack-exception"
  aria-labelledby="list-heading">
  {taskList}
    </ul>

    {/* Todo Component */}
      {/* <li className="todo stack-small">
        <div className="c-cb">
          <input id="todo-0" type="checkbox" defaultChecked />
          <label className="todo-label" htmlFor="todo-0">
            Eat
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Eat</span>
          </button>
          <button type="button" className="btn btn__danger">
            Delete <span className="visually-hidden">Eat</span>
          </button>
        </div>
      </li>
      <li className="todo stack-small">
        <div className="c-cb">
          <input id="todo-1" type="checkbox" />
          <label className="todo-label" htmlFor="todo-1">
            Sleep
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Sleep</span>
          </button>
          <button type="button" className="btn btn__danger">
            Delete <span className="visually-hidden">Sleep</span>
          </button>
        </div>
      </li>
      <li className="todo stack-small">
        <div className="c-cb">
          <input id="todo-2" type="checkbox" />
          <label className="todo-label" htmlFor="todo-2">
            Repeat
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Repeat</span>
          </button>
          <button type="button" className="btn btn__danger">
            Delete <span className="visually-hidden">Repeat</span>
          </button>
        </div> */}
      {/* </li> */}
    
  </div>
  
  
);

}
export default App;
