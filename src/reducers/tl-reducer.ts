import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todoListID: string
}
type ChangeTodoListFilterActionType = {
    type: "CHANGE-FILTER",
    filter: FilterValuesType,
    id: string
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE",
    title: string,
    id: string
}

export type ActionType =
    RemoveTodoListActionType |
    AddTodolistActionType |
    ChangeTodoListFilterActionType |
    ChangeTodoListTitleActionType
export const todoListID1 = v1()
export const todoListID2 = v1()
let initialState: Array<TodoListType>  = [
    {id: todoListID1, title: "What to learn", filter: "all"},
    {id: todoListID2, title: "What to buy", filter: "all"}
];

export const todoListReducer = (state = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolist: TodoListType = {
                id: action.todoListID, title: action.title, filter: "all"
            }
            return [newTodolist, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case "CHANGE-FILTER": {
            // const todoList = state.find(tl => tl.id === action.id)
            // if (todoList) {
            //     todoList.filter = action.filter
            //     return [...state]
            // }
            // return state
            return state.map(tl => {
                if(tl.id === action.id) {
                    return{...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
            // const todolist = state.find(tl => tl.id === action.id)
            // if (todolist) {
            //     todolist.title = action.title
            //   return [...state]
            // }
            // return state
            state.map(tl => {
                if(tl.id === action.id) {
                    return{...tl, title: action.type}
                } else {
                    return tl
                }
            })
        }
        default:
            return [...state]
    }
    // return state
}


export const RemoveTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const AddTodoListAC = (newTodolistTitle: string): AddTodolistActionType => {
    return  {type: "ADD-TODOLIST",  title: newTodolistTitle, todoListID: v1()}
}
export const ChangeTitleAC = ( todolistId: string, newTodolistTitle: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TITLE", title: newTodolistTitle, id: todolistId}
}
export const ChangeFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-FILTER", filter: filter, id: todolistId}


}