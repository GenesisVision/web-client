import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { parseEther } from "@ethersproject/units";
import * as contractJson from "modules/web3/GenesisVisionGateway.json";
import { CurrencyEnum } from "utils/types";

const smartContractAddressBsc = "0x2c0c588dc1bcbecf4fb00191ad636eefde961714";
const smartContractAddressDai = "0x3b914f1EEb3b468839632De7fa5313632bb0fab1";

export const metamaskInvest = async ({
  assetIndex,
  amount,
  currency,
  account,
  provider
}: {
  assetIndex: number;
  account: string;
  amount: string;
  currency: CurrencyEnum;
  provider: Web3Provider;
}) => {
  try {
    const contractAddress =
      currency === "BNB" ? smartContractAddressBsc : smartContractAddressDai;
    const signer = provider.getSigner(account);
    const formattedAmount = parseEther(amount).toString();
    const contract = new Contract(contractAddress, contractJson.abi, signer);
    const tx = await contract.investRequest(assetIndex, {
      value: formattedAmount
    });
    console.log(tx);
  } catch (e) {
    console.log(e);
    if (e.data) {
      await Promise.reject({ errorMessage: e.data.message, code: e.data.code });
    }
    await Promise.reject({ errorMessage: e.message, code: e.code });
  }
};
