import {FC, useState} from "react";
import {FilterValueType} from "../App";

type PropsType = {
    name: string;
    callback: () => void;
    filter?: string


};


export const Button: FC<PropsType> = (props: PropsType) => {


    const onclicHandler = () => {


        props.callback()


    };

    return <button
        className={props.filter === props.name ? 'btn-filter' : ''} // сравниваем название кнопки и какая была нажата


        onClick={onclicHandler}>{props.name}</button>
};


