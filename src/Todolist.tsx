import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    removeTodolist:(todolistsID: string)=>void
    todolistsID:string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistsID: string,taskId: string) => void
    changeFilter: (todolistsID:string,value: FilterValuesType) => void
    addTask: (todolistsID: string,title: string) => void
    changeTaskStatus: (todolistsID: string,taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    //           Доработать  должно лежать здесь
    // let tasksForTodolist = tasks;
    // if (el.filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (el.filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistsID,title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
const removeTodolistOnclick =()=>{
        props.removeTodolist(props.todolistsID)
}
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistsID,"all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistsID,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistsID,"completed");


    return <div>
        <div>
        <h3>{props.title}
            <button onClick={removeTodolistOnclick}>X</button></h3>

            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistsID,t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistsID,t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
