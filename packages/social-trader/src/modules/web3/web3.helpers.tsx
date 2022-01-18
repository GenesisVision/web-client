import { InjectedConnector } from "@web3-react/injected-connector";

export const metamaskConnector = new InjectedConnector({});

const bnbDecimals = 18;
const xDaiDecimals = 18;

export const web3InvestMinValue = Number(`0.${"0".repeat(bnbDecimals - 1)}1`);
