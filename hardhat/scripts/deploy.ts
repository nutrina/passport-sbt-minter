const { ethers } = require("hardhat");
 
async function main() {
  const domainName = "stamp-vc-verifier-test";

  // Grab the contract factory
  const PassportSBToken = await ethers.getContractFactory("PassportSBToken");
  const StampVcVerifier = await ethers.getContractFactory("StampVcVerifier");

  // Start deployment, returning a promise that resolves to a contract object
  const passportSbtoken = await PassportSBToken.deploy(); // Instance of the contract
  await passportSbtoken.deployed();

  const stampVcVerifier = await StampVcVerifier.deploy(domainName, "0xB81C935D01e734b3D8bb233F5c4E1D72DBC30f6c"); // Instance of the contract
  await stampVcVerifier.deployed();

  console.log("Contract PassportSBToken deployed to address:", passportSbtoken.address);
  console.log("Contract StampVcVerifier deployed to address:", stampVcVerifier.address);
}
 
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });