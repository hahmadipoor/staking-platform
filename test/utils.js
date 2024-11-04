const { ethers } = require("hardhat");
require("dotenv").config();

const getProvider=(networkName)=>{
    const rpc_url=networkName=="localhost" 
                ? "http://localhost:8545"
                :networkName=="sepolia"
                ?`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
                :"";
    const provider = new ethers.JsonRpcProvider(rpc_url);
    return provider;
}

const getSigner=async (networkName)=>{
    
    const provider=getProvider(networkName);
    let privateKey = networkName=="localhost"?"":process.env.PRIVATE_KEY;
    //let wallet = privateKey? new ethers.Wallet(privateKey):"";
    let wallet = privateKey? new ethers.Wallet(privateKey, provider):"";
    //local node should be running    
    signer = networkName=="localhost"? (await ethers.getSigners())[0]: wallet;   
    return signer
}

const getAccountOtherThanDeployer=async (networkName)=>{
    
    const provider=getProvider(networkName);
    let privateKey = networkName=="localhost"?"":process.env.PRIVATE_KEY2;
    //let wallet = privateKey? new ethers.Wallet(privateKey):"";
    let wallet = privateKey? new ethers.Wallet(privateKey, provider):"";
    //local node should be running    
    signer = networkName=="localhost"? (await ethers.getSigners())[1]: wallet;   
    return signer
}

module.exports={
    getProvider,
    getSigner,
    getAccountOtherThanDeployer
}