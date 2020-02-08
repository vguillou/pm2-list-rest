const pm2 = require('pm2');
const processDescriptionListTransformer = require('./processDescriptionList.transformer');
const { respondData, respondError } = require('../utils/requestHandler.utils');

/**
 * GET /pm2/list request handler
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 */
module.exports = function requestHandler(request, response) {
    pm2.list((err, processDescriptionList) => {
        if (err) {
            console.warn('PM2 list error', err);
            return respondError(response, err);
        }
        return respondData(
            response,
            processDescriptionListTransformer(processDescriptionList)
        );
    });
};
