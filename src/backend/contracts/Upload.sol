// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// contract Upload is ERC721URIStorage{
//     uint public tokenId;

//     constructor() ERC721("Smart India Hackathon","SIH"){}

//     function uploadImage(string memory _CID) external returns(uint){
//         tokenId++;
//         _setTokenURI(tokenId, _CID);
//         return tokenId;
//     }
// }

contract Upload {
    uint public tokenId;

    // modifier onlyAuthorized(address givenAddress) {
    //     require(msg.sender == givenAddress);
    //     _;
    // }

    mapping(uint => string) public tokenCID;

    function uploadImage(string memory _CID) external returns(uint){
        tokenId++;
        tokenCID[tokenId] = _CID;
        return tokenId;
    }

    function getTokenURI(uint id) public view returns(string memory){
        return tokenCID[id];
    }
}