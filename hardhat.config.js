require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-web3");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    znxtestnet: {
      url: process.env.ZNX_TESTNET || "",
      accounts: process.env["MNEMONIC"]
        ? {
            mnemonic: process.env["MNEMONIC"]
              ? process.env["MNEMONIC"].replace(/,/g, " ")
              : "test test test test test test test test test test test junk",

            initialIndex: 0,
            count: 10,
            path: `m/44'/60'/0'/0`,
          }
        : [
            process.env["PRIVATE_KEY"]
              ? process.env["PRIVATE_KEY"]
              : "0x12345678911111111111111111111111111111111111111111111111111111",
          ],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
