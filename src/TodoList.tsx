import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./reducers/state/Task";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}


export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.id), [props.changeTodolistTitle, props.id]);


    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    let allTodolistTasks = props.tasks;
    let taskForTodoList = allTodolistTasks;
    if (props.filter === "active") {
        taskForTodoList = allTodolistTasks.filter(t => t.isDone === false)

    }
    if (props.filter === "completed") {
        taskForTodoList = allTodolistTasks.filter(t => t.isDone === true)
    }

    let tasks = taskForTodoList.map(t => {


        return <Task
            key={t.id}
            task={t}
            todoListId={props.id}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeStatus={props.changeStatus}
        />

    })


    return <div>
        <EditableSpan title={props.title}
                          changeItem={changeTodolistTitle} />
                          <IconButton onClick={() => {props.removeTodoList(props.id)}}>
                              <Delete />
                          </IconButton>
            {/*<h3><button onClick={() => {props.removeTodoList(props.id)}}> x</button></h3>*/}
    <AddItemForm addItem={addTask} title={props.title}/>
    <ul style={{listStyle: "none", paddingLeft: "0"}}>
        {tasks}
    </ul>
    <div>
        <Button
            size={"small"}
            color={props.filter === "all" ? "secondary" : "primary"}
            variant={props.filter === "all" ? "outlined" : "contained"}
            // className={props.filter === "all" ? "active-filter" : ""}
            onClick={onAllClickHandler}>All
        </Button>
        <Button
            size={"small"}
            color={props.filter === "active" ? "secondary" : "primary"}
            variant={"contained"}
            // className={props.filter === "active" ? "active-filter" : ""}
            onClick={onActiveClickHandler}>Active
        </Button>
        <Button
            size={"small"}
            color={props.filter === "completed" ? "secondary" : "primary"}
            variant={"contained"}
            // className={props.filter === "completed" ? "active-filter" : ""}
            onClick={onCompletedClickHandler}>Completed
        </Button>
    </div>
</div>
})


export default Todolist;
