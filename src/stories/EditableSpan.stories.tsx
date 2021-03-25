import React from "react";
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import EditableSpan, {EditableSpanPropsType} from "../EditableSpan";

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Value EditableSpan changed'
        },
        value: {
          defaultValue: 'React',
            description: 'Start value EditableSpan'
        },
    },
} as Meta;


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
    changeItem: action("Value EditableSpan changed")
}
export const EditableSpanNewStories = Template.bind({});
EditableSpanNewStories.args = {
    changeItem: action("Value EditableSpan changed")
}








