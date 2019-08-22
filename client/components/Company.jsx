/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { render } from 'react-dom';
import Data from "./Data.jsx";

class Company extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='companyCard'>
            <Data body={`Ticker: ${this.props.ticker}`} id={`data${this.props.ticker}0`}/>
            <Data body={`Change: ${this.props.delta}%`} id={`data${this.props.ticker}1`}/>
            <Data body={`Current: $${this.props.currentPrice}`} id={`data${this.props.ticker}2`}/>
            <Data body={`Open: $${this.props.openPrice}`} id={`data${this.props.ticker}3`}/>
            </div>
        );
    }
}
export default Company;