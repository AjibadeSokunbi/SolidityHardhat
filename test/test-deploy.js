const {expect, assert} = require("chai");


describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })


  it("should start with 0", async function () {
     const currentValue = await simpleStorage.retrieve()
     const expectedValue = "0"

     assert.equal(currentValue.toString(), expectedValue)
  })
  it("should start with 8", async function () {
    const expectedValue = "8"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
 })
})