import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import deleteProperty = Reflect.deleteProperty;

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    // простой массив
    // let [todolists, setTodolists] = useState<TodolistsType[]>(     // как они связаны  todolists и tasks стейты
    //     [
    //         {id: v1(), title: 'What to learn', filter: 'all'},
    //         {id: v1(), title: 'What to buy', filter: 'all'},
    //
    //     ]
    // )
    //
    // let [tasks, setTasks] = useState([
    //
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(todolistsID: string,taskId: string) {

        setTasks({...tasks,[todolistsID]:tasks[todolistsID].filter(el => el.id != taskId)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistsID: string,title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistsID]:[task,...tasks[todolistsID]]})

        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistsID: string,taskId: string, isDone: boolean) {

        setTasks({...tasks,[todolistsID]:tasks[todolistsID].map(el =>el.id === taskId?{...el,isDone} :el)})
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }


    // let tasksForTodolist = tasks;

    // if (todolists[0].filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (todolists[1].filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }
// создадим новый массив и перезатрем свойство фильтра
    function changeFilter(todolistsID: string, value: FilterValuesType) { // синтаксис для редакса
        const newArrayNewFilter = todolists.map(el =>
            el.id === todolistsID
                ? {...el, filter: value}
                : el)

        setTodolists(newArrayNewFilter)

        // const findTodolists = todolists.find(el =>el.id === todolistsID)
        // if(findTodolists){
        //     findTodolists.filter = value
        // }
        //
        // setTodolists([...todolists])

    }
    const removeTodolist =(todolistsID: string)=>{

        setTodolists(todolists.filter(el=>el.id !==todolistsID))
    delete tasks[todolistsID]
    }

    return (
        <div className="App">

            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id]
                if (el.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        removeTodolist={removeTodolist}
                        key={el.id}
                        todolistsID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
