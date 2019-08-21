import React, { Component } from 'react';
import { render } from 'react-dom';
import Company from "./Company.jsx";

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <Company ticker='MFST' openPrice={100} currentPrice={110} id={`company${0}`}/>
            <Company ticker='GOOG' openPrice={200} currentPrice={210} id={`company${1}`}/>
            <Company ticker='AAPL' openPrice={300} currentPrice={310} id={`company${2}`}/>
            </div>
        );
    }
}
export default App;