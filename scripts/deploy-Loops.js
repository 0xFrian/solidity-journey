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
//   ✓ Loops contract deployed to: 0x2a6a9af3A848200557D438541dE37BBF46503c1D

// ============== TESTING ==============
// Calling get()...
//   ✓ Upper Limit: 0
// Calling set(11)...
//   ✓ Upper limit has been set to 11
// Calling get()...
//   ✓ Upper Limit: 11
// Calling forLoop()...
//   ✓ Result: [object Object]
// Calling whileLoop()...
//   ✓ Result: [object Object]
// Calling sum(11)...
//   ✓ Result: [object Object]

// ============== TRANSACTION RECEIPTS ==============
// Transaction Receipt for Loops contract:
//  * To: null, From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//  * Contract Address: 0x2a6a9af3A848200557D438541dE37BBF46503c1D
//  * Transaction Index: 4, Transaction Hash: 0x5b4fb9c7c9259765d5289712910f30cfce76565ffbcbc7e40697b569df14ee01
//  * Block Number: 10482314, Block Hash: 0x840bfc4d23a7a24549fb53731c0e21c2ec713b5a2715bc1199147729dacc6e95
//  * Status: 1, Gas Used: 286305
//  * Logs:  Events:
// Transaction Receipt for set contract:
//  * To: 0x2a6a9af3A848200557D438541dE37BBF46503c1D, From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//  * Contract Address: null
//  * Transaction Index: 34, Transaction Hash: 0x39aadea304803014c2064512c4da80009c381e00fcf80641c3705adedafc6127
//  * Block Number: 10482315, Block Hash: 0x764609455c57ea876debb194311b03ef14ba01b4dc62cc07427ad381f01169e4
//  * Status: 1, Gas Used: 45015
//  * Logs: 11 Events: ValueChanged
// Transaction Receipt for forLoop contract:
//  * To: 0x2a6a9af3A848200557D438541dE37BBF46503c1D, From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//  * Contract Address: null
//  * Transaction Index: 35, Transaction Hash: 0x020853ecf1ea5a4e1470d2a015be57d1a52e080655450d83da4e901bb8951849
//  * Block Number: 10482316, Block Hash: 0xad53a21b8a1011cb99db6da96476104322bfabb15428bf07d73200509089aae1
//  * Status: 1, Gas Used: 30522
//  * Logs: 66 Events: Result
// Transaction Receipt for whileLoop contract:
//  * To: 0x2a6a9af3A848200557D438541dE37BBF46503c1D, From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//  * Contract Address: null
//  * Transaction Index: 16, Transaction Hash: 0x2838067c7b8d373d8b2330e61d9517674085bc957ab21eaf60ebe9ed32dc1a23
//  * Block Number: 10482317, Block Hash: 0xd030e536c1c60a6b4ed90c3d65b73b1680ad0f52813e5d43588ec50d6fb69451
//  * Status: 1, Gas Used: 30030
//  * Logs: 66 Events: Result

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 134.1704 ETH