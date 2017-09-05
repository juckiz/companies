import React from 'react';
import Client from "./Client";

import 'react-table/react-table.css';
import ReactTable from 'react-table';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

import moment from 'moment';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            fullData: [], // full company list not to be modified by filtering etc.
            data: [{    // current data displayed by table
                businessId: '',
                name: '',
                registrationDate: ''
            }],
            startDate: moment() // selected date to show companies
        };

        // binding is necessary to make `this` work
        this.dateChanged = this.dateChanged.bind(this);
        this.selectCompanies = this.selectCompanies.bind(this);
        this.reloadCompanies = this.reloadCompanies.bind(this);
    }

    // List only companies with date we are filtering
    selectCompanies() {
        let selectedDate = this.state.startDate;
        let companiesList = this.state.fullData;
        let selectedCompanies = [];

        for(let i = 0; i < companiesList.length; i++) {
            let obj = companiesList[i];
            // https://momentjs.com/docs/#/query/is-same/
            if(moment(selectedDate).isSame(obj.registrationDate, 'day')) {
                selectedCompanies.push(obj);
            }
        }

        // Populate table data with only filtered values
        this.setState({
            data: selectedCompanies
        })
    }

    // reload displayed company list
    reloadCompanies() {
        this.setState({
            data: this.fetchCompanies()
        });
    }

    // API call to get companies
    fetchCompanies() {
        let currentComponent = this;

        Client.getCompanies(function(data) {
            currentComponent.setState({
                data: data,
                fullData: data
            });
        });
    }

    // update selected date to state
    dateChanged(date) {
        this.setState({
            startDate: date
        });
    }

    componentDidMount() {
        this.fetchCompanies();
    }

    render() {
        const tableData = this.state.data;
        return (
            <div>
                <div className="date-select-row">
                    <div className="date-select-elements">
                        <DatePicker
                            dateFormat="DD.MM.YYYY"
                            selected={this.state.startDate}
                            onChange={this.dateChanged}
                        />
                        <button onClick={this.selectCompanies}>
                            Filter by date
                        </button>
                        <button style={{float:'right'}} onClick={this.reloadCompanies}>
                            Reload
                        </button>
                    </div>
                </div>
                <ReactTable
                    data = {tableData}
                    style = {{textAlign: 'center'}}
                    columns = {[
                        {
                            Header: "Business id",
                            accessor: "businessId"
                        },
                        {
                            Header: "Company name",
                            accessor: "name"
                        },
                        {
                            Header: "Registered",
                            accessor: "registrationDate"
                        },
                    ]}
                    defaultPageSize = {20}
                    className = "-striped -highlight"
                />
                <br />
            </div>
        );
    }
}
export default App;
