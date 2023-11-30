import React, {ChangeEvent, useState} from 'react';

type PropsType={
    oldTitle:string
    callBack:(newTitle:string)=>void
}

export const EditableSpans =(props:PropsType)=>{
    const [edit,setDit]=useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)

    const editHadler =()=>{

        setDit(!edit)
        if(edit)
            updateTAsk()

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const updateTAsk=()=>{
        props.callBack(newTitle)
    }

    return(
        edit
        ?<input onChange={onChangeHandler} onBlur={editHadler} value={newTitle} autoFocus/>
   :<span onDoubleClick={editHadler}>{props.oldTitle}</span>
    )
}

