import {FC, useState} from "react";
import {FilterValueType} from "../App";

type PropsType = {
    name: string;
    callback: () => void;
    filter?: FilterValueType


};


export const Button: FC<PropsType> = (props: PropsType) => {


    const onclicHandler = () => {


        props.callback()


    };

    return <button
        className={props.filter === "Completed" ? 'btn-filter' : ''}


        onClick={onclicHandler}>{props.name}</button>
};


