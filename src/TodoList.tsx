import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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


export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id)


    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    let tasks = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.id)

        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
                color={"secondary"}
                checked={t.isDone}
                onChange={changeStatus} />
            {/*<input type={"checkbox"}*/}
            {/*       checked={t.isDone}*/}
            {/*       onChange={changeStatus}*/}
            {/*/>*/}
            <EditableSpan title={t.title} changeItem={changeTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </li>
            {/*<button onClick={onClickHandler}>x</button>*/}

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
}


export default Todolist;
