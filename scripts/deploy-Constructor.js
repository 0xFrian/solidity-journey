const { ethers } = require("hardhat");
const { CHECK, highlight } = require("../helper_functions/Colors");
const { heading } = require("../helper_functions/Headings");
const { parseReceipt, printReceipt, hexToASCII } = require("../helper_functions/Receipts");

async function main() {
    const [deployer] = await ethers.getSigners();
    const contractName = "Constructor";
    const contractFactory = await ethers.getContractFactory(contractName);
    
    console.log();
    heading("STATUS");
    console.log(`Deploying ${highlight(contractName, "yellow")} contract...`);
    const contract = await contractFactory.deploy(123);     
    // 123 will be passed into the contract's constructor and assigned to the state variable x
    await contract.deployed();
    const contract_Tx = contract.deployTransaction;
    const contract_Rc = parseReceipt(await contract_Tx.wait());
    const contractAddress = contract.address; 
    console.log(CHECK + `Deployed to: ${highlight(contractAddress, "purple")}`);
    console.log();

    heading("TESTING");
    console.log(`Calling ${highlight("getOwner()", "yellow")}...`);
    const owner = await contract.getOwner();
    console.log(CHECK + `Owner: ${owner}`);
    console.log(`Calling ${highlight("getX()", "yellow")}...`);
    const x = await contract.getX();
    console.log(CHECK + `x: ${x}`);
    console.log();

    heading("TRANSACTION RECEIPTS");
    printReceipt(`${highlight(contractName, "yellow")} contract`, contract_Rc);
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
// PS C:\Users\brian\Desktop\Coding\solidity-journey> npx hardhat run .\scripts\deploy-FunctionModifiers.js --network rinkeby

// ============== STATUS ==============
// Deploying FunctionModifiers contract...
//   ✓ Deployed to: 0xf7C6E84608dd17994588b5F45583141F81a43bcD

// ============== TESTING ==============
// Calling getPause()...
//   ✓ Status: Not Paused
// Calling getCount()...
//   ✓ Count: 0
// Calling inc()...
//   ✓ Event Logs:  [CountChanged : 1]
// Calling getCount()...
//   ✓ Count: 1
// Calling incBy(49)...
//   ✓ Event Logs:  [CountChanged : 50]
// Calling getCount()...
//   ✓ Count: 50
// Calling decBy(25)...
//   ✓ Event Logs:  [CountChanged : 25]
// Calling getCount()...
//   ✓ Count: 25
// Calling foo()...
//   ✓ Event Logs:  [CountChanged : 35] , [CountChanged : 70]
// Calling getCount()...
//   ✓ Count: 70

// ============== TRANSACTION RECEIPTS ==============
// Receipt for FunctionModifiers contract:
//   * To: null
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: 0xf7C6E84608dd17994588b5F45583141F81a43bcD
//   * Transaction Hash: 0xd774fd37c0d802c60e07ef0cadb39a460b8c299c111b29d25f29493b971c5555
//   * Gas Used: 624296
//   * Event Logs:
// Receipt for inc() transaction:
//   * To: 0xf7C6E84608dd17994588b5F45583141F81a43bcD
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0xcab3329c0b77aae250ed1e13420d437aae34e9bc7acc15dd438afc35ecdfe71f
//   * Gas Used: 46996
//   * Event Logs:  [CountChanged : 1]

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 134.1402 ETH