import React from "react";
import {Meta, Story} from "@storybook/react/types-6-0";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../reducers/state/store";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: "TODOLISTS/AppWithRedux",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;


const Template: Story = (args) =>
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>;

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {}








