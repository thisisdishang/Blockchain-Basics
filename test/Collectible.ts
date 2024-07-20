import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Collectible", function () {
    async function deployCollectibleFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const Collectible = await hre.ethers.getContractFactory("Collectible");
        const collectible = await Collectible.deploy();

        return { collectible, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should deploy with the correct name and symbol", async function () {
            const { collectible } = await loadFixture(deployCollectibleFixture);

            expect(await collectible.name()).to.equal("YourCollectible");
            expect(await collectible.symbol()).to.equal("YCB");
        });
    });

    describe("Minting", function () {
        it("Should mint a new token and assign it to the correct owner", async function () {
            const { collectible, owner } = await loadFixture(deployCollectibleFixture);
            const tokenURI = "https://ipfs.io/ipfs/QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr";

            await collectible.safeMint(owner.address, tokenURI);

            expect(await collectible.ownerOf(0)).to.equal(owner.address);
        });

        it("Should correctly set the token URI", async function () {
            const { collectible, owner } = await loadFixture(deployCollectibleFixture);
            const tokenURI = "https://ipfs.io/ipfs/QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr";

            await collectible.safeMint(owner.address, tokenURI);

            expect(await collectible.tokenURI(0)).to.equal(tokenURI);
        });
    });

    describe("Transfers", function () {
        it("Should transfer the token to another account", async function () {
            const { collectible, owner, otherAccount } = await loadFixture(deployCollectibleFixture);
            const tokenURI = "https://ipfs.io/ipfs/QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr";

            await collectible.safeMint(owner.address, tokenURI);
            await collectible["safeTransferFrom(address,address,uint256)"](owner.address, otherAccount.address, 0);

            expect(await collectible.ownerOf(0)).to.equal(otherAccount.address);
        });
    });

    describe("URI Storage", function () {
        it("Should return the correct token URI after transfer", async function () {
            const { collectible, owner, otherAccount } = await loadFixture(deployCollectibleFixture);
            const tokenURI = "https://ipfs.io/ipfs/QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr";

            await collectible.safeMint(owner.address, tokenURI);
            await collectible["safeTransferFrom(address,address,uint256)"](owner.address, otherAccount.address, 0);

            expect(await collectible.tokenURI(0)).to.equal(tokenURI);
        });
    });

    describe("Supports Interface", function () {
        it("Should support the ERC721 interface", async function () {
            const { collectible } = await loadFixture(deployCollectibleFixture);
            const ERC721InterfaceId = "0x80ac58cd";

            expect(await collectible.supportsInterface(ERC721InterfaceId)).to.equal(true);
        });

        it("Should support the ERC721 URI Storage interface", async function () {
            const { collectible } = await loadFixture(deployCollectibleFixture);
            const ERC721URIStorageInterfaceId = "0x5b5e139f";

            expect(await collectible.supportsInterface(ERC721URIStorageInterfaceId)).to.equal(true);
        });
    });
});
