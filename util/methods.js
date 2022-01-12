/**
 * Returns *true* if the element is found in the array, *false* otherwise.
 *
 * @param e The element we are testing for.
 * @param arr The array we are iterating.
 */
const elementInArray = (e, arr) => {
    for(let foo of arr){
        if(e === foo)
            return true;
    }

    return false;
}

module.exports = {
    elementInArray
}