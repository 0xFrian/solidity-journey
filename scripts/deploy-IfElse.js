const { ethers } = require("hardhat"); 

const COLORS = {
    "blue" : "\x1b[36m",
    "yellow" : "\x1b[93m",
    "purple" : "\x1b[95m",
    "green" : "\x1b[32m",
    "gray" : "\x1b[90m"
}
const RESET = "\x1b[0m";
const CHECK = "  " + COLORS["green"] + "✓" + RESET + " "; 

const highlight = (msg, color) => {
    highlighted_msg = COLORS[color] + msg + RESET;
    return highlighted_msg;
}

const parseReceipt = (name, receipt) => {
    console.log(`Transaction Receipt for ${highlight(name, "yellow")} contract: `);
    console.log(` * To: ${highlight(receipt.to, "purple")}, From: ${highlight(receipt.from, "purple")}`);
    console.log(` * Contract Address: ${highlight(receipt.contractAddress, "purple")}`);
    console.log(` * Transaction Index: ${highlight(receipt.transactionIndex, "blue")}, Transaction Hash: ${highlight(receipt.transactionHash, "purple")}`);
    console.log(` * Block Number: ${highlight(receipt.blockNumber, "blue")}, Block Hash: ${highlight(receipt.blockHash, "purple")}`);
    console.log(` * Status: ${highlight(receipt.status, "blue")}, Gas Used: ${highlight(receipt.gasUsed, "blue")}`);
    console.log(` * Logs: ${highlight(receipt.logs, "yellow")}, Events: ${highlight(receipt.events, "yellow")}`);
}

async function main() {
    const [deployer] = await ethers.getSigners(); 
    const contractName = "IfElse"; 
    const contractFactory = await ethers.getContractFactory(contractName);

    console.log(); 
    console.log("==============" + " STATUS " + "==============");
    console.log(`Deploying ${highlight(contractName, "yellow")} contract...`);
    const contract = await contractFactory.deploy(); 
    await contract.deployed(); 
    const contract_Tx = contract.deployTransaction;
    const contract_Rc = await contract_Tx.wait();
    const contractAddress = contract.address;
    console.log(CHECK + `Deployed to address: ${highlight(contractAddress, "purple")}`);
    const x1 = 1; 
    console.log(`Calling ${highlight("regular(1)", "gray")}...`);
    const result1 = await contract.regular(x1);
    console.log(CHECK + `Result: ${highlight(result1, "blue")}`);
    const x2 = 20;
    console.log(`Calling ${highlight("ternary(20)", "gray")}...`);
    const result2 = await contract.ternary(x2);
    console.log(CHECK + `Result: ${highlight(result2, "blue")}`);
    console.log();

    console.log("==============" + " TESTING " + "==============");
    console.log(`${highlight("result1", "gray")}: `, result1);
    console.log(`${highlight("result2", "gray")}: `, result2);
    // console.log(`${highlight("contract_Tx", "gray")}: `, contract_Tx);
    parseReceipt(contractName, contract_Rc);
    console.log();  

    console.log("==============" + " LOGISTICS " + "==============");
    const deployerAddress = deployer.address; 
    let deployerBalance = await deployer.getBalance(); 
    deployerBalance = parseFloat(ethers.utils.formatUnits(deployerBalance, "ether")).toFixed(4); 
    console.log(`Deployer Address: ${highlight(deployerAddress, "purple")}`);
    console.log(`Deployer Balance: ${highlight(deployerBalance, "blue")} ETH`);
    console.log();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error); 
        process.exit(1);     
    });



// =======================
// ||       Output      ||
// =======================

