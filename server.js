const Hapi = require('hapi')
const server = new Hapi.Server()

// declare axios for making HTTP requests
const axios = require('axios');

const API = 'http://avoindata.prh.fi/';

// add sever connection information
server.connection({
    host: 'localhost',
    port: 3001
})

// add routes
server.route([{
        method: 'GET',
        path: '/companies',
        handler: function(request, reply){
            // Get companies from the external API
            axios.get(`${API}bis/v1?companyRegistrationFrom=2014-02-28&maxResults=1000`)
                .then(companies => {
                    reply(companies.data.results).code(200);
                })
                .catch(error => {
                    console.log("ERROR: not found");
                });
        }
    }
])

server.start(function(err) {
    if(err) {
        throw err
    }
    console.log(`Server running at: ${server.info.uri}`)
})
