import {
    ActionType,
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from "./tl-reducer";
import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();
    //
    // const startState: Array<TodoListType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ]

    const endState = todoListReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    // const startState: Array<TodoListType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ]

    const endState = todoListReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState === startState).toBeFalsy()
});

test('correct todolist should change its name', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();


    let newTodolistTitle = "New Todolist";

    // const startState: Array<TodoListType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ]

    const action: ActionType = {
        type: 'CHANGE-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todoListReducer(startState, ChangeTitleAC(newTodolistTitle, todolistId2));

    // expect(endState[2].id).toBe(todolistId3)
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    // const startState: Array<TodoListType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ]

    const action: ActionType = {
        type: 'CHANGE-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todoListReducer(startState, ChangeFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


