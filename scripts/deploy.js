const { ethers } = require("hardhat");
require("dotenv").config();

const NETWORKS = {
  ZNX_TESTNET: "ZNX_TESTNET",
};

const UCC = {
  ZNX_TESTNET: "0x00F40F0014713f527E3e9ABa89aB45adaD0DfCe1",
};

const OWNER_CUT_PER_MILLION = 25000;

/**
 * @dev Steps:
 * Deploy the Collection implementation
 * Deploy the committee with the desired members. The owner will be the DAO bridge
 * Deploy the collection Manager. The owner will be the DAO bridge
 * Deploy the forwarder. Caller Is the collection manager.
 * Deploy the collection Factory. Owner is the forwarder.
 */
async function main() {
  const owner = process.env["OWNER"];

  // Deploy collection marketplace
  let acceptedToken = UCC["ZNX_TESTNET"];

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(
    acceptedToken,
    OWNER_CUT_PER_MILLION,
    owner
  );

  console.log("NFT Marketplace:", marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
