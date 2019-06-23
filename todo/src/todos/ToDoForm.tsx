import React from 'react';

import './todoform.css'
import { ToDo } from './RootToDo';

export enum FormState {
    NORMAL, SUCCESSFUL_SUBMISSION, FAILURE_SUBMISSION
}

export interface ToDoFormProps {
    data: {
        title: string;
        description: string;
    };
    formState: {
        state: FormState;
    };
    formFunctions: {
        idProvider: () => number;
        updateTitle: (title: string) => void;
        updateDescription: (description: string) => void;
        submitToDo: (todo: ToDo) => void;
        updateFormState: (formState: FormState) => void;
        resetForm: () => void;
    };
}

const displayFromState = (state: FormState) => {
    switch (state) {
        case FormState.NORMAL:
            return "normal"
        case FormState.SUCCESSFUL_SUBMISSION:
            return "success"
        case FormState.FAILURE_SUBMISSION:
            return "failure"
        default:
            return ""
    }
}

const ToDoForm: React.FC<ToDoFormProps> = (props: ToDoFormProps) => (
    <div className={`todoform ${displayFromState(props.formState.state)}`}>
        <div>Enter a new TODO</div>
        <div className="todo-input">
            <div className="input-row">
                <div className="label">Title:</div>
                <div className="input">
                    <input
                        type="text"
                        value={props.data.title}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => props.formFunctions.updateTitle(
                                event.target.value
                            )
                        }
                    >
                    </input>
                </div>
            </div>
            <div className="input-row">
                <div className="label">Description:</div>
                <div className="input">
                    <input
                        type="text"
                        value={props.data.description}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => props.formFunctions.updateDescription(
                                event.target.value
                            )
                        }
                    >
                    </input>
                </div>
            </div>
            <div>
                <button
                    onClick={
                        (event: React.FormEvent<HTMLButtonElement>) => {
                            event.stopPropagation();

                            props.formFunctions.submitToDo({
                                id: props.formFunctions.idProvider(),
                                title: props.data.title,
                                description: props.data.description
                            });
                            props.formFunctions.updateFormState(FormState.SUCCESSFUL_SUBMISSION);
                            props.formFunctions.resetForm();
                            setTimeout(() => props.formFunctions.updateFormState(FormState.NORMAL), 1000);
                        }
                    }
                >
                    Add ToDo
	    </button>
            </div>
        </div>
    </div >
)

export { ToDoForm };
