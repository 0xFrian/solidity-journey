const { ethers } = require("hardhat");

const highlight = (msg) => {
    const reset = "\x1b[0m";
    const cyan = "\x1b[36m";
    highlighted_msg = cyan + msg + reset;
    return highlighted_msg;
}

const CHECK = "  " + "\x1b[32m" + "✓" + "\x1b[0m" + " "; // "\x1b[32m" is Green and "\x1b[0m" is original

async function main() {
    const [deployer] = await ethers.getSigners(); 
    const contractName = "DefaultValues"; 
    const contractFactory = await ethers.getContractFactory(contractName);

    console.log();
    console.log("==============" + " STATUS " + "==============");
    console.log(`Connecting to ${contractName} contract...`);
    const deployedAddr = "0x36A5c65d56525E70A493095a3Befb8c67ab2763c" // Rinkeby
    const contract = await contractFactory.attach(deployedAddr);
    console.log(CHECK + `Connected to ${contractName} contract`);
    console.log();

    console.log("==============" + " TESTING " + "==============");
    console.log("Calling myBool() function..."); 
    const output_myBool = await contract.myBool();
    console.log(CHECK + `myBool() returns: ${highlight(output_myBool)}`);
    console.log("Calling myUint() function...");
    const output_myUint = await contract.myUint();
    console.log(CHECK + `myUint() returns: ${highlight(output_myUint)}`);
    console.log("Calling myInt() function...");
    const output_myInt = await contract.myInt();
    console.log(CHECK + `myInt() returns: ${highlight(output_myInt)}`);
    console.log("Calling myAddr() function...");
    const output_myAddr = await contract.myAddr();
    console.log(CHECK + `myAddr() returns: ${highlight(output_myAddr)}`);
    console.log("Calling myB32() function...");
    const output_myB32 = await contract.myB32();
    console.log(CHECK + `myB32() returns: ${highlight(output_myB32)}`);
    console.log();
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error); 
        process.exit(1);     
    });
