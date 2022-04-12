const { ethers } = require("hardhat");
const { CHECK, highlight } = require("../helper_functions/Colors");
const { heading } = require("../helper_functions/Headings");
const { parseReceipt, printReceipt } = require("../helper_functions/Receipts");

async function main() {
    const [deployer] = await ethers.getSigners();
    const contractName = "Errors";
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
    console.log(`Calling ${highlight("testRequire(4)", "yellow")}...`);
    const testRequire1_Tx = await contract.testRequire(4);
    const testRequire1_Rc = parseReceipt(await testRequire1_Tx.wait());
    console.log(CHECK + `Result: ${testRequire1_Rc.eventLogsString}`);
    // console.log(`Calling ${highlight("testRequire(12)", "yellow")}...`);
    // const testRequire2_Tx = await contract.testRequire(12);
    // const testRequire2_Rc = parseReceipt(await testRequire2_Tx.wait());
    console.log(`Calling ${highlight("testRevert(6)", "yellow")}...`);
    const testRevert1_Tx = await contract.testRevert(4);
    const testRevert1_Rc = parseReceipt(await testRevert1_Tx.wait());
    console.log(CHECK + `Result: ${testRevert1_Rc.eventLogsString}`);
    // console.log(`Calling ${highlight("testRevert(16)", "yellow")}...`)
    // const testRevert2_Tx = await contract.testRevert(16);
    // const testRevert2_Rc = parseReceipt(await testRevert2_Tx.wait());
    console.log(`Calling ${highlight("get()", "yellow")}...`);
    const get1_Tx = await contract.get();
    console.log(CHECK + `Result: ${get1_Tx}`);
    console.log(`Calling ${highlight("testAssert()", "yellow")}...`);
    const testAssert1_Tx = await contract.testAssert();
    const testAssert1_Rc = parseReceipt(await testAssert1_Tx.wait());
    console.log(CHECK + `Result: ${testAssert1_Rc.eventLogsString}`);
    console.log(`Calling ${highlight("set(100)", "yellow")}...`);
    const set_Tx = await contract.set(100);
    const set_Rc = parseReceipt(await set_Tx.wait());
    console.log(CHECK + "Done");
    console.log(`Calling ${highlight("get()", "yellow")}...`);
    const get2_Tx = await contract.get();
    console.log(CHECK + `Result: ${get2_Tx}`);
    // console.log(`Calling ${highlight("testAssert()", "yellow")}...`);
    // const testAssert2_Tx = await contract.testAssert();
    // const testAssert2_Rc = parseReceipt(await testAssert2_Tx.wait());
    console.log(`Calling ${highlight("attemptToUpdate(9)", "yellow")}...`);
    const attemptToUpdate1_Tx = await contract.attemptToUpdate(9);
    const attemptToUpdate1_Rc = parseReceipt(await attemptToUpdate1_Tx.wait());
    console.log(CHECK + `Result: ${attemptToUpdate1_Rc.eventLogsString}`);
    // console.log(`Calling ${highlight("attemptToUpdate(11)", "yellow")}...`);
    // const attemptToUpdate2_Tx = await contract.attemptToUpdate(11);
    // const attemptToUpdate2_Rc = parseReceipt(await attemptToUpdate2_Tx.wait());
    // console.log(CHECK + `Result: ${attemptToUpdate2_Rc.eventLogsString}`);
    console.log(`Calling ${highlight("testCustomError(2)", "yellow")}...`);
    const testCustomError1_Tx = await contract.testCustomError(2);
    const testCustomError1_Rc = parseReceipt(await testCustomError1_Tx.wait());
    console.log(CHECK + `Result: ${testCustomError1_Rc.eventLogsString}`);
    // console.log(`Calling ${highlight("testCustomError(20)", "yellow")}...`);
    // const testCustomError2_Tx = await contract.testCustomError(20);
    // const testCustomError2_Rc = parseReceipt(await testCustomError2_Tx.wait());
    console.log();

    heading("TRANSACTION RECEIPTS");
    printReceipt(`${highlight("Errors", "yellow")} contract`, contract_Rc);
    printReceipt(`${highlight("testRequire(4)", "yellow")} transaction`, testRequire1_Rc);
    // printReceipt(`${highlight("testRequire(12)", "yellow")} transaction`, testRequire2_Rc);
    printReceipt(`${highlight("testRevert(6)", "yellow")}`, testRevert1_Rc);
    // printReceipt(`${highlight("testRevert(16)", "yellow")} transaction`, testRevert2_Rc);
    printReceipt(`${highlight("testAssert()", "yellow")}`, testAssert1_Rc);
    printReceipt(`${highlight("set(100)", "yellow")}`, set_Rc);
    printReceipt(`${highlight("attemptToUpdate(9)", "yellow")}`, attemptToUpdate1_Rc);
    printReceipt(`${highlight("testCustomError(2)", "yellow")}`, testCustomError1_Rc);
    // printReceipt(`${highlight("testCustomError(20)", "yellow")}`, testCustomError2_Rc);
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
// PS C:\Users\brian\Desktop\Coding\solidity-journey> npx hardhat run .\scripts\deploy-Errors.js --network rinkeby

// ============== STATUS ==============
// Deploying Errors contract...
//   ✓ Errors contract deployed to: 0x60399E43edb17a92Bee90ddEA47af51bFFcc6851

// ============== TESTING ==============
// Calling testRequire(4)...
//   ✓ Result:  [ValidInput : 4]
// Calling testRevert(6)...
//   ✓ Result:
// Calling get()...
//   ✓ Result: 123
// Calling testAssert()...
//   ✓ Result:  [ValidNum : 123]
// Calling set(100)...
//   ✓ Done
// Calling get()...
//   ✓ Result: 100
// Calling attemptToUpdate(9)...
//   ✓ Result:  [ValueChanged : 10] , [ValidInput : 9]
// Calling testCustomError(2)...
//   ✓ Result:  [ValidInput : 2]

// ============== TRANSACTION RECEIPTS ==============
// Receipt for Errors contract:
//   * To: null
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: 0x60399E43edb17a92Bee90ddEA47af51bFFcc6851
//   * Transaction Hash: 0xa9c2d85d4fece360d27c8a7f7469c125741f6dccbb84c76a82a53ff76ec8baa3
//   * Gas Used: 474341
//   * Event Logs:
// Receipt for testRequire(4) transaction:
//   * To: 0x60399E43edb17a92Bee90ddEA47af51bFFcc6851
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0xc3a0d1cf353e4b81580646c7cb31d24b0075428735d0b2c5d231f9182811a742
//   * Gas Used: 22893
//   * Event Logs:  [ValidInput : 4]
// Receipt for testRevert(6):
//   * To: 0x60399E43edb17a92Bee90ddEA47af51bFFcc6851
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0xf23e7c33b694e6e34d232fa98f675fcee38bafb7676b05d340f5e7490be6158a
//   * Gas Used: 21637
//   * Event Logs:
// Receipt for testAssert():
//   * To: 0x60399E43edb17a92Bee90ddEA47af51bFFcc6851
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0xd5f793a20d3f6e463d1ddc5f5628b1288e779c1cca5853a00e75d9fc52c9144f
//   * Gas Used: 24645
//   * Event Logs:  [ValidNum : 123]
// Receipt for set(100):
//   * To: 0x60399E43edb17a92Bee90ddEA47af51bFFcc6851
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0x454f96e2debf48f4e682bd7b1916d4556b72ea90ffb3d165597cf9b7bc114835
//   * Gas Used: 27815
//   * Event Logs:  [ValueChanged : 100]
// Receipt for attemptToUpdate(9):
//   * To: 0x60399E43edb17a92Bee90ddEA47af51bFFcc6851
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0x8676808cf22dfe0028f684ea1ad4d4eb87199789c59304f678958671e1ab9f85
//   * Gas Used: 29200
//   * Event Logs:  [ValueChanged : 10] , [ValidInput : 9]
// Receipt for testCustomError(2):
//   * To: 0x60399E43edb17a92Bee90ddEA47af51bFFcc6851
//   * From: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
//   * Address: null
//   * Transaction Hash: 0x65ae8e9792aac7ac1a374ee2a41430b599f60cced47d2c08ff39c9c5b0fd7af4
//   * Gas Used: 22871
//   * Event Logs:  [ValidInput : 2]

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 134.1638 ETH