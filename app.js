const pmx = require('pmx');
const pm2 = require('pm2');
const http = require('http');
const pick = require('object.pick');

pmx.initModule({}, startModule);

let excludedProcesses;
let includedPm2EnvProperties;

function startModule(err, conf) {
  if (err) return console.error('PM2 connection error', err);

  pm2.connect(function(e) {
    if (e) return console.error('PM2 connection error', e);

    const port = conf.port;
    excludedProcesses = configStringToArray(conf['exclude-processes']);
    includedPm2EnvProperties = configStringToArray(conf['include-pm2-env-properties']);
    
    startHttpServer(port);
  });
}

function configStringToArray(str) {
  return (str || '')
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length);
}

function startHttpServer(port) {
  http.createServer(requestHandler)
    .listen(port, (err) => {
      if (err) return console.error('Could not start HTTP server:', err);

      console.log(`HTTP server is listening on ${port}`);
    });
}

/**
 * 
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 */
const requestHandler = (request, response) => {

  if (request.method !== 'GET' || request.url !== '/pm2/list') {
    return respondError(response, 'Not found', 404);
  }

  pm2.list((err, processDescriptionList) => {
    if (err) {
      console.warn('PM2 list error', err);
      return respondError(response, err);
    }

    const processData = buildProcessData(processDescriptionList);
    return respondData(response, processData);
  });
}

/**
 * @param {import('pm2').ProcessDescription[]} processDescriptionList
 */
function buildProcessData(processDescriptionList) {
  return (processDescriptionList || [])
    .filter(filterExludedProcesses)
    .map(pickProcessDescriptionProperties);
}

/**
 * @param {import('pm2').ProcessDescription} processDescription 
 */
function filterExludedProcesses(processDescription) {
  return processDescription && processDescription.name && !excludedProcesses.includes(processDescription.name);
}

/**
 * @param {import('pm2').ProcessDescription} processDescription 
 */
function pickProcessDescriptionProperties(processDescription) {
  if (!includedPm2EnvProperties.length) return processDescription;
  else {
    return {
      ...processDescription,
      pm2_env: pick(processDescription.pm2_env, includedPm2EnvProperties),
    };
  }
}

/**
 * @param {@param {import('http').ServerResponse} response
 * @param {*} error 
 */
function respondError(response, error, statusCode = 500) {
  response.writeHead(statusCode, {'Content-Type': 'application/json'});
  response.write(JSON.stringify({ error }));
  return response.end();
}

/**
 * @param {@param {import('http').ServerResponse} response
 * @param {*} data 
 */
function respondData(response, data, statusCode = 200) {
  response.writeHead(statusCode, {'Content-Type': 'application/json'});
  response.write(JSON.stringify(data));
  return response.end();
}
