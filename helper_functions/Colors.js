const COLORS = {
    "blue" : "\x1b[36m",
    "yellow" : "\x1b[93m",
    "purple" : "\x1b[95m",
    "green" : "\x1b[32m",
    "gray" : "\x1b[90m",
    "reset" : "\x1b[0m"
}

const CHECK = "  " + COLORS["green"] + "✓" + COLORS["reset"] + " "; 

function highlight(msg, color) {
    highlighted_msg = COLORS[color] + msg + COLORS["reset"];
    return highlighted_msg;
}

module.exports = { 
    COLORS, 
    CHECK, 
    highlight
};
