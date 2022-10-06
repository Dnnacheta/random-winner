// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants");

async function main() {
  /*
 A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
 so RandomWinner here is a factory for instances of our RandomWinner contract.
 */
  const RandomWinner = await ethers.getContractFactory("RandomWinner");
  // deploy the contract
  console.log("Deployment started🔹🔹🔹, returning a promise that resolves to a contract object 🤞"); 
  const randomWinnerGame = await RandomWinner.deploy(
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE
  );
  await randomWinnerGame.deployed();

  // print the address of the deployed contract // 0x8d8593a3AD310fc69D4A1297690B44a58147f997
  console.log("Contract deployed to address🎉:\n", randomWinnerGame.address);
  console.log("...............................")

  console.log("❕Sleeping.....😴");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying // https://mumbai.polygonscan.com/address/0x8d8593a3AD310fc69D4A1297690B44a58147f997#code
  await hre.run("verify:verify", {
    address: randomWinnerGame.address,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
