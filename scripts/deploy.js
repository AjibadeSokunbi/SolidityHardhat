// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const {ethers} = require("hardhat");
const { network } = require("hardhat");
const hre = require("hardhat");

async function main() {

  console.log("deploying");
  const SimpleStorageFactory = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorageFactory.deploy();

  await simpleStorage.deployed();

  console.log(`Deployed contract to: ${simpleStorage.address}`);

  if (network.config.chainId === 5 && process.env.EKEY) {
    console.log("waiting")
    await simpleStorage.deployTransaction.wait(6)
    verify(simpleStorage.address, [])
  }
  const currentValue = await simpleStorage.retrieve()
  console.log(`current value: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`updated value: ${updatedValue}`);
}


async function verify(contractAddress, args) {
    console.log("Verifying contract address: ");
    try {
          await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguements: args,
    })
    } catch (error) {
      if (error.message.toLowerCase().includes("already verified")) {
          console.log("Already verified");
      } else {
        console.log(error)
      }
    }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
