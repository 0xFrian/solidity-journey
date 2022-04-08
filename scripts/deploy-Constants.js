const { ethers } = require("hardhat");

const COLORS = {
    "b" : "\x1b[36m",
    "y" : "\x1b[93m",
    "p" : "\x1b[95m",
    "g" : "\x1b[32m"
}
const RESET = "\x1b[0m";
const CHECK = COLORS["g"] + "✓" + RESET + " "; 

const highlight = (msg, color) => {
    highlighted_msg = COLORS[color] + msg + RESET;
    return highlighted_msg;
}

const parseReceipt = (name, receipt) => {
    console.log(`Transaction Receipt for ${highlight(name, "y")} contract: `);
    console.log(` * To: ${highlight(receipt.to, "p")}, From: ${highlight(receipt.from, "p")}`);
    console.log(` * Contract Address: ${highlight(receipt.contractAddress, "p")}`);
    console.log(` * Transaction Index: ${highlight(receipt.transactionIndex, "b")}, Transaction Hash: ${highlight(receipt.transactionHash, "p")}`);
    console.log(` * Block Number: ${highlight(receipt.blockNumber, "b")}, Block Hash: ${highlight(receipt.blockHash, "p")}`);
    console.log(` * Status: ${highlight(receipt.status, "b")}, Gas Used: ${highlight(receipt.gasUsed, "b")}`);
    console.log(` * Logs: ${highlight(receipt.logs, "y")}, Events: ${highlight(receipt.events, "y")}`);
}

async function main() {
    const [deployer] = await ethers.getSigners(); 
    const Constants_factory = await ethers.getContractFactory("Constants");
    const NotConstants_factory = await ethers.getContractFactory("NotConstants");

    console.log();
    console.log("==============" + " STATUS " + "==============");
    console.log(`Deploying ${highlight("Constants", "y")} contract...`);
    const Constants_contract = await Constants_factory.deploy();
    await Constants_contract.deployed();
    const Constants_Rc = await Constants_contract.deployTransaction.wait();
    console.log(CHECK + `Deployed to ${highlight(Constants_contract.address, "p")}`);
    console.log(`Deploying ${highlight("NotConstants", "y")} contract...`);
    const NotConstants_contract = await NotConstants_factory.deploy();
    await NotConstants_contract.deployed();
    const NotConstants_Rc = await NotConstants_contract.deployTransaction.wait();
    console.log(CHECK + `Deployed to ${highlight(NotConstants_contract.address, "p")}`)
    console.log();

    console.log("==============" + " TESTING " + "==============");
    parseReceipt("Constants", Constants_Rc);
    parseReceipt("NotConstants", NotConstants_Rc);
    console.log();

    console.log("==============" + " LOGISTICS " + "==============");
    const deployerAddress = deployer.address; 
    let deployerBalance = await deployer.getBalance();
    deployerBalance = parseFloat(ethers.utils.formatUnits(deployerBalance, "ether")).toFixed(4);
    console.log(`Deployer Address: ${highlight(deployerAddress, "p")}`);
    console.log(`Deployer Balance: ${highlight(deployerBalance, "b")} ETH`);
    console.log();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error); 
        process.exit(1);     
    });
