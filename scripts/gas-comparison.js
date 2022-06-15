// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  [deployer] = await ethers.getSigners();

  const Azuki = await ethers.getContractFactory("Azuki")
  const GameItem = await ethers.getContractFactory("GameItem")
  
  const azuki = await Azuki.deploy()
  recipt = await azuki.deployed()

  const gameItem = await GameItem.deploy()
  await gameItem.deployed()

  console.log("Tests")
  console.log("=====")

  tx = await azuki.mint(1)
  result = await tx.wait()
  const a_mint_first = result.gasUsed
  console.log("Azuki mint: " + result.gasUsed)
  tx = await azuki.mint(1)
  result = await tx.wait()
  const a_mint_second = result.gasUsed
  console.log("Azuki mint: " + result.gasUsed)
  tx = await azuki.mint(2)
  result = await tx.wait()
  const a_mint_2 = result.gasUsed
  console.log("Azuki mint: " + result.gasUsed)
  tx = await azuki.mint(3)
  result = await tx.wait()
  const a_mint_3 = result.gasUsed
  console.log("Azuki mint: " + result.gasUsed)
  tx = await azuki.mint(4)
  result = await tx.wait()
  const a_mint_4 = result.gasUsed
  console.log("Azuki mint: " + result.gasUsed)

  tx = await gameItem.mint()
  result = await tx.wait()
  const oz_mint_first = result.gasUsed
  console.log("OpenZeppelin mint: " + result.gasUsed)
  tx = await gameItem.mint()
  result = await tx.wait()
  const oz_mint_second = result.gasUsed
  console.log("OpenZeppelin mint: " + result.gasUsed)
  tx = await gameItem.mintWithAmount(2)
  result = await tx.wait()
  const oz_mint_2 = result.gasUsed
  console.log("OpenZeppelin mint: " + result.gasUsed)
  tx = await gameItem.mintWithAmount(3)
  result = await tx.wait()
  const oz_mint_3 = result.gasUsed
  console.log("OpenZeppelin mint: " + result.gasUsed)
  tx = await gameItem.mintWithAmount(4)
  result = await tx.wait()
  const oz_mint_4 = result.gasUsed
  console.log("OpenZeppelin mint: " + result.gasUsed)

  console.log("## Transfer tests ##")
  tx = await azuki.transferFrom(deployer.address, "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", 0)
  result = await tx.wait()
  const a_tx_lateral = result.gasUsed
  console.log("Azuki transfer: " + result.gasUsed)

  tx = await gameItem.transferFrom(deployer.address, "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", 0)
  result = await tx.wait()
  const oz_tx_lateral = result.gasUsed
  console.log("Openzeppelin transfer: " + result.gasUsed)
  
  
  tx = await azuki.transferFrom(deployer.address, "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", 9)
  result = await tx.wait()
  const a_tx_middle = result.gasUsed
  console.log("Azuki transfer: " + result.gasUsed)
  
  tx = await gameItem.transferFrom(deployer.address, "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", 9)
  result = await tx.wait()
  const oz_tx_middle = result.gasUsed
  console.log("Openzeppelin transfer: " + result.gasUsed)

  console.log("")
  console.log("Results")
  console.log("=======")

  console.log("First mint: " + (a_mint_first-oz_mint_first)*100/a_mint_first)
  console.log("Second mint: " + (a_mint_second-oz_mint_second)*100/a_mint_second)
  console.log("Mint two in a row: " + (a_mint_2-oz_mint_2)*100/a_mint_2)
  console.log("Mint three in a row: " + (a_mint_3-oz_mint_3)*100/a_mint_3)
  console.log("Mint four in a row: " + (a_mint_4-oz_mint_4)*100/a_mint_4)
  console.log("Mint four in a row: " + (a_mint_4-oz_mint_4)*100/a_mint_4)
  console.log("Latteral transfer: " + (a_tx_lateral-oz_tx_lateral)*100/a_tx_lateral)
  console.log("Middle transfer: " + (a_tx_middle-oz_tx_middle)*100/a_tx_middle)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
