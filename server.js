const Hapi = require('hapi')

// create new server with host and port
const server = new Hapi.Server()

// declare axios for making HTTP requests
const axios = require('axios');

const API = 'http://avoindata.prh.fi/';

// add sever connection information
server.connection({
    host: 'localhost',
    port: 3001,
    routes: { cors: true }
})

/*
var parseShit = function(allCompanies)
{
  return
}
*/

// add routes
server.route([
  {
    method: 'GET',
    path: '/',
    handler: function(request, reply){
        reply("Hello world...")
    }
  },
  {
    method: 'GET',
    path: '/companies',
    handler: function(request, reply){
        // Get companies from the external API //+request.params.fromDate+
        axios.get(`${API}bis/v1?companyRegistrationFrom=2014-02-28&maxResults=1000`)
          .then(companies => {
            //console.log(companies.data.results);
            reply(companies.data.results).code(200);
          })
          .catch(error => {
            console.log("ERROR: not found");
          });
    }
  }
])

// start server
server.start(function(err) {
    if(err){
        throw err
    }
// TODO fix server.info.url
    console.log("Server running at: ", server.info.url)
})
