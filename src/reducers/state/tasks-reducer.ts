import {v1} from "uuid";
import {TaskStateType} from "../../App";
import {AddTodolistActionType, RemoveTodoListActionType, todoListID1, todoListID2} from "../tl-reducer";


type RemoveTaskACType = {
    type: "REMOVE_TASK"
    taskId: string
    todoListID: string

}
type AddTaskACType = {
    type: "ADD_TASK"
    title: string
    todoListID: string


}
type ChangeTaskStatusACType = {
    type: "CHANGE_STATUS"
    taskId: string
    todoListID: string
    isDone: boolean

}
type ChangeTaskTitleACType = {
    type: "CHANGE_TITLE"
    taskId: string
    title: string
    todoListID: string
}


type ActionsType =
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistActionType |
    RemoveTodoListActionType

let initialState: TaskStateType = {
    [todoListID1]: [
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
    ],
    [todoListID2]: [
        {
            id: v1(), title: "Mi" +
                "lk", isDone: true
        },
        {id: v1(), title: "Bread", isDone: false},
        {id: v1(), title: "Beer", isDone: false},
        {id: v1(), title: "Meat", isDone: true},
    ]
}

export const tasksReducer = (state = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let copyState = {...state}
            const todoListTasks = copyState[action.todoListID]
            copyState[action.todoListID] = todoListTasks.filter(t => t.id !== action.taskId);
            return copyState
        }

        case "ADD_TASK": {
            let copyState = {...state}
            let task = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const todoListTasks = copyState[action.todoListID]
            copyState[action.todoListID] = [task, ...todoListTasks]

            return copyState
        }
        case "CHANGE_STATUS": {
            let copyState = {...state}
            const todoListTasks = copyState[action.todoListID]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id === action.taskId) {

                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case "CHANGE_TITLE": {
            let copyState = {...state}
            const todoListTasks = copyState[action.todoListID]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id === action.taskId) {

                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD-TODOLIST":

            return {
                ...state,
                [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            // throw new Error("I don`t understand this type")
            return state;
    }
}


export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskACType => {
    return {type: "REMOVE_TASK", taskId, todoListID}
}

export const addTaskAC = (title: string, todoListID: string): AddTaskACType => {
    return {type: "ADD_TASK", title, todoListID}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string): ChangeTaskStatusACType => {
    return {type: "CHANGE_STATUS", taskId, isDone, todoListID}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): ChangeTaskTitleACType => {
    return {type: "CHANGE_TITLE", taskId, title, todoListID}
}

// export const addTodolistAC = ( title: string, todoListID: string): AddTodolistActionType => {
//     return {type: "ADD-TODOLIST", title, todoListID}
// }
