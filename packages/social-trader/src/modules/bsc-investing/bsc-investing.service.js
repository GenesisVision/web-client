// import Web3 from "web3";
import { contractAbi } from "./abi";

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

export const investBSC = async ({ assetIndex, amount }) => {
  const contract = await initWeb3("0x09ebbeae614d7c618bcd49dc62e73010bef12c7c");
  const newAmount = window.web3.utils.toWei(amount, "ether");
  window.web3.eth
    .getAccounts()
    .then(res => {
      console.log(res, "getAccountsResponse");
      return res[0];
    })
    .then(account => {
      contract.methods
        .investRequest(assetIndex)
        // send method can be initialized in initWeb3 function
        .send({ from: account, value: newAmount })
        .then(res => console.log("Hash of the transaction: " + res))
        .catch(err => console.log("An error occured", err));
    });
};

export const metamaskSign = async nonce => {
  await initWeb3("0x09ebbeae614d7c618bcd49dc62e73010bef12c7c");
  // const publicAddress = window.web3.eth.coinbase.toLowerCase();
  const accountAddresses = await window.web3.eth.getAccounts();

  const accountAddress = accountAddresses[0];

  const signature = await window.web3.eth.personal.sign(nonce, accountAddress);

  return { signature, accountAddress };
};

// var gatewayContract = new web3.eth.Contract(contractAbi.abi, '0x09ebbeae614d7c618bcd49dc62e73010bef12c7c');

// function getAccounts(callback) {
//   web3.eth.getAccounts((error,result) => {
//       if (error) {
//           console.log(error);
//       } else {
//           callback(result);
//       }
//   });
// }

// function invest(){
//   debugger;
//   // asset -- id program or id fund
//   // sumstr = number
//   var asset = $("#assetInvest").val();
//   var sumStr = $("#sumInvest").val();
//
//   var sum = web3.utils.toWei(sumStr, 'ether');
//   console.log("Invest " + sum + " to " + asset);

//   getAccounts(function(result) {
//       var account = result[0];
//       console.log("metamask account - " + account);
//       gatewayContract.methods.investRequest(asset)
//           .send({from: account, value: sum}, function(err, res) {
//               if (err) {
//                   console.log("An error occured", err);
//                   return;
//               }
//               console.log("Hash of the transaction: " + res)
//           })
//   });
