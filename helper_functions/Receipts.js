const { highlight } = require("./Colors");
const CHARACTERS = "abcdefghijklmnopqrstuvwxyz \
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function isNum(value) {
    return !isNaN(value);
}

function parseHex(hex) {
    var hex_str = hex.toString();  
    var number_str = "";    // number
    var char_str = "";      // words
    for (let i = 0; i < hex_str.length; i += 2) {
        let h = hex_str.substr(i, 2);   
        let s = String.fromCharCode(parseInt(h, 16));
        if (CHARACTERS.includes(s)) {
            // console.log(`  Converting "${h}" --> "${s}"`);
            char_str += s;
        }
    }
    if (char_str.length <= 1) {
        number_str = parseInt(hex, 16);
        return number_str.toString();
    }
    return char_str.trim();
}

function parseReceipt(receipt) {
    let eventLogs = []          // Array with entries of the form [eventName, eventData]
    let eventLogsString = [];   // Array of strings for printing out logs (eventData)

    // Check if this transaction contains events 
    if (receipt.events.length > 0 && receipt.events.length == receipt.logs.length) {
        for (let i = 0; i < receipt.events.length; i++) {
            let eventName = receipt.events[i].event;
            let eventData = receipt.logs[i].data;
            eventData = parseHex(eventData);
            eventLogs.push([eventName, eventData]);
            eventLogsString.push(" [" 
                                    + highlight(eventName, "yellow") + " : " + highlight(eventData, "blue") 
                                    + "] ");
        }
    }

    customReceipt = {
        to : receipt.to,
        from : receipt.from,
        address : receipt.contractAddress,
        hash : receipt.transactionHash,
        gasUsed : receipt.gasUsed,
        eventLogs : eventLogs,
        eventLogsString : eventLogsString
    };

    return customReceipt;
}

function printReceipt(name, customReceipt) {
    console.log(`Receipt for ${name}: `);
    console.log(`  * To: ${highlight(customReceipt.to, "purple")}`);
    console.log(`  * From: ${highlight(customReceipt.from, "purple")}`);
    console.log(`  * Address: ${highlight(customReceipt.address, "purple")}`);
    console.log(`  * Transaction Hash: ${highlight(customReceipt.hash, "purple")}`);
    console.log(`  * Gas Used: ${highlight(customReceipt.gasUsed, "blue")}`);
    console.log(`  * Event Logs: ${customReceipt.eventLogsString}`);
}

function hexToASCII(hex) {
    var hex_str = hex.toString();  // Force conversion
    var ASCII_str = "";
    for (var i = 0; i < hex_str.length; i += 2) {
        let h = hex_str.substr(i, 2);
        let s = String.fromCharCode(parseInt(h, 16));
        ASCII_str += s;
    }
    return ASCII_str;
}

module.exports = {
    parseReceipt,
    printReceipt,
    hexToASCII
};
