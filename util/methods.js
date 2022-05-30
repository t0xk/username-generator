const {URL} = require("url");
const http = require("http");
const https = require("https");

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
 * A unified solution for calling the get method of both node:http and node:https modules.
 *  Introduced as a fix for a duplicate code block warning.
 *
 * @param obj An object that represents either the http or https node module.
 * @param parsed {URL} Holds remote host data.
 * @private
 */
const _get = (obj, parsed) => {
    if (!obj
        || typeof (obj) !== typeof (http)
        || typeof (obj) !== typeof (https)) {
        throw new Error(`The 'obj' parameter holds an invalid value. Must either represent node:http or node:https!`);
    }

    return new Promise((resolve, reject) => {
        obj.get(parsed,
            (res) => {
                const {statusCode} = res;

                if (statusCode >= 200 && statusCode <= 299) { //2XX is considered success
                    let data = "";
                    res.setEncoding("utf-8");
                    res.on("data",
                        (chunk => {
                            data += chunk;
                        }));
                    res.on("end",
                        () => {
                            console.log(`DEBUG: Received data:\n${data}`);
                            //TODO: Actual data processing.

                            resolve(data);
                        })
                        .on("error", (error) => {
                            error.message = `An error has occurred while trying to read the response data:\n${error.message}`;

                            reject(error);
                        });
                } else {
                    reject(new Error(`An error has occurred while sending the GET request. Host has returned status code ${statusCode}.`));
                }
            });
    });
}

/**
 * Fetch content as text from a URL.
 *
 * @param url {string} - A string containing a valid URL.
 */
const fetchText = (url) => {
    const parsed = new URL(url); //throws TypeError if url is not a string and/or parse-able
    let data = null;

    (async () => {
        switch (parsed.protocol) {
            case "http":
                data = await _get(http, parsed);
                break;

            case "https":
                data = await _get(https, parsed);
                break;

            //TODO: more protocol implementations
            default:
                throw new Error("Protocol not supported. Please use either http or https.");
        }
    })();

    return data || "";
}

module.exports = {
    elementInArray,
    validateType,
    fetchText
}