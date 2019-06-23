import React from 'react';

import './todo.css';

interface DisplayToDo {
    title: string;
    description: string;
}

interface ToDoProps {
    todo: DisplayToDo;
    deleteFn: () => void;
}

const DisplayToDo: React.FC<ToDoProps> = (props: ToDoProps) => (
    <div>
        <div className="detailsContainer">
            <div className="details">
                <div>{props.todo.title}</div>
                <div>{props.todo.description}</div>
            </div>
            <div
                onClick={props.deleteFn}
                className="delete"
            >
                X
	</div>
        </div>
    </div>
)

export { DisplayToDo };
