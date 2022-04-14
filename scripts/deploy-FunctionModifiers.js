const { ethers } = require("hardhat");
const { CHECK, highlight } = require("../helper_functions/Colors");
const { heading } = require("../helper_functions/Headings");
const { parseReceipt, printReceipt, hexToASCII } = require("../helper_functions/Receipts");

async function main() {
    const [deployer] = await ethers.getSigners();
    const contractName = "FunctionModifiers";
    const contractFactory = await ethers.getContractFactory(contractName);
    
    console.log();
    heading("STATUS");
    console.log(`Deploying ${highlight(contractName, "yellow")} contract...`);
    const contract = await contractFactory.deploy();
    await contract.deployed();
    const contract_Tx = contract.deployTransaction;
    const contract_Rc = parseReceipt(await contract_Tx.wait());
    const contractAddress = contract.address; 
    console.log(CHECK + `Deployed to: ${highlight(contractAddress, "purple")}`);
    console.log();

    heading("TESTING");
    // getPause()
    console.log(`Calling ${highlight("getPause()", "yellow")}...`);
    const pauseStatus = await contract.getPause();
    console.log(CHECK + `Status: ${highlight(pauseStatus ? "Paused" : "Not Paused", "yellow")}`);
    // getCount()
    console.log(`Calling ${highlight("getCount()", "yellow")}...`);
    const v0 = await contract.getCount();
    console.log(CHECK + `Count: ${highlight(v0, "blue")}`);
    // inc()
    console.log(`Calling ${highlight("inc()", "yellow")}...`);
    const inc0_Tx = await contract.inc();
    const inc0_Rc = parseReceipt(await inc0_Tx.wait());
    console.log(CHECK + `Event Logs: ${inc0_Rc.eventLogsString}`);
    // getCount()
    console.log(`Calling ${highlight("getCount()", "yellow")}...`);
    const v1 = await contract.getCount();
    console.log(CHECK + `Count: ${highlight(v1, "blue")}`);
    // setPause(true)
    // console.log(`Calling ${highlight("setPause(true)", "yellow")}...`);
    // const setPause0_Tx = await contract.setPause(true);
    // const setPause0_Rc = parseReceipt(await setPause0_Tx.wait());
    // console.log(CHECK + `Event Logs: ${setPause0_Rc.eventLogsString}`);
    // inc() ==> Error: VM Exception while processing transaction: reverted with reason string 'Contract is currently paused'
    // console.log(`Calling ${highlight("inc()", "yellow")}...`);
    // const inc1_Tx = await contract.inc();
    // const inc1_Rc = parseReceipt(await inc1_Tx.wait());
    // console.log(CHECK + `Event Logs: ${inc1_Rc.eventLogsString}`);
    // getCount()
    // console.log(`Calling ${highlight("getCount()", "yellow")}...`);
    // const v2 = await contract.getCount();
    // console.log(CHECK + `Count: ${highlight(v2, "blue")}`);
    // incBy(49)
    console.log(`Calling ${highlight("incBy(49)", "yellow")}...`);
    const incBy0_Tx = await contract.incBy(49);
    const incBy0_Rc = parseReceipt(await incBy0_Tx.wait());
    console.log(CHECK + `Event Logs: ${incBy0_Rc.eventLogsString}`);
    // getCount()
    console.log(`Calling ${highlight("getCount()", "yellow")}...`);
    const v3 = await contract.getCount();
    console.log(CHECK + `Count: ${highlight(v3, "blue")}`);
    // decBy(25)
    console.log(`Calling ${highlight("decBy(25)", "yellow")}...`);
    const decBy0_Tx = await contract.decBy(25);
    const decBy0_Rc = parseReceipt(await decBy0_Tx.wait());
    console.log(CHECK + `Event Logs: ${decBy0_Rc.eventLogsString}`);
    // incBy(125) ==> Error: VM Exception while processing transaction: reverted with reason string 'x >= 100; can only increment by less than 100'
    // console.log(`Calling ${highlight("incBy(125)", "yellow")}...`);
    // const incBy1_Tx = await contract.incBy(125);
    // const incBy1_Rc = parseReceipt(await incBy1_Tx.wait());
    // console.log(CHECK + `Event Logs: ${incBy1_Rc.eventLogsString}`);
    // getCount()
    console.log(`Calling ${highlight("getCount()", "yellow")}...`);
    const v4 = await contract.getCount();
    console.log(CHECK + `Count: ${highlight(v4, "blue")}`);
    // foo()
    console.log(`Calling ${highlight("foo()", "yellow")}...`);
    const foo_Tx = await contract.foo();
    const foo_Rc = parseReceipt(await foo_Tx.wait());
    console.log(CHECK + `Event Logs: ${foo_Rc.eventLogsString}`);
    // getCount()
    console.log(`Calling ${highlight("getCount()", "yellow")}...`);
    const v5 = await contract.getCount();
    console.log(CHECK + `Count: ${highlight(v5, "blue")}`);
    console.log();

    heading("TRANSACTION RECEIPTS");
    printReceipt(`${highlight("FunctionModifiers", "yellow")} contract`, contract_Rc);
    printReceipt(`${highlight("inc()", "yellow")} transaction`, inc0_Rc);
    // printReceipt(`${highlight("setPause(true)", "yellow")} transaction`, setPause0_Rc);
    // printReceipt(`${highlight("inc()", "yellow")} transaction`, inc1_Rc);

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