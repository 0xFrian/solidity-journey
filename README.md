<h1 style="color: #BF616A">solidity-journey</h1>

Journey from small potato to shadowy Solidity super coder

![](https://i.imgur.com/4tBWzhC.jpg)

<h2 style="color: #D08770">Purpose</h2>

The Remix IDE is a popular introduction to Ethereum development designed to streamline the process of writing, deploying, and interacting with Solidity smart contracts.

Similarly, this repository demonstrates how to deploy and interact with Solidity smart contracts using **JavaScript**, **Ethers**, **Hardhat**, and **Alchemy**.

<h2 style="color: #D08770">Quick Guide</h2>


<h3 style="color: #EBCB8B">Step 1 - Clone this repository into your desired folder</h3>

Let's begin by creating a folder and then copying the contents of this repository into the newly created folder.

```
mkdir <folder-name>
cd <folder-name>
git clone https://github.com/0xFrian/solidity-journey.git .
```
<h3 style="color: #EBCB8B">Step 2 - Download dependencies</h3>

Using npm, we download all the relevant packages/libraries for our development environment.

```
npm install --save-dev hardhat 
npm install --save-dev @nomiclabs/hardhat-ethers 
npm install --save-dev @nomiclabs/hardhat-waffle
npm install --save-dev ethers
npm install --save-dev ethereum-waffle
npm install --save-dev dotenv
```

<h3 style="color: #EBCB8B">Step 3 - Configure environmental variables</h3>

Users can create free accounts on [Alchemy](https://www.alchemy.com/) and obtain an API key for testnets **Ropsten** and **Rinkeby**.

```
ROPSTEN_API_KEY= . . .
RINKEBY_API_KEY= . . .
PRIVATE_KEY= . . .
```

<h3 style="color: #EBCB8B">Step 4 - Compile and deploy contracts</h4>

Finally, we have all that we need to run the JavaScript files and deploy our smart contracts! 

Let's try deploying the HelloWorld contract onto our local Hardhat chain.

##### Note: we are still in the root directory of this repository.

```
npx hardhat compile
npx hardhat run .\scripts\deploy-HelloWorld.js
```

Next, try deploying the HelloWorld contract onto Ropsten testnet.

##### Note: replace "ropsten" with "rinkeby" to deploy onto Rinkeby testnet

```
npx hardhat run .\scripts\deploy-HelloWorld.js --network ropsten
```

<h3 style="color: #EBCB8B">Step 5 - Have fun and experiment!</h3>

If you'd like to learn more and experiment with some contract(s) and how to deploy/interact with them, then you would just run the corresponding JavaScript file

```
npx hardhat run .\scripts\<file-name> --network <network-name>
```

<h2 style="color: #D08770">References</h2>

Most of the content in the contracts directory is derived from [Solidity by Example](https://solidity-by-example.org/).


