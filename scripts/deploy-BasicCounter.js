const { ethers } = require("hardhat"); 

async function main() {
    const [deployer] = await ethers.getSigners(); 
    const contractName = "BasicCounter"; 
    const contractFactory = await ethers.getContractFactory(contractName);

    console.log(); 
    console.log("==============" + " STATUS " + "==============");
    console.log(`Deploying ${contractName} contract...`);
    const contract = await contractFactory.deploy(); 
    await contract.deployed(); 
    const transaction = contract.deployTransaction; 
    const contractAddress = contract.address;
    console.log("  ✓ " + `${contractName} contract deployed to: ${contractAddress}`);
    console.log("Fetching count value..."); 
    let v_0 = await contract.get(); 
    console.log("  ✓ " +  `Count: ${v_0}`);
    console.log("Incrementing count...");
    const inc_Tx = await contract.inc(); 
    await inc_Tx.wait();
    console.log("  ✓ " + "Count incremented");
    console.log("Fetching count value..."); 
    let v_1 = await contract.get(); 
    console.log("  ✓ " +  `Count: ${v_1}`);
    console.log("Decrementing count...");
    const dec_Tx = await contract.dec(); 
    await dec_Tx.wait(); 
    console.log("  ✓ " + "Count decremented");
    console.log("Fetching count...");
    let v_2 = await contract.get(); 
    console.log("  ✓ " +  `Count: ${v_2}`);
    console.log();

    console.log("==============" + " TESTING " + "==============");
    console.log("inc_Tx: "); 
    console.log("  * " + `hash: ${inc_Tx.hash}`);
    console.log("  * " + `nonce: ${inc_Tx.nonce}`);
    console.log("  * " + `value: ${inc_Tx.value}`);
    console.log("inc_Tx: "); 
    console.log("  * " + `hash: ${dec_Tx.hash}`);
    console.log("  * " + `nonce: ${dec_Tx.nonce}`);
    console.log("  * " + `value: ${dec_Tx.value}`);
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
// PS C:\Users\brian\Desktop\Coding\solidity-journey> npx hardhat run .\scripts\deploy-BasicCounter.js --network rinkeby

// ============== STATUS ==============
// Deploying BasicCounter contract...
//   ✓ BasicCounter contract deployed to: 0x10016dC55640f2b8F1E904Caa06Fb2324CFFb5e9
// Fetching count value...
//   ✓ Count: 0
// Incrementing count...
//   ✓ Count incremented
// Fetching count value...
//   ✓ Count: 1
// Decrementing count...
//   ✓ Count decremented
// Fetching count...
//   ✓ Count: 0

// ============== TESTING ==============
// inc_Tx:
//   * hash: 0xf33e8542a5234e66b061b4a8ff349d89dfe22170cf46bfa065b30ecea66d16db
//   * nonce: 12
//   * value: 0
// inc_Tx:
//   * hash: 0x0093fc6f6aa8eded29463d4f6f1bfb6cdf5a01a6ab47d73d6fada130687ed2a3
//   * nonce: 13
//   * value: 0

// ============== LOGISTICS ==============
// Deployer Address: 0x0F49C3aB5dABF804a06B5762c7B4Ed145821c8D9
// Deployer Balance: 134.1979 ETH
// Block:  null
// Nonce:  11
