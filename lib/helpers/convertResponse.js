const flattenText = require('./flattenText')
const parser = require('xml-js')

module.exports = function(response) {
    return flattenText(JSON.parse(parser.xml2json(response.data, { compact: true, spaces: 2 })))
}
