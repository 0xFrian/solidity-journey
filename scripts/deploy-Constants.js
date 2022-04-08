const { ethers } = require("hardhat");

const highlight = (msg) => {
    const reset = "\x1b[0m";
    const cyan = "\x1b[36m";
    highlighted_msg = cyan + msg + reset;
    return highlighted_msg;
}

const parseReceipt = (name, receipt) => {
    console.log(`Transaction Receipt for ${highlight(name)} contract: `);
    console.log(` * To: ${highlight(receipt.to)}, From: ${highlight(receipt.from)}`);
    console.log(` * Contract Address: ${highlight(receipt.contractAddress)}`);
    console.log(` * Transaction Index: ${highlight(receipt.transactionIndex)}, Transaction Hash: ${highlight(receipt.transactionHash)}`);
    console.log(` * Block Number: ${highlight(receipt.blockNumber)}, Block Hash: ${highlight(receipt.blockHash)}`);
    console.log(` * Status: ${highlight(receipt.status)}, Gas Used: ${highlight(receipt.gasUsed)}`);
    console.log(` * Logs: ${highlight(receipt.logs)}, Events: ${highlight(receipt.events)}`);
}

const CHECK = "  " + "\x1b[32m" + "✓" + "\x1b[0m" + " "; // "\x1b[32m" is Green and "\x1b[0m" is original

async function main() {
    const [deployer] = await ethers.getSigners(); 
    const Constants_factory = await ethers.getContractFactory("Constants");
    const NotConstants_factory = await ethers.getContractFactory("NotConstants");

    console.log();
    console.log("==============" + " STATUS " + "==============");
    console.log(`Deploying ${highlight("Constants")} contract...`);
    const Constants_contract = await Constants_factory.deploy();
    await Constants_contract.deployed();
    const Constants_Rc = await Constants_contract.deployTransaction.wait();
    console.log(CHECK + `Deployed to ${highlight(Constants_contract.address)}`);
    console.log(`Deploying ${highlight("NotConstants")} contract...`);
    const NotConstants_contract = await NotConstants_factory.deploy();
    await NotConstants_contract.deployed();
    const NotConstants_Rc = await NotConstants_contract.deployTransaction.wait();
    console.log(CHECK + `Deployed to ${highlight(NotConstants_contract.address)}`)
    console.log();

    console.log("==============" + " TESTING " + "==============");
    parseReceipt("Constants", Constants_Rc);
    parseReceipt("NotConstants", NotConstants_Rc);
    console.log();

    console.log("==============" + " LOGISTICS " + "==============");
    const deployerAddress = deployer.address; 
    let deployerBalance = await deployer.getBalance();
    deployerBalance = parseFloat(ethers.utils.formatUnits(deployerBalance, "ether")).toFixed(4);
    console.log(`Deployer Address: ${highlight(deployerAddress)}`);
    console.log(`Deployer Balance: ${highlight(deployerBalance)} ETH`);
    console.log();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error); 
        process.exit(1);     
    });
