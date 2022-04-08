const { COLORS, CHECK, highlight } = require("../helper_functions/Colors");

const parseReceipt = (name, receipt) => {
    console.log(`Transaction Receipt for ${highlight(name, "yellow")} contract: `);
    console.log(` * To: ${highlight(receipt.to, "purple")}, From: ${highlight(receipt.from, "purple")}`);
    console.log(` * Contract Address: ${highlight(receipt.contractAddress, "purple")}`);
    console.log(` * Transaction Index: ${highlight(receipt.transactionIndex, "blue")}, Transaction Hash: ${highlight(receipt.transactionHash, "purple")}`);
    console.log(` * Block Number: ${highlight(receipt.blockNumber, "blue")}, Block Hash: ${highlight(receipt.blockHash, "purple")}`);
    console.log(` * Status: ${highlight(receipt.status, "blue")}, Gas Used: ${highlight(receipt.gasUsed, "blue")}`);
    console.log(` * Logs: ${highlight(receipt.logs, "yellow")}, Events: ${highlight(receipt.events, "yellow")}`);
}

exports.parseReceipt = parseReceipt;
