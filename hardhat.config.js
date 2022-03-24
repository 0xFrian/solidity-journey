const path = require("path");
const dotenvPath = path.resolve(__dirname, "settings", "info.env");
require("dotenv").config({ path: dotenvPath });
require("@nomiclabs/hardhat-ethers");


const ROPSTEN_API_KEY = process.env.ROPSTEN_API_KEY;
const RINKEBY_API_KEY = process.env.RINKEBY_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.7.0",
      },
    ],
  },
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ROPSTEN_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
      gasMultiplier: 2
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${RINKEBY_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`]
    }
  }
};
