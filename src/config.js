function configStringToArray(str) {
    return (str || '')
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length);
}

module.exports = {
    /**
     * Port to serve the rest API
     * @type {string}
     */
    serverPort: undefined,

    /**
     * Names of the `pm2_env` properties to include for each process
     * @type {Array<string>}
     */
    excludedProcesses: undefined,

    /**
     * Names of the `pm2_env` properties to include for each process
     * @type {Array<string>}
     */
    includedPm2EnvProperties: undefined,

    /**
     * Initialize the configuration
     * @param {*} conf PMX config object
     */
    initConfig(conf) {
        this.serverPort = conf.port;
        this.excludedProcesses = configStringToArray(conf['exclude-processes']);
        this.includedPm2EnvProperties = configStringToArray(
            conf['include-pm2-env-properties']
        );
    },
};
