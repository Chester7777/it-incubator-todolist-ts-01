import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../../AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    todoListId: string
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void


    // changeStatus: any
    // changeTitle: any
    // onClickHandler: any
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId)

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    };
    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId]);
    return (
        <li className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"secondary"}
                checked={props.task.isDone}
                onChange={changeStatus} />
            {/*<input type={"checkbox"}*/}
            {/*       checked={t.isDone}*/}
            {/*       onChange={changeStatus}*/}
            {/*/>*/}
            <EditableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </li>

    )
})