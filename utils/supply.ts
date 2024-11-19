import BigNumber from "bignumber.js";
import { getContract, getBalance } from "./web3";
import erc20 from "./abis/erc20.json";

const SNS = "0xD702993613686Ab0f706Ef07883870a97D36fdcf";
const DAO_WALLET = "0x14943dD2180b657f7C5139c2C20E950fa1af4276";
const ECOSYSTEM_WALLET = "0xD77431338B21CcBa8E568F97a74DA13107067222";
const DEV_WALLET = "0x47a7E8b0816a089ad1493676073Bb8f7414d3380";

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
