require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

module.exports ={
  solidity: "0.8.27",
  networks:{
    localhost:{
      url:"http://localhost:8545"
    },
    sepolia:{
      url:`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts:[process.env.PRIVATE_KEY]
    },
    // localhost_fork: {// npx hardhat node --fork <mainnet-rpc-url>
    //   url: "http://localhost:8545",
    //   accounts: [process.env.PRIVATE_KEY],
    //   forking:{
    //     enabled:true,        
    //   }
    // },
    // amoy:{
    //   url:`https://polygon-amoy.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    //   accounts:[process.env.PRIVATE_KEY]
    // },
    // polygon_mainnet:{
    //   url:`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    //   accounts:[process.env.PRIVATE_KEY]
    // },
    // ethereum_mainnet:{
    //   url:`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    //   accounts:[process.env.PRIVATE_KEY]
    // }

  }
}

