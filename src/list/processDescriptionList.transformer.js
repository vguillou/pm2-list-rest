const pick = require('object.pick');
const config = require('../config');

/**
 * @param {import('pm2').ProcessDescription} processDescription
 */
function filterExludedProcesses(processDescription) {
    return (
        processDescription &&
        processDescription.name &&
        !config.excludedProcesses.includes(processDescription.name)
    );
}

/**
 * @param {import('pm2').ProcessDescription} processDescription
 */
function pickProcessDescriptionProperties(processDescription) {
    if (!config.includedPm2EnvProperties.length) return processDescription;

    return {
        ...processDescription,
        pm2_env: pick(
            processDescription.pm2_env,
            config.includedPm2EnvProperties
        ),
    };
}

/**
 * @param {import('pm2').ProcessDescription[]} processDescriptionList
 */
module.exports = function(processDescriptionList) {
    return (processDescriptionList || [])
        .filter(filterExludedProcesses)
        .map(pickProcessDescriptionProperties);
};
