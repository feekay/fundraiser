module.exports = function (keys, object) {
    for (var i in keys) {
        if (!(i in object) || !object[i]) {
            return false;
        } else if (keys[i] === "number" && isNaN(object[i])) {
            return false;
        }
        else if (keys[i] == "date" || keys[i] == "time") {

            if(new Date(object[i])=="Invalid Date"){
                return false;
            }

        }
    }
    return true;
}