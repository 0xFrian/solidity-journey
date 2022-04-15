# solidity-journey

> Journey from small potato to shadowy Solidity super coder

![](https://i.imgur.com/4tBWzhC.jpg)

## Purpose

The **Remix IDE** is a popular introduction to Ethereum development as it is designed to streamline the process of writing, deploying, and interacting with **Solidity** smart contracts.

This repository is meant to help those learning Ethereum development but wanting to move outside of **Remix IDE**. The content within the `scripts` folder demonstrates how to deploy and interact with **Solidity** smart contracts found in the `contracts` folder using **JavaScript**, **ethers.js**, **Hardhat**, and **Alchemy**.

## Quick Guide

### Step 1 - Clone this repository into your desired folder

Let's begin by creating a folder and then copying the contents of this repository into the newly created folder.

```
mkdir <folder-name>
cd <folder-name>
git clone https://github.com/0xFrian/solidity-journey.git .
```

### Step 2 - Download dependencies

Using **npm**, we download all the relevant packages/libraries for our development environment.

```
npm install --save-dev hardhat 
npm install --save-dev @nomiclabs/hardhat-ethers 
npm install --save-dev @nomiclabs/hardhat-waffle
npm install --save-dev ethers
npm install --save-dev ethereum-waffle
npm install --save-dev dotenv
```

### Step 3 - Configure environmental variables 

Private keys are needed to create/sign transactions and API keys to broadcast transactions. This project references the private key and API keys from the `info.env` file found in the `settings` folder.

Users can create free accounts on [Alchemy](https://www.alchemy.com/) and obtain an API key for testnets **Ropsten** and **Rinkeby**.

```
ROPSTEN_API_KEY= . . .
RINKEBY_API_KEY= . . .
PRIVATE_KEY= . . .
```

### Step 4 - Compile and deploy contracts

Finally, we have all that we need to run the **JavaScript** files and deploy our smart contracts! 

To check if everythign works, let's try deploying the **HelloWorld** contract onto our **local Hardhat chain**.

##### Note: we are still in the root directory of this repository.

```
npx hardhat compile
npx hardhat run .\scripts\deploy-HelloWorld.js
```

Next, let's try deploying the **HelloWorld** contract onto **Ropsten** testnet by adding `--network ropsten`.

##### Note: replace "ropsten" with "rinkeby" to deploy onto Rinkeby testnet

```
npx hardhat run .\scripts\deploy-HelloWorld.js --network ropsten
```

This repository is designed such that the `scripts` folder contains **JavaScript** files that can be ran using the `npx hardhat run` command to deploy and interact with the **Solidity** smart contracts found in the `contracts` folder. Feel free to experiment!

## References

Most of the content in the contracts directory is derived from [Solidity by Example](https://solidity-by-example.org/).

## Contact

Feel free to message me! :D
- Twitter: frian_eth
- Telegram: frian_eth
