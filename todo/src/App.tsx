import React from 'react';
import './App.css';
import { StatefulComponent } from './stateful/StatefulComponent';

const App: React.FC = () => (
    <div className="App">
        <StatefulComponent
            key1="some value"
            key2={100}
        />
    </div >
);

export default App;
