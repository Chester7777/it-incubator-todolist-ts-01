import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {TaskStateType} from "../../App";
import {AddTodoListAC, RemoveTodoListAC} from "../tl-reducer";


let startState: TaskStateType;


beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})



test('correct task should be deleted from correct array', () => {
    // const startState: TaskStateType = {
    //     "todolistId1": [
    //         { id: "1", title: "CSS", isDone: false },
    //         { id: "2", title: "JS", isDone: true },
    //         { id: "3", title: "React", isDone: false }
    //     ],
    //     "todolistId2": [
    //         { id: "1", title: "bread", isDone: false },
    //         { id: "2", title: "milk", isDone: true },
    //         { id: "3", title: "tea", isDone: false }
    //     ]
    // };

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});

test('correct task should be added to correct array', () => {
    // const startState: TaskStateType = {
    //     "todolistId1": [
    //         { id: "1", title: "CSS", isDone: false },
    //         { id: "2", title: "JS", isDone: true },
    //         { id: "3", title: "React", isDone: false }
    //     ],
    //     "todolistId2": [
    //         { id: "1", title: "bread", isDone: false },
    //         { id: "2", title: "milk", isDone: true },
    //         { id: "3", title: "tea", isDone: false }
    //     ]
    // };

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId1"][2].title).toBe("React")
    // expect(endState["todolistId1"].length).toBe(XXX);
    // expect(endState["todolistId2"].length).toBe(XXX);
    expect(endState["todolistId2"][3].id).toBeDefined();
    // expect(endState["todolistId2"][0].title).toBe(XXX);
    // expect(endState["todolistId2"][0].isDone).toBe(XXX);
})

test('status of specified task should be changed', () => {
    // const startState: TaskStateType = {
    //     "todolistId1": [
    //         { id: "1", title: "CSS", isDone: false },
    //         { id: "2", title: "JS", isDone: true },
    //         { id: "3", title: "React", isDone: false }
    //     ],
    //     "todolistId2": [
    //         { id: "1", title: "bread", isDone: false },
    //         { id: "2", title: "milk", isDone: true },
    //         { id: "3", title: "tea", isDone: false }
    //     ]
    // };

    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);
});

test("change task title", () => {
    // const  startState: TaskStateType = {
    //     "todolistId1": [
    //         { id: "1", title: "CSS", isDone: false },
    //         { id: "2", title: "JS", isDone: true },
    //         { id: "3", title: "React", isDone: false }
    //     ],
    //     "todolistId2": [
    //         { id: "1", title: "bread", isDone: false },
    //         { id: "2", title: "milk", isDone: true },
    //         { id: "3", title: "tea", isDone: false }
    //     ]
    // };
    const action = changeTaskTitleAC ("3", "HTML", "todolistId1")
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][2].title).toBe("HTML")
    expect(endState["todolistId2"][2].title).toBe("tea")
})

test('new array should be added when new todolist is added', () => {
    // const startState: TaskStateType = {
    //     "todolistId1": [
    //         { id: "1", title: "CSS", isDone: false },
    //         { id: "2", title: "JS", isDone: true },
    //         { id: "3", title: "React", isDone: false }
    //     ],
    //     "todolistId2": [
    //         { id: "1", title: "bread", isDone: false },
    //         { id: "2", title: "milk", isDone: true },
    //         { id: "3", title: "tea", isDone: false }
    //     ]
    // };

    const action = AddTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(endState[newKey]).toEqual([])
    expect(keys.length).toBe(3)
});

test('property with todolistId should be deleted', () => {
    // const startState: TaskStateType = {
    //     "todolistId1": [
    //         { id: "1", title: "CSS", isDone: false },
    //         { id: "2", title: "JS", isDone: true },
    //         { id: "3", title: "React", isDone: false }
    //     ],
    //     "todolistId2": [
    //         { id: "1", title: "bread", isDone: false },
    //         { id: "2", title: "milk", isDone: true },
    //         { id: "3", title: "tea", isDone: false }
    //     ]
    // };

    const action = RemoveTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(keys[0]).toBe("todolistId1")
    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"]).toBeFalsy()
    expect(endState["todolistId2"]).not.toBeDefined()
});





// test('correct task should be added to correct array', () => {
//     const startState: TaskStateType = {
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "2", title: "milk", isDone: true },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     };
//
//     const action = addTaskAC("juce", "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId1"].length).toBe(3);
//     expect(endState["todolistId2"].length).toBe(4);
//     expect(endState["todolistId2"][0].id).toBeDefined();
//     expect(endState["todolistId2"][0].title).toBe("juce");
//     expect(endState["todolistId2"][0].isDone).toBe(false);
// })


// test('status of specified task should be changed', () => {
//     const startState: TaskStateType = {
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "2", title: "milk", isDone: true },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     };
//
//     const action = changeTaskStatusAC("2", false, "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][2]).toBe(false);
//     expect(endState["todolistId1"][2]).toBe(true);
// });




// test('title of specified task should be changed', () => {
//     const startState: TaskStateType = {
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "2", title: "milk", isDone: true },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     };
//
//     const action = changeTaskTitleAC("2", "beer", "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].title).toBe("beer");
//     expect(endState["todolistId1"][1].title).toBe("JS");
// });


// test('new array should be added when new todolist is added', () => {
//     const startState: TaskStateType = {
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "2", title: "milk", isDone: true },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     };
//
//     const action = AddTodoListAC("new todolist");
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }
//
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });


// test('property with todolistId should be deleted', () => {
//     const startState: TaskStateType = {
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "2", title: "milk", isDone: true },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     };
//
//     const action = RemoveTodoListAC("todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState["todolistId2"]).not.toBeDefined();
// });
