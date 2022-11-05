require("@nomicfoundation/hardhat-toolbox");

task("blockNumber", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current B number: ${blockNumber}`); 
    });


module.exports = {

};