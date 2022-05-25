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
 * Fetch content as text from a URL.
 *
 * @param url {string} - A string containing a valid URL.
 */
const fetchText = (url) => {
    const parsed = new URL(url); //throws TypeError if url is not a string and/or parse-able

    (async () => {
        switch (parsed.protocol) {
            case "http":
                http.get(parsed,
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
                                    console.log(`Received data:\n${data}`);
                                    // Actual data processing. Will a return statement work?
                                });
                        } else {
                            throw new Error(`An error has occurred while sending the GET request. Host has returned status code ${statusCode}.`);
                        }
                    });
                break;

            case "https":

                break;

            //TODO: more protocol implementations
            default:
                throw new Error("Protocol not supported. Please use either http or https.");
        }
    })();
}

module.exports = {
    elementInArray,
    validateType,
    fetchText
}