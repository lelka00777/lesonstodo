import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpans} from "./EditableSpans";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask:(todolistId: string, taskId: string,newTitle: string)=>void
    updateTodo:(todolistId: string,newTitle: string)=>void
}

export function Todolist(props: PropsType) {


    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const addTaskHAndler =(newTitle: string)=>props.addTask(newTitle,props.id)

const updateTodoHandler=(newTitle: string)=>{
        props.updateTodo(props.id,newTitle)
}
    const updataTaskHandler = (tId:string,newTitle:string,)=>{
        props.updateTask(props.id,tId,newTitle)

    }
    return <div>

        <h3>
            {/*{props.title}*/}
            <EditableSpans oldTitle={props.title}  callBack={updateTodoHandler}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
<AddItemForm  callBack={addTaskHAndler}  />

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    // const updataTaskHandler = (newTitle:string)=>{
                    //     props.updateTask(props.id,t.id,newTitle)
                    //
                    // }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpans oldTitle={t.title}  callBack={(newTitle)=>updataTaskHandler(t.id,newTitle)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


