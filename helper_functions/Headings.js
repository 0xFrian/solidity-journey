const { highlight } = require("./Colors");

function heading(msg) {
    const header = highlight("============== " + msg + " ==============", "gray");
    console.log(header);
}

module.exports = { heading };