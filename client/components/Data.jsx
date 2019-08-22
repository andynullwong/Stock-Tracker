import React, { Component } from 'react';

class Data extends Component {
    constructor(props) {
        super(props);
    }
    // const { ticker, openPrice, currentPrice } = props;

    render() {
        return (
            <div>{this.props.body}</div>
        )
    }
}
export default Data;