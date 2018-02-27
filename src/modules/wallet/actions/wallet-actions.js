import authService from "../../../services/authService";
import history from "../../../utils/history";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import { WALLET_ROUTE } from "../wallet.constants";
import * as actionTypes from "./wallet-actions.constants";

/*
Promise.all([
  Promise.resolve({ amount: 100, rate: 22 }),
  Promise.resolve("0x0000000000000000000000000000000000000gv")
]) */
const fetchWallet = () => {
  return {
    type: actionTypes.WALLET,
    payload: Promise.resolve({ amount: 100, rate: 22 })
  };
};

const fetchWalletAddress = () => {
  return {
    type: actionTypes.WALLET_ADDRESS,
    payload: Promise.resolve("0x0000000000000000000000000000000000000gv")
  };
};

const fetchWalletTransactions = () => {
  return {
    type: actionTypes.WALLET_TRANSACTIONS,
    payload: Promise.resolve({
      transactions: [
        {
          id: "1",
          type: "Deposit",
          amount: 10,
          rate: 22,
          programName: "Program A",
          date: "2018-02-26T12:47:40.983Z",
          transactionId:
            "0x777f620f020b4c6765d600ea7832fb94286d9462acbfef30b2e49df6220f2fe8"
        }
      ]
    })
  };
};

const walletWithdraw = ({ address, amount }) => {
  return {
    type: actionTypes.WALLET_WITHDRAW,
    payload: Promise.resolve(1).then(response => {
      history.push(WALLET_ROUTE);
      return response;
    })
  };
};

const walletActions = {
  fetchWallet,
  fetchWalletTransactions,
  fetchWalletAddress,
  walletWithdraw
};
export default walletActions;
