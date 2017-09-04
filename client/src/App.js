import React from 'react';
import Client from "./Client";
import { render } from "react-dom";
//import ReactDOM from 'react-dom';
//import './index.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class App extends React.Component {

  constructor() {
    console.log("constructor");
    super();

    // Set initial value to get around async
    this.state = {
        fullData: [], // Original, full company list not to be modified by filtering etc.
        data: [{    // empty data later filled from http://avoindata.prh.fi/ytj.html
          businessId: '',
          name: '',
          registrationDate: ''
        }],
        startDate: moment() // selected date to show companies
    };

    // This binding is necessary to make `this` work like in handleClick
    //this.companiesForDate = this.companiesForDate.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
    this.parseCompanyDates = this.parseCompanyDates.bind(this);
    this.reloadCompanies = this.reloadCompanies.bind(this);
  }

  // TODO move to API component
  // List only companies with date we are filtering
  parseCompanyDates() {
      console.log("parse companies JSON");
      let selectedDate = this.state.startDate;
      let companiesList = this.state.data;
      let selectedCompanies = [];

      for(let i = 0; i < companiesList.length; i++) {
          let obj = companiesList[i];
          // This is kind of crappy... https://momentjs.com/docs/#/query/is-same/
          if(moment(selectedDate).isSame(obj.registrationDate, 'day')) {
              selectedCompanies.push(obj);
          }
      }

      // Populate table data with only filtered values
      this.setState({
          data: selectedCompanies
      })
  }

  // date changes with DatePicker when selecting from calendar
  dateChanged(date) {
    this.setState({
      startDate: date
    });
  }

  // reload displayed company list from originally populated list
  reloadCompanies() {
      this.setState({
        data: this.state.fullData
      });
  }

  fetchCompanies() {
    // Cache reference to 'this' outside api call
    // Calling 'this' inside api callback doesn't work
    // https://forum.freecodecamp.org/t/react-question-cannot-read-property-setstate-of-undefined/69620/7
    // Arrow functions should work????
    let currentComponent = this;
    fetch('/companies', {
      accept: "application/json"
    })
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          response.json().then((data) => {
            console.log("companies fetched");
            currentComponent.setState({
                data: data
            });
            currentComponent.setState({
                fullData: data
            });
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  }

  componentDidMount(){
    // Get ALL companies
    // TODO move to API component
    this.fetchCompanies();
  }

  render() {
    console.log("render");
    const { data } = this.state;
    return (
      <div>
      <DatePicker
              dateFormat="YYYY/MM/DD"
              selected={this.state.startDate}
              onChange={this.dateChanged}
          />
      <button onClick={this.parseCompanyDates}>
        Filter by date
      </button>
      <button onClick={this.reloadCompanies}>
        Reset filter
      </button>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Y-Tunnus",
              accessor: "businessId"
            },
            {
              Header: "Nimi",
              accessor: "name"
            },
            {
              Header: "Rekisteröity",
              accessor: "registrationDate"
            },
          ]}
          defaultPageSize={20}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}
export default App;
