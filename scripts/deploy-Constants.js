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



// =======================
// ||       Output      ||
// =======================
// PS C:\Users\brian\Desktop\Coding\solidity-journey> npx hardhat run .\scripts\deploy-Constants.js --network rinkeby

// ============== STATUS ==============
// Deploying Constants contract...
// ✓ Deployed to 0x65973CAF1AF2435Bb9cF0A1C34bC1b59F851E579
// Deploying NotConstants contract...
// ✓ Deployed to 0x128a68C4275AA92943900DAB9411c068a39bEAe5

// ============== TESTING ==============
// Transaction Receipt for Constants contract:
//     * To: null, From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//     * Contract Address: 0x65973CAF1AF2435Bb9cF0A1C34bC1b59F851E579
//     * Transaction Index: 13, Transaction Hash: 0xca8fa3f3b0a2e5b4bcaaeb2289aec9f8a9eec3e851a836b51d3e0e5956c014a6
//     * Block Number: 10466644, Block Hash: 0x1c9c52631fb2ff30543b136ba446d963f688abe0a99aab9a135695cc3979df18
//     * Status: 1, Gas Used: 128149
//     * Logs: , Events:
// Transaction Receipt for NotConstants contract:
//     * To: null, From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//     * Contract Address: 0x128a68C4275AA92943900DAB9411c068a39bEAe5
//     * Transaction Index: 34, Transaction Hash: 0x147ac5fd13363cd04cb169b50fc005fe356b11e748fa628bddb4dc848ccbe6c2
//     * Block Number: 10466645, Block Hash: 0xdf664a8c96f9afa7d94340484cc20b16f0b0f63be349daf077c63aaec66b4f34
//     * Status: 1, Gas Used: 176424
//     * Logs: , Events:

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 134.1760 ETH