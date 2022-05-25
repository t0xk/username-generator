/**
 * username-generator
 *  A utility used for generating random usernames.
 *
 * @version 1.0.0
 * @author VolgemutNik
 */

const supportedMethods = ["bruteforce", "dictionary", "auto"];

const {
    elementInArray,
    validateType,
    fetchText
} = require("./util/methods");

/*
    Default settings.
 */
const dMethod = "auto";
const dAmount = 10;
const dWordlist = ["./res/nouns.txt", "./res/adjectives.txt"];

/**
 * Generate a collection of
 * @param {object} settings - Update the settings of the UsernameGenerator instance.
 */
const usernameGenerator = () => {
    return (settings) => {
        settings = settings || {};
        validateType(settings, "object");

        /*
            Method of generation
         */
        settings.method = settings.method || dMethod;
        validateType(settings.method, "string");

        if (!elementInArray(settings.method, supportedMethods))
            throw new Error(`Method not supported(${settings.method}). Please consult the documentation for a list of all available methods.`);

        /*
            The amount of usernames we are generating
         */
        settings.amount = settings.amount || dAmount;
        validateType(settings.amount, "number");

        if (settings.amount < 0)
            throw new Error("Amount of generated usernames can't be negative.");

        /*
            The wordlist(s) to use
         */
        settings.wordlist = settings.wordlist || dWordlist;
        //TODO: implement loading from URLS and files(both text and csv)

    };
}

module.exports = usernameGenerator();