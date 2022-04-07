const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners(); 
    const contractName = "ValueTypes"; 
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
// PS C:\Users\brian\Desktop\Coding\solidity-journey> npx hardhat run .\scripts\deploy-ValueTypes.js --network ropsten

// ============== STATUS ==============
// Deploying ValueTypes contract...
//   ✓ ValueTypes contract deployed to: 0xd34765825D973819Acb4337BBC131Fb8082a7b27

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 23.5464 ETH
// Block:  null
// Nonce:  104

// =======================
// ||       Output      ||
// =======================
// PS C:\Users\brian\Desktop\Coding\solidity-journey> npx hardhat run .\scripts\deploy-ValueTypes.js --network rinkeby

// ============== STATUS ==============
// Deploying ValueTypes contract...
//   ✓ ValueTypes contract deployed to: 0xb4df27f5C83d4Ec83a331A6525477951d5fdC760

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 134.1954 ETH
// Block:  null
// Nonce:  24
