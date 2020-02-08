const http = require('http');
const listRequestHandler = require('./list/requestHandler');
const { respondError } = require('./utils/requestHandler.utils');

/**
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 */
function requestListener(request, response) {
    if (request.url === '/pm2/list' && request.method === 'GET') {
        return listRequestHandler(request, response);
    }
    return respondError(response, 'Not found', 404);
}

module.exports = function(port) {
    return http
        .createServer(requestListener)
        .listen(port, function listener(err) {
            if (err) return console.error('Could not start HTTP server:', err);
            console.log(`HTTP server is listening on ${port}`);
        });
};
