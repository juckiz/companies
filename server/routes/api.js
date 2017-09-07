const Path = require('path')
// declare axios for making HTTP requests
const axios = require('axios');
const API = 'http://avoindata.prh.fi/';

module.exports = [
    {
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
              path: Path.join(__dirname, '../../client/build'),
              listing: false,
              index: true
            }
        }
    },
    {
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
];
