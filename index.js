/**
 * username-generator
 *  A utility used for generating believable usernames.
 *
 * @version 1.0.0
 * @author VolgemutNik
 */

const supportedMethods = ["bruteforce", "dictionary", "auto"];

const {elementInArray} = require("./util/methods");

/**
 * Generate a collection of
 * @param settings
 */
const usernameGenerator =
    (settings) => {
        settings = settings || {};
        if(typeof(settings) !== "object")
            throw new Error("Settings must be of type 'object'!");

        settings.method = settings.method || "auto";
        if(!elementInArray(settings.method, supportedMethods))
            throw new Error(`Method not supported(${settings.method}). Please consult the documentation for a list of all available methods.`);

        settings.template = settings.template || "";
    }

module.exports = usernameGenerator();