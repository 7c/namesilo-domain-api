
const utils = require('../helpers/utils')
const _ = require('lodash')
const querystring = require('querystring')
const debug = require('debug')('registerDomain')
const convertResponse = require('../helpers/convertResponse')

// https://www.namesilo.com/api_reference.php#listDomains
module.exports.listDomains = function (config, axios, options) {
    return new Promise(function(resolve, reject) {                
        // validations
        if (config.apiKey == null) return reject('API Key can not be null.')
        
        axios.post('listDomains', querystring.stringify({ ...options}))
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
