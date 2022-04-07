const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners(); 
    const contractName = "DefaultValues";
    const contractFactory = await ethers.getContractFactory(contractName);

    console.log();
    console.log("==============" + " STATUS " + "==============");
    console.log(`Deploying ${contractName} contract...`);
    const contract = await contractFactory.deploy();
    const contract_Tx = await contract.deployed();  // promise
    const transaction = contract.deployTransaction; 
    const contractAddress = contract.address; 
    console.log("  " + `✓ ${contractName} contract deployed to: ${contractAddress}`);
    console.log();

    console.log("==============" + " TESTING " + "==============");
    // console.log("contract_Tx: ", contract_Tx);
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