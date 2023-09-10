import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValueType = "All" | "Active" | "Completed"; // 2 - фильтрация//  Типизируем стейт

function App(): JSX.Element {
  let [tasks, setTask] = useState<TaskType[]>([
    { id: v1(), title: "Hello world", isDone: true },
    { id: v1(), title: "I am Happy", isDone: false },
    { id: v1(), title: "Yo", isDone: true },
    { id: v1(), title: "REDUX", isDone: false },
  ]);

  const removeTask = (taskId: string) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    setTask([...tasks]);
  };

  const chengeTodoFilter = (filter: FilterValueType) => {
    //5 -  фильтрация //  функция которая скажет реакту что нужна перерисовка вешается на кнопку

    setFilter(filter);
  };
  const addTask = (value: string) => {
    let neWTask = { id: v1(), title: value, isDone: false };
    //   console.log(neWTask)
    setTask([neWTask, ...tasks]);
  };
  const [filter, setFilter] = useState<FilterValueType>("All"); //1 - фильтрация //  стейт за которым следит реакт

  let filterForRender: Array<TaskType> = []; //фильтрация 3 -  ///    массив куда складываетм  отфильтрованные таски  от if

  if (filter === "All") {
    // 4 - фильтрация логика фильтра
    filterForRender = tasks;
  }
  if (filter === "Active") {
    filterForRender = tasks.filter((tasks) => tasks.isDone === false);
  }
  if (filter === "Completed") {
    filterForRender = tasks.filter((tasks) => tasks.isDone === true);
  }

  const changeTaskStatus =(taskId: string)=>{
 const updeteTask:any= tasks.map( t => t.id === taskId ? {...t, isDone :!t.isDone}:t)
 setTask(updeteTask) 

  
  }
  const changeTaskTitle =()=>{
    
  }

  return (
    <div className="App">
      <Todolist
        chengeTodoFilter={chengeTodoFilter}
        title="Songs"
        tasks={filterForRender}
        removeTask={removeTask}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
