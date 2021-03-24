import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";


export type EditableSpanPropsType = {
    title: string
    changeItem: (title: string) => void
}

const EditableSpan =  React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        // отдать родителю новое значение
        props.changeItem(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    // const onKeyPressEditMode
    //     = (e: ) => {
    //     setTitle(e.currentTarget.value)
    // }(e: KeyboardEvent) => {if(e.key === "Enter") offEditMode()}




    return (
        editMode
        ? <TextField
            variant={"standard"}
                value={title}
                autoFocus  // по умолчанию true
                onBlur={offEditMode}
                onChange={changeTitle}
                />
            // <input
            //     value={title}
            //     autoFocus  // по умолчанию true
            //     onBlur={offEditMode}
            //     onChange={changeTitle}
            // />
        : <span onDoubleClick={onEditMode} >{props.title}</span>
    );
})

export default EditableSpan;