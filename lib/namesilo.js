const axios = require('axios')
const _ = require('lodash')
var debug = require('debug')('namesilo')

/**
 * Create an instance of NameSilo
 *
 * @param apiKey The NameSilo api key
 * @param {Object} config The config for the instance
 */
const NameSilo = function(apiKey, config) {
    debug(`NameSilo constructor`)
    apiKey = apiKey || null;
    config = config || {};

    let defaultOptions = {
        log: true,
        debug: true,
        apiKey: apiKey
    };

    this.config = _.defaults(config, defaultOptions);
    debug(`config=`,JSON.stringify(this.config))
    this.axios = axios.create({
        baseURL:  'https://www.namesilo.com/api/',

        params: {
            version: 1,  // no other option is available by March 2019
            type: 'xml', // no other option is available by March 2019
            key: apiKey
        }
    });
};

//todo: load methods dynamically for easy adding of new methods
NameSilo.prototype.checkRegisterAvailability = function (domains_array) {
    return require('./methods/checkRegisterAvailability').checkRegisterAvailability(this.config, this.axios, domains_array);
};

// Domain Transfer operations
NameSilo.prototype.transferDomain = function (domain, auth, options) {
  return require('./methods/transferDomain').transferDomain(this.config, this.axios, domain, auth, options);
};

NameSilo.prototype.checkTransferStatus = function(domain) {
    return require('./methods/checkTransferStatus').checkTransferStatus(this.config, this.axios, domain);
};

NameSilo.prototype.listDomains = function(options={}) {    
    return require('./methods/listDomains').listDomains(this.config, this.axios, options)
};

NameSilo.prototype.domainInfo = function (domain) {
    return require('./methods/domainInfo').domainInfo(this.config, this.axios, domain);
};

NameSilo.prototype.registerDomain = function(domain,years=1,options={}) {    
    return require('./methods/registerDomain').registerDomain(this.config, this.axios, domain,years,options)
};

NameSilo.prototype.changeNameServers = function(domain,nameservers) {    
    return require('./methods/changeNameServers').changeNameServers(this.config, this.axios, domain,nameservers)
};

NameSilo.prototype.renewDomain = function(domain,years=1,options={}) {
    return require('./methods/renewDomain').renewDomain(this.config, this.axios, domain,years,options)
}

NameSilo.prototype.all = function (promises) {
    return Promise.all(promises);
};


module.exports = NameSilo;

// Allow use of default import syntax in TypeScript
module.exports.default = NameSilo;
