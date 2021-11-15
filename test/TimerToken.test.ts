/* eslint-disable prettier/prettier */
/* eslint-disable node/no-missing-import */
/* eslint-disable no-unused-vars */

import { expect } from "chai";
import { ethers } from "hardhat";
import { TimerToken } from "../typechain/TimerToken";
import { Contribute } from "../typechain";
import { Accounts } from "../scripts/Accounts";
// import { MockProvider } from "ethereum-waffle";
// const provider = new MockProvider(); * BUG ?*
const provider = ethers.provider;

let contractA: TimerToken;
let contractB: Contribute;
let timerTokenAddress: string;
let contributeAddress: string;

const NOW = Math.floor(Date.now() / 1000); // solidity block.timestamp = seconds
const TWO_DAYS = 86400 * 2;
const twoDaysAgo = NOW - TWO_DAYS; // 1636779600;
const twoDaysFromNow = NOW + TWO_DAYS; // 1637125200;

// DEPLOY
//
beforeEach(async () => {
  // deploy timer token
  const TimerToken = await ethers.getContractFactory("TimerToken");
  contractA = await TimerToken.deploy(10000000, twoDaysAgo, twoDaysFromNow);
  await contractA.deployed();
  timerTokenAddress = contractA.address;
  console.log("TimerToken Deployed: " + timerTokenAddress);

  // deploy contribute contract
  const Contribute = await ethers.getContractFactory("Contribute");
  contractB = await Contribute.deploy(timerTokenAddress);
  await contractB.deployed();
  contributeAddress = contractB.address;
  console.log("Contribute Deployed: " + contributeAddress);
});

describe("TimerToken && Contribute", () => {
  // TESTS
  //
  describe("", () => {
    it("returns total token supply of contract", async () => {
      expect(contractA.totalSupply());
      const totalSupply = await contractA.totalSupply();
      console.log("total supply: " + totalSupply);

      const [owner] = await ethers.getSigners();
      const ownerBalance = await contractA.balanceOf(owner.address);
      // expect(await contractA.totalSupply()).to.equal(ownerBalance);
    });

    it("returns total token supply of contract owner", async () => {
      const [owner] = await ethers.getSigners();
      const ownerBalance = await contractA.balanceOf(owner.address);
      // expect(await contractA.totalSupply()).to.equal(ownerBalance);
      console.log("contract owner: " + JSON.stringify(owner));
      console.log("owner balance: " + ownerBalance);
    });

    it("send eth from wallet to contribute contract", async () => {
      // const [wallet1, wallet2, wallet3] = provider.getWallets(); // *BUG ?* wallets return 0.1 eth but can send 1
      const wallet = provider.getSigner(Accounts.two.address);

      const SEND_ETHER_AMOUNT = "1";
      const EXPECTED_RETURN_VALUE = "1.0";

      // get eth balance of Contrubute
      let ContributeEthBalance = await provider.getBalance(contributeAddress);
      console.log(
        "balance of Contribute Eth BEFORE: " +
          ethers.utils.formatEther(ContributeEthBalance)
      );

      // eth wallet2 before
      let bigNumber = await ethers.provider.getBalance(Accounts.two.address);
      console.log(
        "before balance wallet: " + ethers.utils.formatEther(bigNumber)
      );

      const tx = {
        from: Accounts.two.address,
        to: contributeAddress,
        value: ethers.utils.parseEther(SEND_ETHER_AMOUNT),
      };

      const receipt = await wallet.sendTransaction(tx);
      // console.log("receipt: " + receipt);

      // eth after
      // bigNumber = await wallet.getBalance(); *BUG ?* RETURNS  0.1 eth
      bigNumber = await ethers.provider.getBalance(Accounts.two.address);
      console.log(
        "after balance wallet: " + ethers.utils.formatEther(bigNumber)
      );

      // get eth balance
      ContributeEthBalance = await provider.getBalance(contributeAddress);
      expect(ethers.utils.formatEther(ContributeEthBalance)).equal(
        EXPECTED_RETURN_VALUE
      );
      console.log(
        "balance of Contribute Eth AFTER: " +
          ethers.utils.formatEther(ContributeEthBalance)
      );
      // console.log("\n" + JSON.stringify(receipt));
    });
  });
});
