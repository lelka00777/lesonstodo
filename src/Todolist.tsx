import React, { ChangeEvent, FC, useState, KeyboardEvent } from "react";
import { FilterValueType } from "./App";
import { Button } from "./Components/Button";

export type TaskType = {
  //типизация
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  // типизация
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  chengeTodoFilter: (filter: FilterValueType) => void;
  addTask: (value: string) => void;
  changeTaskStatus: (taskId: string) => void;
  filter:FilterValueType
};

export const Todolist: FC<PropsType> = ({
  title,
  tasks,
  removeTask,
  chengeTodoFilter,
  addTask,
  changeTaskStatus,
  filter,
  
}) => {
  const [value, setValue] = useState<string>("");

  let onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const oncLickHandler = () => {
    addTask(value);
    setValue("");
  };

  const onKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask(value);
      setValue("");
      oncLickHandler();
    }
  };

  const onClickFilterHandler = (filter: FilterValueType) => {
    chengeTodoFilter(filter);
  };

  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId);
  };

  const onClickchangeTaskStatus = (taskId: string) => {
    changeTaskStatus(taskId);
  };


  const todolistItems = tasks.map((task: TaskType) => {



    
    return (
      <li key={task.id} className={task.isDone?'task-done':'task'}>
        <input className={task.isDone === true?'check':''}
          type="checkbox" 
          checked={task.isDone}
          onChange={() => onClickchangeTaskStatus(task.id)}
        />
        <span>{task.title}</span>
        <Button name={"X"} callback={() => removeTaskHandler(task.id)} />
        {/* <button onClick={()=>{removeTaskHandler(task.id)}}>x</button> */}
      </li>
    );
  });

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type={"text"}
          value={value}
          onChange={onChangeHandler}
          onKeyDown={onKeyHandler}
        />

        {/* <button onClick={oncLickHandler}>+</button> */}
        <Button name="+" callback={oncLickHandler} />
      </div>
      <ul>{todolistItems}</ul>
      <div >
        <Button name={"All"} 
      
       filter={filter}
        callback={() => onClickFilterHandler("All")} />
        <Button
      
          name={"Active"}
          callback={() => onClickFilterHandler("Active")}
        />
        <Button
          name={"Completed"}
          callback={() => onClickFilterHandler("Completed")}
        />
        {/* <button onClick={()=>onClickFilterHandler('All')}>All</button> */}
        {/* <button onClick={()=>onClickFilterHandler('Active')}>Active</button>
        <button onClick={()=>onClickFilterHandler('Completed')}>Completed</button> */}
      </div>
    </div>
  );
};
