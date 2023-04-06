const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, waffle } = require("hardhat");

describe("Attack", function () {
	it("After being declared the winner, Attack.sol should not allow anyone else to become the winner", async function () {
		// Deploy the Auction contract
		const auctionContract = await ethers.getContractFactory("Auction");
		const _auctionContract = await auctionContract.deploy();
		await _auctionContract.deployed();
		console.log("Auction Contract's Address:", _auctionContract.address);

		// Deploy the Attack contract
		const attackContract = await ethers.getContractFactory("Attack");
		const _attackContract = await attackContract.deploy(_auctionContract.address);
		await _attackContract.deployed();
		console.log("Attack Contract's Address", _attackContract.address);

		const [_, addr1, addr2] = await ethers.getSigners();

		let tx = await _auctionContract.connect(addr1).bid({
			value: ethers.utils.parseEther("1"),
		});
		await tx.wait();

		tx = await _attackContract.attack({
			value: ethers.utils.parseEther("3"),
		});
		await tx.wait();

		expect(await _auctionContract.currentLeader()).to.equal(
			_attackContract.address
		);
	});
});