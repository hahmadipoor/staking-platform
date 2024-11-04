const { expect } = require("chai");
const hre=require("hardhat");
const { getSigner, getProvider, getAccountOtherThanDeployer } = require("./utils");
const {ethers} =require("hardhat")



describe("Simple", function () {

  let deployer;
  let provider;
  let deployerBalanceBefore;
  let txDeployReceipt;

  before(async () => {
      deployer=await getSigner(hre.network.name);
      provider=getProvider(hre.network.name);
      deployerBalanceBefore=await provider.getBalance(deployer.address);
      const SimpleFactory = await ethers.getContractFactory("Simple");
      simpleContract = await SimpleFactory.deploy("hossein", { value: 5 });
      txDeployReceipt = await simpleContract.deploymentTransaction().wait(1);
  });

  describe("Deployment", function () {
  
    it("contract should be deployed before", async function () {
      
      const deployerBalanceAfter=await provider.getBalance(deployer.address);
      expect(txDeployReceipt.from).to.equal(deployer.address);
      const contractBalance=await provider.getBalance(txDeployReceipt.contractAddress);
      expect(contractBalance).to.be.gte(5);
      if(hre.network.name!="localhost"){//only for sepolia and mainnet, not for local
        expect(deployerBalanceAfter).to.be.lt(deployerBalanceBefore);     
      }
      
    });
  });

  describe("getName function", function () {
  
    it("should return correct name", async function () {
        
      console.log("tx deploy receipt",txDeployReceipt);  
        simpleContract=await ethers.getContractAt("Simple", txDeployReceipt.contractAddress);
        const name=await simpleContract.getName();
        expect(name).to.be.equal("hossein");
    });

    it("should return correct owner address", async function () {

      simpleContract=await ethers.getContractAt("Simple", txDeployReceipt.contractAddress);
      const ownerAddress=await simpleContract.owner();
      expect(ownerAddress).to.be.equal(deployer);
    });
  })  
  
  describe("setName function", function() {

      it("When owner modifies name the contract should emit event", async function () {

        simpleContract=await ethers.getContractAt("Simple", txDeployReceipt.contractAddress);
        await expect(simpleContract.changeName("ali")).to.emit(simpleContract, "NameSet").withArgs("ali");
      });
  
      it("No one other owner can modify the name", async function () {
  
        simpleContract=await ethers.getContractAt("Simple", txDeployReceipt.contractAddress);
        user = await getAccountOtherThanDeployer(hre.network.name);
        console.log("user",user);
        await expect(simpleContract.connect(user).changeName("ali")).to.be.revertedWith("NotOwner")
      });
   })
});
