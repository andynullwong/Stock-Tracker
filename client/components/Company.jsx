/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Data from "./Data.jsx";

function getColor(number) {
    if (number <= -.05) {
        return "#FF0000"
    }
    else if (number < 0) {
        return "#FFFF00"
    }
    else if (number >= 0 && number < .05) {
        return "#7FFF00"
    }
    else {
        return "#00FF00"
    }
}

class Company extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={{ backgroundColor: getColor(this.props.delta) }} className='companyCard'>
            <Data body={`Ticker: ${this.props.ticker}`} id={`data${this.props.ticker}0`}/>
            <Data body={`Change: ${this.props.delta}%`} id={`data${this.props.ticker}1`}/>
            <Data body={`Current: $${this.props.currentPrice}`} id={`data${this.props.ticker}2`}/>
            <Data body={`Open: $${this.props.openPrice}`} key={`data${this.props.ticker}3`}/>
            </div>
        );
    }
}
export default Company;