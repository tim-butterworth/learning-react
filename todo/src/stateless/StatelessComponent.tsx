import React from 'react';

interface StatelessProps {
    prop1: string;
    prop2: number;
    stateCallback: () => void;
}

const Stateless: React.FC<StatelessProps> = ({
    prop1,
    prop2,
    stateCallback
}: StatelessProps): JSX.Element => {
    console.log("Rendering the stateless child!");

    return (
        <div>
            <h1>This is a stateless component</h1>
            <div>
                <div>{prop2}</div>
                <button
                    onClick={
                        (event) => {
                            event.preventDefault();
                            stateCallback();
                        }
                    }
                >
                    increment
		</button>
            </div>
        </div>
    )
}
export { Stateless }
