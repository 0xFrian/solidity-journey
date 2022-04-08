const { ethers } = require("hardhat");
const { CHECK, highlight } = require("../helper_functions/Colors");
const { parseReceipt } = require("../helper_functions/parseReceipt");

async function main() {
    const [deployer] = await ethers.getSigners();
    const contractName = "Box";
    const contractFactory = await ethers.getContractFactory(contractName);
    
    console.log();
    console.log("==============" + " STATUS " + "==============");
    console.log(`Deploying ${highlight(contractName, "yellow")} contract...`);
    const contract = await contractFactory.deploy();
    await contract.deployed();
    const contract_Tx = contract.deployTransaction;
    const contract_Rc = await contract_Tx.wait();
    const contractAddress = contract.address; 
    console.log(CHECK + `${highlight(contractName, "yellow")} contract deployed to: ${highlight(contractAddress, "purple")}`);
    
    console.log(`Calling ${highlight("retrieve()", "gray")} to fetch stored value...`);
    const initialValue = await contract.retrieve();
    console.log(CHECK + `Stored value is: ${highlight(initialValue, "blue")}`);
    
    console.log(`Calling ${highlight("store(22)", "gray")} to set stored value to 22...`);
    const store_Tx = await contract.store(22);
    const store_Rc = await store_Tx.wait(); 
    console.log(`Calling ${highlight("retrieve()", "gray")} to fetch new value...`);
    const newValue = await contract.retrieve();
    console.log(CHECK + `Stored value is: ${highlight(newValue, "blue")}`);
    console.log();
    
    console.log("==============" + " TESTING " + "==============");
    console.log("store_Tx: ", store_Tx);
    console.log("store_Rc: ", store_Rc);
    console.log();

    console.log("==============" + " TRANSACTIONS " + "==============");
    parseReceipt(contractName, contract_Rc);
    parseReceipt("store", store_Rc);
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
// PS C:\Users\brian\Desktop\Coding\relearning-solidity> npx hardhat run .\scripts\deploy-Box.js

// ============== STATUS ==============
// Deploying Box contract...
// Box contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Calling retrieve() to fetch stored value...
// Stored value is: 0
// Calling store(22) to set stored value to 22...
// Calling retrieve() to fetch stored value...
// Stored value is: 22

// ============== LOGISTICS ==============
// Deployer Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// Deployer Balance: 9999.9997 ETH
// Suggested Gas Price: 1.500000008 gwei
// Block:  1
// Nonce:  0    



// =======================
// ||       Output      ||
// =======================
// PS C:\Users\brian\Desktop\Coding\relearning-solidity> npx hardhat run .\scripts\deploy-Box.js --network rinkeby

// ============== STATUS ==============
// Deploying Box contract...
//   ✓ Box contract deployed to: 0xbA6e35771dC2763c8a5D899bc1d7ccB8894014F1
// Calling retrieve() to fetch stored value...
//   ✓ Stored value is: 0
// Calling store(22) to set stored value to 22...
// Calling retrieve() to fetch stored value...
//   ✓ Stored value is: 22

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 23.7271 ETH
// Block:  null
// Nonce:  99
