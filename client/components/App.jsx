/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Company from "./Company.jsx";

function delta(currentPrice, openPrice) {
    return ((currentPrice/openPrice)-1).toFixed(2);
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            companies: {},
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const userInput = (event.target[0].value);
        event.target[0].value = '';
        // const newState = Object.create(this.state);
        fetch(`/api/${userInput}`)
        .then(data => data.json())
        .then(data => {
            this.setState((prevState) => {
                const companiesObj = {...prevState.companies};
                companiesObj[userInput] = data.prices;
                console.log("Time:", prevState.time, "Companies",companiesObj)
                return ({
                    time: prevState.time,
                    companies: companiesObj
                })
            }
            );
        })
        .catch(err => console.error(err));
    }

    render() {
        console.log(Object.keys(this.state.companies).length);
        const companyList = [];
        for (let company in this.state.companies) {
            companyList.push(
            <Company 
                key = {`ticker${company}`}
                ticker = {company}
                openPrice = {this.state.companies[company][0]} 
                currentPrice = {this.state.companies[company][this.state.time]}
                delta = {delta(this.state.companies[company][this.state.time], this.state.companies[company][0])} 
            />)
        }
        console.log(companyList);

        return (
            <div><div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Ticker:&nbsp;
                        <input type="text" name="tickerBox" />
                    </label>
                    &nbsp;<input type="submit" value="Submit" />
                </form>
            </div>
            <br />
            <div className='tradingFloor'>
            {companyList}
            {/* <Company ticker='MFST' openPrice={100} currentPrice={110} delta={delta(110, 100)} id={`company${0}`}/>
            <Company ticker='GOOG' openPrice={200} currentPrice={210} delta={delta(210, 200)} id={`company${1}`}/>
            <Company ticker='AAPL' openPrice={300} currentPrice={310} delta={delta(310, 300)} id={`company${2}`}/> */}
            </div></div>
        );
    }
}
export default App;