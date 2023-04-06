//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Auction {
    address public currentLeader;
    uint highestBid;

    constructor() {
        currentLeader = msg.sender;
    }

    function bid() public payable {
        require(msg.value > highestBid);
        require(payable(currentLeader).send(highestBid));

        currentLeader = msg.sender;
        highestBid = msg.value;
    }
}
