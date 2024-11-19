import BigNumber from "bignumber.js";
import { getContract, getBalance } from "./web3";
import erc20 from "./abis/erc20.json";

const SNS = "0xD702993613686Ab0f706Ef07883870a97D36fdcf";
const DAO_WALLET = "0x14943dD2180b657f7C5139c2C20E950fa1af4276";

const DaoTokens = getBalance(erc20, SNS, DAO_WALLET);

const contract = getContract(erc20, SNS);

export const getTotalSupply = async (): Promise<BigNumber> => {
  const supply = await contract.methods.totalSupply().call();

  return new BigNumber(supply);
};

export const getLockedSns = async (): Promise<BigNumber> => {
  const lockedAmount = await DaoTokens;
  return new BigNumber(lockedAmount);
};