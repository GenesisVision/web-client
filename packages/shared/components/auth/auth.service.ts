//@ts-ignore
import SHAWorker from "./sha.worker.js";
import platformApi from "shared/services/api-client/platform-api";
import { CLIENT_WEB } from "./login/login.service";
import { CancelablePromise, LoginCheckDetails } from "gv-api-web";
const worker = new SHAWorker();

export const calculatePrefix: CalculatePrefixFuncType = props => {
  worker.postMessage([props.difficulty, props.nonce, props.login]);
  const { setCount } = props;
  return new Promise(resolve => {
    worker.onmessage = ({ data }: any) => {
      if (data.found) {
        resolve(data.prefix);
        setCount(props.total);
      } else {
        setCount(data.prefix);
      }
    };
  });
};

export const getCapthca: GetCaptchaFuncType = login => {
  return platformApi.v10PlatformRiskcontrolGet(login, { device: CLIENT_WEB });
};

type GetCaptchaFuncType = (
  login: string
) => CancelablePromise<LoginCheckDetails>;
type CalculatePrefixFuncType = (
  props: {
    difficulty: number;
    nonce: string;
    login: string;
    setCount: (val: number) => void;
    total: number;
  }
) => Promise<number>;

export interface AuthService {
  getCapthca: GetCaptchaFuncType;
  calculatePrefix: CalculatePrefixFuncType;
}
