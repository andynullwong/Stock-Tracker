import React, { Component } from 'react';
import { render } from 'react-dom';

class Data extends Component {
    // const { ticker, openPrice, currentPrice } = props;

    render() {
        return (
            <div>{this.props.body}</div>
        )
    }
}
export default Data;