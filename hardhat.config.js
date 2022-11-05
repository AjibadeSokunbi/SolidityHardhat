require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("./tasks/block-number")


/** @type import('hardhat/config').HardhatUserConfig */

const URL = process.env.URL;
const KEY = process.env.KEY
const EKEY = process.env.EKEY
const CKEY = process.env.CKEY

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
        url: URL,
        accounts: [KEY],
        chainId: 5,
    },
  },
  localhost: {
    url: "http://127.0.0.1:8545/",
    chainId: 31337,
},
  solidity: "0.8.8",
  etherscan: {

    apiKey: {
      goerli: EKEY
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt", 
    noColors: true,
    currency: "USD",
    coinmarketcap: CKEY,
  }
};
