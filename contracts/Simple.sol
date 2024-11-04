// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Simple {
   
    event NameSet(string name);

    string private _name;
    address public immutable owner;

    constructor(string  memory name_) payable {
        _name=name_;
        owner=msg.sender;
    }

    function getName() public view returns (string memory){
    
        return _name;
    }

    function changeName(string memory newName) public returns(string  memory){

        require(msg.sender==owner, "NotOwner");
        _name=newName;
        emit NameSet(newName);
        return newName;
    }
   
}
