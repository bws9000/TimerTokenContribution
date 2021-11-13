/* eslint-disable prettier/prettier */
/* eslint-disable node/no-missing-import */
/* eslint-disable no-unused-vars */

import { expect } from "chai";
import { ethers } from "hardhat";
import { TimerToken } from "../typechain/TimerToken";
import { Accounts } from "../scripts/Accounts";

describe("TimerToken", () => {
  let contract: TimerToken;
  const nowTimestampSeconds = Math.floor(Date.now() / 1000);
  const nowTimestampSecondsPlus10 = nowTimestampSeconds + 10000;

  beforeEach(async () => {
    console.log("nowSeconds: " + nowTimestampSeconds);
    // console.log("account one: " + Accounts.one.address);
    // console.log("account two: " + Accounts.two.address);
    const TimerToken = await ethers.getContractFactory("TimerToken");
    contract = await TimerToken.deploy(
      100000,
      nowTimestampSeconds,
      nowTimestampSecondsPlus10
    );
    await contract.deployed();
  });

  describe("totalSuply", () => {
    it("returns total token supply of contract", async () => {
      expect(contract.totalSupply());
      const totalSupply = await contract.totalSupply();
      console.log("total supply: " + totalSupply);
    });
  });
});
