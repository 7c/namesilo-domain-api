

function flattenText(obj) {
    // Handle null or non-objects (e.g., strings, numbers)
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // If it's an array, map over its elements and preserve the array structure
    if (Array.isArray(obj)) {
        return obj.map((item) => flattenText(item));
    }

    // If the object has a _text property, return its value
    if ('_text' in obj) {
        return obj._text;
    }

    // Otherwise, recursively process all keys of the object
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = flattenText(obj[key]);
        }
    }
    return result;
}

module.exports = flattenText
