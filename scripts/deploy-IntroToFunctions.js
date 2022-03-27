const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners(); 
    const contractName = "IntroToFunctions"; 
    const contractFactory = await ethers.getContractFactory(contractName);

    console.log(); 
    console.log("==============" + " STATUS " + "==============");
    console.log(`Deploying ${contractName} contract...`);
    const contract = await contractFactory.deploy(); 
    await contract.deployed(); 
    const transaction = contract.deployTransaction; 
    const contractAddress = contract.address;
    console.log("  ✓ " + `${contractName} contract deployed to: ${contractAddress}`);
    console.log("Calling add(10, 12)...");
    const add_Tx = await contract.add(10, 12); 
    // await add_Tx.wait(); 
    console.log("  ✓ " + `Result: ${add_Tx.toString()}`);
    console.log("calling sub(10, 5)...");
    const sub_Tx = await contract.sub(10, 5); 
    // await sub_Tx.wait(); 
    console.log("  ✓ " + `Result: ${sub_Tx.toString()}`);
    console.log();
    
    console.log("==============" + " TESTING " + "==============");
    console.log("add_Tx: ", add_Tx); 
    console.log("sub_Tx: ", sub_Tx); 
    console.log(); 

    console.log("==============" + " LOGISTICS " + "==============");
    const deployerAddress = deployer.address; 
    let deployerBalance = await deployer.getBalance(); 
    deployerBalance = parseFloat(ethers.utils.formatUnits(deployerBalance, "ether")).toFixed(4); 
    console.log(`Deployer Address: ${deployerAddress}`);
    console.log(`Deployer Balance: ${deployerBalance} ETH`);
    console.log("Block: ", transaction.blockNumber);
    console.log("Nonce: ", transaction.nonce); 
    console.log();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error); 
        process.exit(1);     
    });



// =======================
// ||                   ||
// ||       Output      ||
// ||                   ||
// =======================

// PS C:\Users\brian\Desktop\Coding\solidity-journey> npx hardhat run .\scripts\deploy-IntroToFunctions.js --network rinkeby

// ============== STATUS ==============
// Deploying IntroToFunctions contract...
//     ✓ IntroToFunctions contract deployed to: 0xD63A8cA8E644FF7bFe79EBcB7EcEc122D07E9b41
// Calling add(10, 12)...
//     ✓ Result: 22
// calling sub(10, 5)...
//     ✓ Result: 5

// ============== TESTING ==============
// add_Tx:  BigNumber { value: "22" }
// sub_Tx:  BigNumber { value: "5" }

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 134.1975 ETH
// Block:  null
// Nonce:  14