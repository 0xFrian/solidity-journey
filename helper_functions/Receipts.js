const { highlight } = require("./Colors");

function parseReceipt(receipt) {
    let eventLogs = []
    let eventLogsString = [];
    if (receipt.events.length > 0 || receipt.logs.length > 0) {
        if (receipt.events.length == receipt.logs.length) {
            for (let i = 0; i < receipt.events.length; i++) {
                let eventName = receipt.events[i].event;
                let logData = parseInt(receipt.logs[i].data, 16);
                eventLogs.push([eventName, logData]);
                eventLogsString.push(" [" + highlight(eventName, "yellow") 
                                                + " : " + highlight(logData, "blue") + "] ");
            }
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

module.exports = {
    parseReceipt,
    printReceipt
};
