const utils = require('../helpers/utils')
const convertResponse = require('../helpers/convertResponse')

// https://www.namesilo.com/api-reference#domains/get-domain-info
module.exports.domainInfo = function (config, axios, domain) {
    return new Promise(function(resolve, reject) {                
        //  basic validations
        if (!config.apiKey) return reject('apiKey is required')
        if (!utils.isString(domain)) return reject('Domain needs to be a string')
        axios.get('getDomainInfo',{
            params: {
                domain
            }
        })
        .then(function (response) {
            if (response.status===200) {
                try {
                    const json  = convertResponse(response)
                    if (json.hasOwnProperty('namesilo') && json.namesilo.hasOwnProperty('reply'))
                        return resolve(json.namesilo.reply) // verified
                }
                catch(e) {
                    console.error(e)
                    return reject(`invalid response`,response.data)
                }
                return reject(`unexpected response`,response.data)
            }
        }).catch(function (error) {
            reject(error);
        })

    });

};
