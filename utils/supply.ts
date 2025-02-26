import BigNumber from "bignumber.js";
import { getContract, getBalance } from "./web3";
import erc20 from "./abis/erc20.json";

const SNS = "0x7B0a41f0c17474e41a0c36c0Bf33b9AED06eE9f5";
const DAO_WALLET = "0xCE36558B59DB0884EB001E26ea2d8b68c1A87552";
const ECOSYSTEM_WALLET = "0x8FA959013eb350bF068Dfdccc4Cf7774976B9Ffc";
const DEV_WALLET = "0x773fe1c97181262484319703373D81874560900e";

const DaoTokens = getBalance(erc20, SNS, DAO_WALLET);
const EcosystemTokens = getBalance(erc20, SNS, ECOSYSTEM_WALLET);
const DevTokens = getBalance(erc20, SNS, DEV_WALLET);

const contract = getContract(erc20, SNS);

export const getTotalSupply = async (): Promise<BigNumber> => {
  const supply = await contract.methods.totalSupply().call();

  return new BigNumber(supply);
};

export const getLockedSns = async (): Promise<BigNumber> => {
  const daoAmount = await DaoTokens;
  const ecosystemAmount = await EcosystemTokens;
  const devAmount = await DevTokens;

  const lockedAmount = daoAmount.plus(ecosystemAmount).plus(devAmount);

  return new BigNumber(lockedAmount);
};
