/**
 * Respond with data as JSON
 * @param {import('http').ServerResponse} response
 * @param {*} data Data to be written as the JSON body of the reponse
 * @param {statusCode} [statusCode=200] Status code of the response (200 by default)
 */
function respondData(response, data, statusCode = 200) {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(data));
    return response.end();
}

/**
 * Respond with an error
 * @param {import('http').ServerResponse} response
 * @param {string} error Error string write in the response
 * @param {statusCode} [statusCode=500] Status code of the response (500 by default)
 */
function respondError(response, error, statusCode = 500) {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify({ error }));
    return response.end();
}

module.exports = {
    respondError,
    respondData,
};
