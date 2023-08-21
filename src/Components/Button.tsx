import { FC } from "react";

type PropsType = {
  name: string;
  callback: () => void;

  
};

export const Button: FC<PropsType> = (props: PropsType) => {
  const onclicHandler = () => {
    props.callback()
  };
  return <button onClick={onclicHandler}>{props.name}</button>;
};
