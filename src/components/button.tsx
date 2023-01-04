import React from "react";

interface Props {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

export function Button(props: Props): JSX.Element {
    return (
        <button onClick={props.onClick} className={props.className}>
            {props.text}
        </button>
    );
}
