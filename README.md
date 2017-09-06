# companies
Project contains React client and Node (hapi) server.
## About
ReactJS was a desired frontend and Node seemed like a logical choice for a server.
- create-react-app project was used to create apps to have the benefits of a more complex setup. For someone new to the technology
project configurations can be confusing and ultimately take time from development which is why create-react-app was used.
- Node was also used because it works well in more I/O heavy systems like those doing database queries
  - Also using JavaScript across used technologies unifies the language and data format (JSON) which has obvious benefits in development.
- Node with Express was more familiar technology but we went with [hapi]( https://hapijs.com/) framework. This project doesn't take full advantage of hapi's potential, except plugin system, due to it's small scale. E.g. development was not split between several team members.
  - Previous experience with Node (Express) however translated well to hapi.
- [This useful guide](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/) provided a lot of information how to proceed in very similar environment with React and Node.

## Dependencies
NPM (Node) must be installed
- [Node package manager](https://www.npmjs.com/) does everything needed such as package installation and dependency management
Installing package and save it as a dependency in package.json:
```npm install -S <package_name>```

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
#### inert
- inert provides handler methods for serving static files and directories
- Now Node can serve both static files, such as HTML, in addition to the REST API role it is commonly used

## In action
- When App, now containing an empty table, has been initially rendered, the React's componentDidMount is instructed to fetch company list using fetch(). Fetch sends request to API http://localhost:3001/companies running on our Node server which then sends a HTTP request to http://avoindata.prh.fi/bis/v1?companyRegistrationFrom=2014-02-28&maxResults=1000.
  - companyRegistrationFrom seems to be required
  - maxResults only returns values when <= 1000, otherwise we got a Bad Request
- JSON response is then checked and returned to App and assigned to it's state thus causing a re-render of App and the table it contains, now with data.
- List of companies can then be filtered using DatePicker to show companies registered on given day
  - There was a question whether the returned JSON should be parsed in server's or client's side.
  - This app parses the JSON in client side. This is really responsive even with 1000 entries.
  - Obviously this can become an issue when using very large dataset.
- Only time API is called is in initial load of page and when pushing "reload"-button to reset the filter.
  - Otherwise filtering and sorting companies is done in client's side.

### Conclusion
This project was a good look into ReactJS as client-side app. Having used ReactJS for the first time it seemed to work just fine but at this point it is difficult to go deep into the pros and cons of this UI library.
I learned a lot doing this project. Obviously ReactJS was a new technology and I feel I now have a basic understanding to build on. I also learned more about NPM and dependency management and in general I have deeper understanding about web development.
Once again the importance of choosing right components for the application became obvious. Designing the application before frantically diving into development is crucial.
