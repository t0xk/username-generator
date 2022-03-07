/**
 * Returns *true* if the element is found in the array, *false* otherwise.
 *
 * @param e An element we are searching for.
 * @param arr The array we are iterating.
 */
const elementInArray = (e, arr) => {
    for (let foo of arr) {
        if (e === foo)
            return true;
    }

    return false;
}

/**
 * Checks to see if the type of variable matches the type(s) we pass into the function. Returns true if it does, throws an Error otherwise.
 * *type* is not validated so the developer is responsible for passing a valid string, or an array of strings.
 *
 * @param t {any} - The variable of which we are verifying the type of.
 * @param type {string} - The type(s) we expect the variable to be.
 * @return {boolean} - True when types match.
 */
const validateType = (t, ...type) => {
    if (!t || !type)
        throw new Error("Variable and expected type must both be defined.");

    for (let ty in type) {
        if (typeof (t) === ty)
            return true;

    }

    throw new Error(`Variable can't be of type ${typeof (t)}. Expected type(s): ${JSON.stringify(type)}.`);
}

/**
 * Fetch content as text from a URL.
 *
 * @param url {string} - A string containing a valid URL.
 */
const fetchText = (url) => {
    (async () => {

    })();
}

module.exports = {
    elementInArray,
    validateType,
    fetchText
}