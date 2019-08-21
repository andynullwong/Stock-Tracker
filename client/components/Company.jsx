import React, { Component } from 'react';
import { render } from 'react-dom';
import Data from "./Data.jsx";

class Company extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <Data body={this.props.ticker} id={`data${this.props.ticker}0`}/>
            <Data body={this.props.currentPrice} id={`data${this.props.ticker}1`}/>
            <Data body={this.props.openPrice} id={`data${this.props.ticker}2`}/>
            </div>
        );
    }
}
export default Company;