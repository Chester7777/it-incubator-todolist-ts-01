import React, {useState} from "react";
import "./App.css";
import {v1} from "uuid";
import {runInNewContext} from "vm";
import AddItemForm from "./AddItemForm";
import {Todolist} from "./TodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type  TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL
    const todoListID1 = v1()
    const todoListID2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Meat", isDone: true},
        ]
    })

// function for tasks:
    function removeTask(taskId: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]

        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId);

        setTasks({...tasks})
    }

    function addTask(taskTitle: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    // функция которая меняет свойство title(isDane)
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

// function for todoLists:
    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }
    function addTodolist(title: string) {
        const newTodolistID = v1()
        const newTodolist: TodoListType = {
            id: newTodolistID, title: title, filter: "all"
        }
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [newTodolistID]: []})
    }
    function changeTodolistTitle(title: string, todoListID: string) {
        const todolist = todoLists.find(tl => tl.id === todoListID)
        if (todolist) {
            setTodoLists([...todoLists])
        }
    }

    const listTodo = todoLists.map(tl => {
        let taskForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            taskForTodoList = tasks[tl.id].filter(t => t.isDone === false)

        }
        if (tl.filter === "completed") {
            taskForTodoList = tasks[tl.id].filter(t => t.isDone === true)
        }
        return (
            <Grid item key={tl.id} >
                <Paper elevation={10} style={{padding: "20px"}}>
                    <Todolist
                        // key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

//UI
    return (
        <div className="App">
            <AppBar position="static">
                <Container fixed>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}> <AddItemForm addItem={addTodolist} title={"Todolist title"}/>
                </Grid>
                <Grid container spacing={4}>
                    {listTodo}
                </Grid>
            </Container>
        </div>
    )

}

export default App;


