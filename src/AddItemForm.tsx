import React, {ChangeEvent, Component, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    title: string
}

function AddItemForm (props: AddItemFormPropsType)  {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    // const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    //     setError(true)
    // }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem();
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle){
            props.addItem(trimmedTitle)
        } else  {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
            variant={"outlined"}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            onBlur={() => setError(false)}
            helperText={error ? "Title is required!" : ""}
            label={"Title"}
            error={error}

            />
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*       onBlur={() => {*/}
            {/*           setError(false)*/}
            {/*       }}*/}
            {/*/>*/}
            <IconButton onClick={addItem}>
                <AddBox />
            </IconButton>
            {/*<button onClick={addItem}>+</button>*/}
            {/*{error && <div className={"error-message"}>Title is required!</div>}*/}
        </div>
    )}

export default AddItemForm;



