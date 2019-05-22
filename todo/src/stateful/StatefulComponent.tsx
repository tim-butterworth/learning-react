import React from 'react';

interface StatefulComponentProps {
    key1: string;
    key2: number;
}
interface StatefulComponentState {
    key1: string;
    key2: number;
    key3: number;
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export class StatefulComponent extends React.Component<StatefulComponentProps, StatefulComponentState> {

    constructor(props: StatefulComponentProps) {
        super(props)

        this.state = {
            ...props,
            key3: Math.random()
        };

        console.log("props", props);
        console.log("state", this.state);
    }

    render() {
        const updateText = (event: InputEvent) => {
            console.log("event", event.target.value);
            this.setState({
                key1: event.target.value
            });
        }

        return (
            <div>
                <h1>This is a stateful component</h1>
                <div>{this.state.key1}</div>
                <div>{"A random number from state: " + this.state.key3}</div>
                <div>
                    <input
                        type="text"
                        onChange={(event: InputEvent) => updateText(event)}
                    >
                    </input>
                </div>
                <div>
                    <button>
                        click me!
		    </button>
                </div>
                <div>
                    <span>state:</span>
                    <pre>{JSON.stringify(this.state)}</pre>
                </div>
                <div>
                    <span>props:</span>
                    <pre>{JSON.stringify(this.props)}</pre>
                </div>
            </div>
        )
    }
}
