const { ethers } = require("hardhat");
require("dotenv").config();

const UCC = {
  ZNX_TESTNET: "0x00F40F0014713f527E3e9ABa89aB45adaD0DfCe1",
};

const FEES_COLLECTOR_CUT_PER_MILLION = 0;
const ROYALTIES_CUT_PER_MILLION = 25000;
const ROYALTIES_MANAGER = "0x52ef6Ab42F65278343023314696F26FCB69Ac9B5";

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
  const feeCollector = process.env["FEE_COLLECTOR"];

  // Deploy collection marketplace
  let acceptedToken = UCC["ZNX_TESTNET"];

  const Marketplace = await ethers.getContractFactory("MarketplaceV2");
  const marketplace = await Marketplace.deploy(
    owner,
    feeCollector,
    acceptedToken,
    ROYALTIES_MANAGER,
    FEES_COLLECTOR_CUT_PER_MILLION,
    ROYALTIES_CUT_PER_MILLION
  );

  console.log("NFT Marketplace V2:", marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
