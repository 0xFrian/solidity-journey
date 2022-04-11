const { ethers } = require("hardhat");
const { CHECK, highlight } = require("../helper_functions/Colors");
const { heading } = require("../helper_functions/Headings");
const { parseReceipt, printReceipt } = require("../helper_functions/Receipts");

async function main() {
    const [deployer] = await ethers.getSigners();
    const contractName = "Loops";
    const contractFactory = await ethers.getContractFactory(contractName);
    
    console.log();
    heading("STATUS");
    console.log(`Deploying ${highlight(contractName, "yellow")} contract...`);
    const contract = await contractFactory.deploy();
    await contract.deployed();
    const contract_Tx = contract.deployTransaction;
    const contract_Rc = parseReceipt(await contract_Tx.wait());
    const contractAddress = contract.address; 
    console.log(CHECK + `${highlight(contractName, "yellow")} contract deployed to: ${highlight(contractAddress, "purple")}`);
    console.log();

    heading("TESTING");
    console.log(`Calling ${highlight("get()", "yellow")}...`);
    const upperLimit_0 = await contract.get();
    console.log(CHECK + `Upper Limit: ${highlight(upperLimit_0, "blue")}`);
    console.log(`Calling ${highlight("set(11)", "yellow")}...`);
    const set_Tx = await contract.set(11);
    const set_Rc = parseReceipt(await set_Tx.wait());
    console.log(CHECK + `Upper limit has been set to ${highlight(11, "blue")}`);
    console.log(`Calling ${highlight("get()", "yellow")}...`);
    const upperLimit_1 = await contract.get();
    console.log(CHECK + `Upper Limit: ${highlight(upperLimit_1, "blue")}`);
    console.log(`Calling ${highlight("forLoop()", "yellow")}...`);
    const forLoop_Tx = await contract.forLoop();
    const forLoop_Rc = parseReceipt(await forLoop_Tx.wait());
    console.log(CHECK + `Result: ${forLoop_Rc.eventLogsString}`);
    console.log(`Calling ${highlight("whileLoop()", "yellow")}...`);
    const whileLoop_Tx = await contract.whileLoop();
    const whileLoop_Rc = parseReceipt(await whileLoop_Tx.wait());
    console.log(CHECK + `Result: ${whileLoop_Rc.eventLogsString}`);
    console.log(`Calling ${highlight("sum(11)", "yellow")}...`);
    const sum_Tx = await contract.sum(11);
    const sum_Rc = parseReceipt(await sum_Tx.wait());
    console.log(CHECK + `Result: ${sum_Rc.eventLogsString}`);
    console.log();
    
    heading("TRANSACTION RECEIPTS");
    printReceipt(`${highlight("Loops", "yellow")} contract`, contract_Rc);
    printReceipt(`${highlight("set", "yellow")} transaction`, set_Rc);
    printReceipt(`${highlight("forLoop", "yellow")} transaction`, forLoop_Rc);
    printReceipt(`${highlight("whileLoop", "yellow")} transaction`, whileLoop_Rc);
    printReceipt(`${highlight("sum", "yellow")} transaction`, sum_Rc);
    console.log();
    
    heading("LOGISTICS");
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
// PS C:\Users\brian\Desktop\Coding\solidity-journey> npx hardhat run .\scripts\deploy-Loops.js --network rinkeby

// ============== STATUS ==============
// Deploying Loops contract...
//   ✓ Loops contract deployed to: 0xCB8657ac79dABCf68BC1e6B73AD29F0A2C4254a2

// ============== TESTING ==============
// Calling get()...
//   ✓ Upper Limit: 0
// Calling set(11)...
//   ✓ Upper limit has been set to 11
// Calling get()...
//   ✓ Upper Limit: 11
// Calling forLoop()...
//   ✓ Result:  [Sum : 66] , [ValueChanged : 0]
// Calling whileLoop()...
//   ✓ Result:  [Sum : 0]
// Calling sum(11)...
//   ✓ Result:  [Sum : 66]

// ============== TRANSACTION RECEIPTS ==============
// Receipt for Loops contract:
//   * To: null
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: 0xCB8657ac79dABCf68BC1e6B73AD29F0A2C4254a2
//   * Transaction Hash: 0xca5a80d4449d83082870fda45bd6634f804595b5a77b7c345e037b77ed887737
//   * Gas Used: 289923
//   * Event Logs:
// Receipt for set transaction:
//   * To: 0xCB8657ac79dABCf68BC1e6B73AD29F0A2C4254a2
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0xcf53078a4e3c94bae42cfcc31d0d43345815ddce683972e4363ca6ee0e0d9e02
//   * Gas Used: 45015
//   * Event Logs:  [ValueChanged : 11]
// Receipt for forLoop transaction:
//   * To: 0xCB8657ac79dABCf68BC1e6B73AD29F0A2C4254a2
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0xa42fde62c50a2ecbbc2f98ed698e4438ad05296e1476124cd8607f00bafb8600
//   * Gas Used: 29742
//   * Event Logs:  [Sum : 66] , [ValueChanged : 0]
// Receipt for whileLoop transaction:
//   * To: 0xCB8657ac79dABCf68BC1e6B73AD29F0A2C4254a2
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0x617c6ddeda586e3519d924d6cb9a616638f52cee179486a25ba9fdb0c4bdd822
//   * Gas Used: 24585
//   * Event Logs:  [Sum : 0]
// Receipt for sum transaction:
//   * To: 0xCB8657ac79dABCf68BC1e6B73AD29F0A2C4254a2
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0xdb392985f64a071aa75d11cdd8c150f98d46ec950d316d4cdf607e342674a5b9
//   * Gas Used: 27169
//   * Event Logs:  [Sum : 66]

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 134.1660 ETH
