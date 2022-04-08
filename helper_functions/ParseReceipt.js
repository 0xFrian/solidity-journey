const { highlight } = require("../helper_functions/Colors");

const parseReceipt = (name, receipt) => {
    let events = "";
    if (receipt.events.length > 0) {
        receipt.events.forEach(element => events += element.event)  ;      
    }

    let logs = "";
    if (receipt.logs.length > 0) {
        receipt.logs.forEach(element => logs += parseInt(element.data, 16));
    }
    
    console.log(`Transaction Receipt for ${highlight(name, "yellow")} contract: `);
    console.log(` * To: ${highlight(receipt.to, "purple")}, From: ${highlight(receipt.from, "purple")}`);
    console.log(` * Contract Address: ${highlight(receipt.contractAddress, "purple")}`);
    console.log(` * Transaction Index: ${highlight(receipt.transactionIndex, "blue")}, Transaction Hash: ${highlight(receipt.transactionHash, "purple")}`);
    console.log(` * Block Number: ${highlight(receipt.blockNumber, "blue")}, Block Hash: ${highlight(receipt.blockHash, "purple")}`);
    console.log(` * Status: ${highlight(receipt.status, "blue")}, Gas Used: ${highlight(receipt.gasUsed, "blue")}`);
    console.log(` * Logs: ${highlight(logs, "yellow")} Events: ${highlight(events, "yellow")}`);
}

exports.parseReceipt = parseReceipt;
