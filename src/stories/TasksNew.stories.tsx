import React from "react";
import {Meta, Story} from "@storybook/react/types-6-0";
import AddItemForm, {AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../reducers/state/Task";
import {TaskType} from "../AppWithRedux";

export default {
    title: "TODOLISTS/TaskNew",
    component: Task,
    argTypes: {
        backgroundColor: {control: "color"},
    },
} as Meta;


let changeStatus = action("Change status")
let changeTaskTitle = action("Change title")
let removeTask = action("Remove task")


const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

let baseArgs = {
    changeStatus,
    changeTaskTitle,
    removeTask,

}

export const TaskNewStories = Template.bind({});
TaskNewStories.args = {
    ...baseArgs,
    task: {id: "1", title: "React", isDone: true},
    todoListId: "todoListId"
}
export const TaskNewIsNotDoneStories = Template.bind({});
TaskNewIsNotDoneStories.args = {
    ...baseArgs,
    task: {id: "1", title: "React", isDone: false},
    todoListId: "todoListId"
}








