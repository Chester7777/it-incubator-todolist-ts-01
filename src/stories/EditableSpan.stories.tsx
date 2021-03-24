import React from "react";
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import EditableSpan, {EditableSpanPropsType} from "../EditableSpan";

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argTypes: {
        value: {
          defaultValue: "React"
        },
        backgroundColor: { control: 'color' },
    },
} as Meta;


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
    changeItem: action("Value changed")
}
export const EditableSpanNewStories = Template.bind({});
EditableSpanNewStories.args = {
    changeItem: action("Value changed")
}








