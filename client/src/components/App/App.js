import React from 'react';
import Client from "../Client/Client";
import Helper from "../Helper/Helper";

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
        let currentComponent = this;
        let selectedDate = this.state.startDate;
        let companiesList = this.state.fullData;
        let selectedCompanies = [];

        selectedCompanies = Helper.parseCompaniesJSON(companiesList, selectedDate);

        currentComponent.setState({
            data: selectedCompanies
        });
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

    // update selected date to state on selecting date
    dateChanged(date) {
        this.setState({
            startDate: date
        }, function() {
            this.selectCompanies();
        });

    }

    componentDidMount() {
        this.fetchCompanies();
    }

    render() {
        const tableData = this.state.data;
        return (
            <div>
                <div clasName="header-row"><span className="h1">Registered companies</span></div>
                <div className="date-select-row">
                    <div className="date-select-elements">
                        <div className="date-label">Filter by date</div>
                        <div className="date-picker">
                            <DatePicker
                                dateFormat="DD.MM.YYYY"
                                selected={this.state.startDate}
                                onChange={this.dateChanged}
                            />
                        </div>
                        <button onClick={this.reloadCompanies}>
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
