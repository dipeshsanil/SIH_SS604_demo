const { expect } = require("chai");
const { ethers } = require("hardhat");
const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

describe("Smart India Hackathon", function () {
	let deployer, addr1, addr2, upload;
	let URI = "Sample URI";
	beforeEach(async function () {
		//get contract factories
		const Upload = await ethers.getContractFactory("Upload");
		//get signers
		[deployer, addr1, addr2] = await ethers.getSigners();
		//Deploy Contracts
		upload = await Upload.deploy();
	});
	describe("Upload Image", function () {
		it("Should track each Images", async function () {
			//addr1 uploads an Image
			await upload.connect(addr1).uploadImage(URI);
			expect(await upload.tokenId()).to.equal(1);
			expect(await upload.tokenCID(1)).to.equal(URI);

			//addr2 uploads an Image
			await upload.connect(addr2).uploadImage(URI);
			expect(await upload.tokenId()).to.equal(2);
			expect(await upload.tokenCID(2)).to.equal(URI);
		});
	});
});
