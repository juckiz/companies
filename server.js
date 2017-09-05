const Hapi = require('hapi')
const Path = require('path')
const server = new Hapi.Server()

const plugins = [
  require('inert') // static file and directory handlers for hapi
]

// declare axios for making HTTP requests
const axios = require('axios');

const API = 'http://avoindata.prh.fi/';

server.register(plugins, err => {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

    server.connection({
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3001
    })

    // route to serve static assets at http://localhost:3001/index.html
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
              path: Path.join(__dirname, 'client/build'),
              listing: false,
              index: true
            }
        }
    })

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

    server.start(err => {
        if (err) {
            throw err
        }

        console.log(`Server running at ${server.info.uri}`)
    })
})
