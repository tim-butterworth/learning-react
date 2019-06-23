import React from 'react';
import * as R from 'ramda';
import {
    DisplayToDo
} from './ToDo';
import {
    ToDoForm
    , FormState
} from './ToDoForm';
import {
    getNavigationChooser
    , MOVEMENT
} from './firstMiddleLast';
import {
    MoveToDo
    , moveUp
    , moveDown
} from './MoveToDo';

import './roottodo.css';

export interface ToDo {
    id: number;
    title: string;
    description: string;
}

interface Form<T> {
    data: T;
    formState: FormState;
    validationError: String[];
}
interface ToDoFormData {
    title: string;
    description: string;
};

interface ToDos {
    todos: ToDo[];
};
interface Forms {
    forms: {
        todoForm: Form<ToDoFormData>;
    }
};
interface ToDoState extends ToDos, Forms { };

type updateState = (state: ToDoState, props: {}) => Partial<ToDoState>;
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : DeepPartial<T[P]>
}

const initialToDoForm = (): Form<ToDoFormData> => ({
    data: {
        title: "",
        description: ""
    },
    formState: FormState.NORMAL,
    validationError: []
})

const initialState = (
    todoFormProvider: () => Form<ToDoFormData>,
    idProvider: () => number
) => ({
    todos: [
        {
            id: idProvider(),
            title: "title1",
            description: "description1"
        },
        {
            id: idProvider(),
            title: "title2",
            description: "description2"
        },
        {
            id: idProvider(),
            title: "title3",
            description: "description3"
        }
    ],
    forms: {
        todoForm: todoFormProvider()
    }
})

type SetState = <K extends "todos" | "forms">(state: ToDoState | ((prevState: Readonly<ToDoState>, props: Readonly<{}>) => ToDoState | Pick<ToDoState, K> | null) | Pick<ToDoState, K> | null) => void;

export class RootToDo extends React.Component<{}, ToDoState> {

    private boundSetState: SetState
    private currentId: number = 0

    constructor(props: {}) {
        super(props);

        this.state = initialState(initialToDoForm, this.nextId.bind(this));
        this.boundSetState = this.setState;
    }

    nextId(): number {
        const idToReturn = this.currentId;
        this.currentId++;
        return idToReturn;
    }

    render() {
        const { title, description } = this.state.forms.todoForm.data
        const getShifter = (
            otherIndexProvider: (index: number) => number
        ) => (todo: ToDo, todos: ToDo[]): ToDo[] => {
            const copy = [...todos];
            const index = copy.indexOf(todo);
            const otherIndex = otherIndexProvider(index);

            const temp = copy[otherIndex];
            copy[otherIndex] = todo;
            copy[index] = temp;

            return copy;
        };

        const shiftDown = getShifter((index: number) => index + 1);
        const shiftUp = getShifter((index: number) => index - 1);
        const mapIndexed = R.addIndex<ToDo>(R.map);

        const navigationChooser = getNavigationChooser({ start: 0, finish: (this.state.todos.length - 1) })
        const getConverter = (descend: React.FC, ascend: React.FC) => (navigationOptions: Set<MOVEMENT>) => {
            const result: Partial<{ up: React.FC; down: React.FC }> = {};
            navigationOptions.forEach((option: MOVEMENT) => {
                if (option === MOVEMENT.DESCEND) {
                    result["down"] = descend;
                }

                if (option === MOVEMENT.ASCEND) {
                    result["up"] = ascend;
                }
            })

            return result;
        }

        const getToDoShifter: (
            todo: ToDo,
            shift: (todo: ToDo, todos: ToDo[]) => ToDo[]
        ) => () => void = (
            todo: ToDo,
            shift: (todo: ToDo, todos: ToDo[]) => ToDo[]
        ) => () => this.boundSetState(
            (state: ToDoState, props: {}) => ({ todos: shift(todo, state.todos) })
        )

        return (
            <div>
                <ToDoForm
                    data={{ title, description }}
                    formState={{ state: this.state.forms.todoForm.formState }}
                    formFunctions={{
                        idProvider: this.nextId.bind(this),
                        updateTitle: (updatedTitle: string) => this.boundSetState(
                            (state: ToDoState, props: {}): ToDoState => Object.assign(
                                {},
                                state,
                                {
                                    forms: {
                                        todoForm: Object.assign({}, state.forms.todoForm, {
                                            data: Object.assign({}, state.forms.todoForm.data, {
                                                title: updatedTitle
                                            })
                                        })
                                    }
                                }
                            )
                        ),
                        updateDescription: (updatedDescription: string) => this.boundSetState(
                            (state: ToDoState, props: {}): ToDoState => Object.assign(
                                {},
                                state,
                                {
                                    forms: {
                                        todoForm: Object.assign({}, state.forms.todoForm, {
                                            data: Object.assign({}, state.forms.todoForm.data, {
                                                description: updatedDescription
                                            })
                                        })
                                    }
                                }
                            )
                        ),
                        submitToDo: (todo: ToDo) => this.boundSetState(
                            (state: ToDoState, props: {}): ToDoState => {
                                return Object.assign({}, state, {
                                    todos: [todo, ...state.todos]
                                })
                            }
                        ),
                        updateFormState: (formState: FormState) => this.boundSetState(
                            (state: ToDoState, props: {}): ToDoState => ({
                                todos: state.todos,
                                forms: Object.assign({}, state.forms, {
                                    todoForm: {
                                        formState: formState,
                                        data: this.state.forms.todoForm.data
                                    }
                                })
                            })
                        ),
                        resetForm: () => this.boundSetState(
                            (state: ToDoState, props: {}): ToDoState => Object.assign(
                                {},
                                state,
                                {
                                    forms: {
                                        todoForm: {
                                            data: {
                                                title: "",
                                                description: ""
                                            },
                                            formState: state.forms.todoForm.formState
                                        },
                                    },
                                }
                            )
                        )
                    }}
                />
                <div>
                    {mapIndexed(
                        (todo, index) => (
                            <MoveToDo
                                key={todo.id}
                                {...navigationChooser(
                                    index,
                                    getConverter(
                                        moveDown(getToDoShifter(todo, shiftDown)),
                                        moveUp(getToDoShifter(todo, shiftUp))
                                    )
                                )}
                                child={
                                    () => DisplayToDo({
                                        todo, deleteFn: () => this.boundSetState(
                                            (state: ToDoState, props: {}) => ({
                                                todos: R.filter((toFilter) => toFilter !== todo, state.todos)
                                            })
                                        )
                                    })
                                }
                            />
                        ),
                        this.state.todos
                    )}
                </div>
            </div >
        )
    }
}
