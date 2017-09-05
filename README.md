# companies
Project contains React client and Node (hapi) server. 
## Foreword
ReactJS was a desired frontend and Node seemed like a logical choice for a server.
- create-react-app project was used to create apps to have the benefits of a more complex setup. For someone new to the technology 
project configurations can be confusing and ultimately take time from development which is why create-react-app was used.
- Node with Express was more familiar technology but we went with [hapi]( https://hapijs.com/) framework. This project doesn't take full advantage of hapi's potential due to it's small scale. E.g. this was not split between several team members. 
  - One could argue Express would have been as good a choice.
  - Previous experience with Node (Express) however translated directly to hapi.
- [This useful guide](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) provided a lot of information how to proceed in very similar environment with React and Node.

## Dependencies
NPM (Node) must be installed
- [Node package manager](https://www.npmjs.com/) does everything needed such as package installation and dependency management

## Initialization
- Both projects' dependencies need to be initialized from package.json by running ```npm install``` in their folders. 
  - project root for Node
  - client folder for React
- This creates node_modules folders with specified libraries.  

Development environment was configured so you can run server and client with one command, for convenience in development.
- Run both Node server and React client in project root with ```npm start```
- This is the same as running 
  - ```node server.js``` in project root
  - ```npm start``` in client folder
```
> company-listing@1.0.0 start C:\Users\juckiz\test_projects\companies
> concurrently "npm run server" "npm run client"

[0]
[0] > company-listing@1.0.0 server C:\Users\juckiz\test_projects\companies
[0] > node server.js
[0]
[1]
[1] > company-listing@1.0.0 client C:\Users\juckiz\test_projects\companies
[1] > node start-client.js
[1]
[0] Server running at: http://localhost:3001
[1]
[1] > client@0.1.0 start C:\Users\juckiz\test_projects\companies\client
[1] > react-scripts start
[1]
[1] Starting the development server...
[1]
[1] Compiled successfully!
[1]
[1] You can now view client in the browser.
[1]
[1]   http://localhost:3000/
[1]
[1] Note that the development build is not optimized.
[1] To create a production build, use npm run build.
```

## Modules
Some additional modules were used for convenience
### ReactJS
#### react-table 
```
<ReactTable
  data = {tableData}
  style = {{textAlign: 'center'}}
  columns = {[
    {
      Header: "Business id",
      accessor: "businessId"
    },
```    
- react-table provides a nice table with pre-built sorting and paging functionalities
#### react-datepicker
```
<DatePicker
  dateFormat="DD.MM.YYYY"
  selected={this.state.startDate}
  onChange={this.dateChanged}
/>
```
- react-datepicker provides a pop-up calendar and date select functionality
### Node.js (hapi)
#### Axios
- In this project Axios was used to make HTTP request to specified external api.
- Axios was used in previous project and was used in this one because we are dealing with asynchronous events and Axios is promise based HTTP client. Standard HTTP library doesn't support this.
