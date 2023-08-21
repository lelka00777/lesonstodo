import React, { ChangeEvent, FC, useState ,KeyboardEvent} from "react";
import { FilterValueType } from "./App";
import { Button } from "./Components/Button";

export type TaskType = {   //типизация
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {    // типизация
  title: string;
  tasks: Array<TaskType>;
  removeTask:(taskId:string)=>void
  chengeTodoFilter:(filter:FilterValueType)=>void
  addTask:(value:string)=>void

};

export const Todolist: FC<PropsType> = (props:PropsType)=>{

  const [value,setValue]=useState<string>('')

let onChangeHandler =(event:ChangeEvent<HTMLInputElement>)=>{

 
 setValue(event.currentTarget.value)
 
}

const oncLickHandler =()=>{


  props.addTask(value)
  setValue('')

}

const onKeyHandler =(event:KeyboardEvent<HTMLInputElement>)=>{
  if(event.key === 'Enter'){
    props.addTask(value)
          setValue('')
          oncLickHandler()
  }

}



const onClickFilterHandler =(filter:FilterValueType)=>{
  props.chengeTodoFilter(filter)
}

const removeTaskHandler =(taskId:string)=>{
  props.removeTask(taskId)

}
const todolistItems = props.tasks.map((task:TaskType) => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
        <Button name={'X'} callback={()=>removeTaskHandler(task.id)}/>
        {/* <button onClick={()=>{removeTaskHandler(task.id)}}>x</button> */}
      </li> 
    );
  });

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input type={'text'} 
              value={value}
              onChange={onChangeHandler}
              onKeyDown={onKeyHandler}/>

        {/* <button onClick={oncLickHandler}>+</button> */}
        <Button  name="+" callback={oncLickHandler}/>
      </div>
      <ul>{todolistItems}</ul>
      <div>
        <Button name={"All"} callback={()=>onClickFilterHandler('All') } />
        <Button name={"Active"} callback={()=>onClickFilterHandler('Active') } />
        <Button name={"Completed"} callback={()=>onClickFilterHandler('Completed') } />
        {/* <button onClick={()=>onClickFilterHandler('All')}>All</button> */}
        {/* <button onClick={()=>onClickFilterHandler('Active')}>Active</button>
        <button onClick={()=>onClickFilterHandler('Completed')}>Completed</button> */}
      </div>
    </div>
  );
}
