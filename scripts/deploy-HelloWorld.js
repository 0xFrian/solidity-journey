const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners(); 
    const contractName = "HelloWorld"; 
    const contractFactory = await ethers.getContractFactory(contractName); 
    
    console.log();
    console.log("==============" + " STATUS " + "==============");
    console.log(`Deploying ${contractName} contract...`);
    const contract = await contractFactory.deploy(); 
    await contract.deployed(); 
    const transaction = contract.deployTransaction; 
    const contractAddress = contract.address; 
    console.log("  ✓ " + `${contractName} contract deployed to: ${contractAddress}`);
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
// ||       Output      ||
// =======================
// PS C:\Users\brian\Desktop\Coding\solidity-journey> npx hardhat run .\scripts\deploy-HelloWorld.js --network ropsten

// ============== STATUS ==============
// Deploying HelloWorld contract...
//   ✓ HelloWorld contract deployed to: 0x84e03BC82c9623F85FE980e1532281Fd6e817406

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 23.6444 ETH
// Block:  null
// Nonce:  103

