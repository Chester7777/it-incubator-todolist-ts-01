import React from "react";

type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state}
            newState.age = newState.age + 1;
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
           return {...state, childrenCount: state.childrenCount + 1};
        case "CHANGE-NAME":
           let newState2 = {...state}
            newState2.name = "Viktor"
            return newState2

        default:
            throw new Error("I don't understand this type")
    }
}

