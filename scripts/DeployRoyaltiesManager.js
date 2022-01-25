const { ethers } = require("hardhat");
require("dotenv").config();

/**
 * @dev Steps:
 * Deploy the Royalties Manager
 */
async function main() {
  const network = process.env["ZNX_TESTNET"] || "LOCALHOST";
  if (!network) {
    throw "Invalid network";
  }

  const a = await ethers.provider.getSigner().getAddress();
  console.log(a);

  const RoyaltiesManager = await ethers.getContractFactory("RoyaltiesManager");
  const royaltiesManager = await RoyaltiesManager.deploy();

  console.log("Royalties Manager:", royaltiesManager.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
