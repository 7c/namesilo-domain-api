const utils = require('../helpers/utils')
const _ = require('lodash')
const querystring = require('querystring')
const convertResponse = require('../helpers/convertResponse')

// https://www.namesilo.com/api-reference#domains/renew-domain
module.exports.renewDomain = function (config, axios, domain,years,options) {
    return new Promise(function(resolve, reject) {                
        // validations
        if (config.apiKey == null) return reject('API Key can not be null.')
        if (!utils.isString(domain)) return reject('Domain needs to be a string')
        if (parseInt(years)<1 || parseInt(years)>10) return reject(`Invalid years inside registerDomain api call`)
        const default_options = {
            payment_id: undefined,
            coupon: undefined,
        }
        const optionals = _.defaults(options,default_options)
        axios.post('renewDomain', querystring.stringify({ domain,years,...optionals }))
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
