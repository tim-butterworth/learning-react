import React from 'react';

import { Stateless } from '../stateless/StatelessComponent';
import { coreService } from '../core/coreService';

interface StatefulComponentProps {
    key1: string;
    key2: number;
}
interface StatefulComponentState {
    key1: string;
    key2: number;
    key3: number;
    random: number;
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export class StatefulComponent extends React.Component<StatefulComponentProps, StatefulComponentState> {

    constructor(props: StatefulComponentProps) {
        super(props)

        this.state = {
            ...props,
            key3: 0,
            random: Math.random()
        };

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
                        value={this.state.key1}
                    >
                    </input>
                </div>
                <div>
                    <button>
                        click me!
		    </button>
                </div>
                <div className="state-container">
                    <div className="component-state">
                        <span>state:</span>
                        <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    </div>
                    <div className="component-props">
                        <span>props:</span>
                        <pre>{JSON.stringify(this.props, null, 2)}</pre>
                    </div>
                </div>
                <div>
                    <Stateless
                        prop1=""
                        prop2={this.state.key3}
                        stateCallback={() => this.setState({ key3: this.state.key3 + 1 })}
                    />
                </div>
                <div>
                    <div>
                        <div>
                            <h1>
                                Use a Service
			    </h1>
                        </div>
                        <button
                            onClick={
                                (event) => {
                                    event.preventDefault();
                                    this.setState({ random: Math.random() });
                                }
                            }
                        >
                            Next Random
			</button>
                    </div>
                    {coreService<JSX.Element>(
                        this.state.random,
                        {
                            success: () => (<div>SUCCESS</div>),
                            failure: () => (<div>TOO LOW</div>)
                        }
                    )}
                </div>
            </div>
        )
    }
}
