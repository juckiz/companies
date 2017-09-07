const Hapi = require('hapi')

const server = new Hapi.Server()

// Get our API routes
const routes = require('./server/routes/api');

const plugins = [
  require('inert') // static file and directory handlers for hapi
]

server.register(plugins, err => {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

    server.connection({
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3001
    })

    server.route(routes);

    server.start(err => {
        if (err) {
            throw err
        }

        console.log(`Server running at ${server.info.uri}`)
    })
})
