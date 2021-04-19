// import Web3 from "web3";
import * as contractAbi from "./GenesisVisionGateway.json";

// for BNB
export const smartContractAddress =
  "0x82aB9C13E3F21298296e5a7d4cB2E4aCe6541322";

// for xDai
export const smartContractAddressDai =
  "0x03318813DA564193Ef603144c2ceAcDcdE8cFaFb";

// class BSC {
//   constructor(smartContractAddress, gatewayContract) {
//     this.address = smartContractAddress;
//     this.contract = gatewayContract;
//   }
// }

const initWeb3 = async address => {
  const { ethereum } = window;

  if (ethereum) {
    window.web3 = new window.Web3(ethereum);
    await ethereum.enable();
    // can add from and price fields in contract
    const gatewayContract = new window.web3.eth.Contract(
      contractAbi.abi,
      address
    );
    return gatewayContract;
  }
  alert("Install plugin!");
};

export const contractInvest = ({
  contract,
  assetIndex,
  selectedAccount,
  newAmount
}) => {
  return contract.methods
    .investRequest(assetIndex)
    .send({ from: selectedAccount, value: newAmount });
  // .then(res => console.log("Hash of the transaction: " + res))
  // .catch(err => console.log("An error occured", err))
};

export const investBSC = async ({ assetIndex, amount, contractAddress }) => {
  const contract = await initWeb3(contractAddress);
  const newAmount = window.web3.utils.toWei(amount, "ether");
  const accounts = await window.web3.eth.getAccounts();
  const selectedAccount = accounts[0];

  return { assetIndex, newAmount, selectedAccount, contract };
};

export const metamaskSign = async nonce => {
  await initWeb3(smartContractAddress);
  // const publicAddress = window.web3.eth.coinbase.toLowerCase();
  const accountAddresses = await window.web3.eth.getAccounts();

  const accountAddress = accountAddresses[0];

  const signature = await window.web3.eth.personal.sign(nonce, accountAddress);

  return { signature, accountAddress };
};
