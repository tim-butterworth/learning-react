import React from 'react';

const moveUp: (move: () => void) => React.FC<{}> = (move) => (): JSX.Element => (
    <div
        className="move"
        onClick={() => move()}
    >
        /\
    </div>
)

const moveDown: (move: () => void) => React.FC<{}> = (move) => (): JSX.Element => (
    <div
        className="move"
        onClick={() => move()}
    >
        \/
    </div>
)

const emptyNavigation: React.FC<{}> = () => (
    <div className="move">
    </div>
)

interface Moves {
    up: React.FC<{}>;
    down: React.FC<{}>;
    child: React.FC<{}>;
}

const MoveToDo: React.FC<Partial<Moves>> = (props: Partial<Moves>): JSX.Element => {
    const defaultValues: Moves = {
        up: emptyNavigation,
        down: emptyNavigation,
        child: () => (<div></div>)
    }

    const resolvedProps = Object.assign({}, defaultValues, props);

    return (
        <div className="todoContainer">
            <div className="moves">
                {resolvedProps.up({})}
                {resolvedProps.down({})}
            </div>
            <div className="todo">
                {resolvedProps.child({})}
            </div>
        </div>
    )
}

export {
    MoveToDo
    , moveUp
    , moveDown
};
