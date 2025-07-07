const utils = require('../helpers/utils')
const querystring = require('querystring')
const convertResponse = require('../helpers/convertResponse')

module.exports.checkRegisterAvailability = function (config, axios, domains) {
    return new Promise(function(resolve, reject) {
        domains = domains || [];
        // validations
        if (config.apiKey == null) return reject('API Key can not be null.')
        if (!utils.isArray(domains)) return reject('Domains needs to be an array')
        if (!domains || domains.length===0) return reject('No domains provided to check')
        
        axios.post('checkRegisterAvailability', querystring.stringify({ domains: domains.join(',') }))
            .then(function (response) {
                if (response.status===200) {
                    try {
                        const json  = convertResponse(response)
                        if (json.hasOwnProperty('namesilo') && json.namesilo.hasOwnProperty('reply'))
                            return resolve(json.namesilo.reply) // verified
                        
                    }
                    catch(e) {
                        return reject(`invalid response`,response.data)
                    }
                    return reject(`unexpected response`,response.data)
                }
            })
            .catch(function (error) {
                reject(error);
            });

    });

};
