import React, { Component } from 'react';
import { render } from 'react-dom';
import Company from "./Company.jsx";

function delta(currentPrice, openPrice) {
    return ((currentPrice/openPrice)-1).toFixed(2);
}

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='tradingFloor'>
            <Company ticker='MFST' openPrice={100} currentPrice={110} delta={delta(110, 100)} id={`company${0}`}/>
            <Company ticker='GOOG' openPrice={200} currentPrice={210} delta={delta(210, 200)} id={`company${1}`}/>
            <Company ticker='AAPL' openPrice={300} currentPrice={310} delta={delta(310, 300)} id={`company${2}`}/>
            </div>
        );
    }
}
export default App;