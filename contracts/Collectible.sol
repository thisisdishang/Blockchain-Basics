// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


/// @title Collectible NFT Contract
/// @notice This contract allows you to create and manage ERC721 NFTs with URI storage.
/// @dev This contract utilizes OpenZeppelin libraries for standard ERC721 functionality and additional features.
contract Collectible is ERC721, ERC721URIStorage {
    /// @notice Counter to keep track of the next token ID
    uint256 private _nextTokenId;

    /// @notice Constructor to set the token name, symbol
    constructor()
        ERC721("YourCollectible", "YCB")
    {}

    /// @notice Function to mint a new token
    /// @dev Mints a new token to the specified address with the given URI.
    /// @param to The address to which the token is assigned
    /// @param uri The metadata URI of the token
    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    /// @notice Function to return the token URI
    /// @dev This function is overridden to return the URI of a token
    /// @param tokenId The ID of the token
    /// @return A string representing the token URI
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
