import React, {ChangeEvent, FC, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import {Button} from "./Components/Button";

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
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    filter: FilterValueType
};                                                                    // пропсы

export const Todolist: FC<PropsType> = ({                  //компонента
                                            title,
                                            tasks,
                                            removeTask,
                                            chengeTodoFilter,
                                            addTask,
                                            changeTaskStatus,
                                            filter,

                                        }) => {
    const [value, setValue] = useState<string>("");
    const [emptyValueError, setEmptyValueError] = useState(false)

    let onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        if (!value.trim()) {
            setEmptyValueError(true)
        } else {
            emptyValueError && setEmptyValueError(false)

        }

        setValue(event.currentTarget.value);
    };

    const oncLickHandler = () => {


        const trimmedTitle = value.trim()
        if (trimmedTitle) {
            addTask(value);
        } else {
            setEmptyValueError(true)
        }

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

    const onClickchangeTaskStatus = (taskId: string, e: ChangeEvent<HTMLInputElement>) => { //& мой вариант
        changeTaskStatus(taskId, e.currentTarget.checked);
    };

    // const onClickchangeTaskStatus = (taskId:string,newIsdone:boolean) => { // & вариант с урока игоря
    //     changeTaskStatus(taskId,newIsdone);
    // };


    const todolistItems = tasks.map((task: TaskType) => {


        return (
            <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                <input className={task.isDone === true ? 'check' : ''}
                       type="checkbox"
                       checked={task.isDone}
                       onChange={(e) => onClickchangeTaskStatus(task.id, e)} // & мой вариант
                    // onChange={(e) => onClickchangeTaskStatus(task.id,e.currentTarget.checked)} // & вариант с урока игоря
                />
                <span>{task.title}</span>
                <Button name={"X"} callback={() => removeTaskHandler(task.id)}/>


            </li>
        );
    });

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={emptyValueError && value ? 'empty-value-error' : 'noFilter'}
                       type={"text"}
                       value={value}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyHandler}
                />


                <Button name="+" callback={oncLickHandler}/>
                {emptyValueError && <div className={'empty-value-error'}>Error input text</div>}
            </div>
            <ul>{todolistItems}</ul>
            <div>


                <Button name={"All"}

                        filter={filter}
                        callback={() => onClickFilterHandler("All")}
                />
                <Button


                    name={"Active"}
                    filter={filter}
                    callback={() => onClickFilterHandler("Active")}
                />
                <Button
                    name={"Completed"}
                    filter={filter}
                    callback={() => onClickFilterHandler("Completed")}
                />

            </div>
        </div>
    );
};
