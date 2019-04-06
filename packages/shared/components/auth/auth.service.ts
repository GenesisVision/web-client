//@ts-ignore
import SHAWorker from "./sha.worker.js";
import platformApi from "shared/services/api-client/platform-api";
import { CLIENT_WEB } from "./login/login.service";
import {
  CancelablePromise,
  GeeTestDetails,
  LoginCheckDetails,
  PowDetails
} from "gv-api-web";
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

export const getCaptcha: GetCaptchaFuncType = login => {
  return platformApi.v10PlatformRiskcontrolGet(login, { device: CLIENT_WEB });
};

export const checkPow: CheckPowFuncType = async props => {
  const { difficulty, setTotal, email } = props;
  const total =
    Math.log(0.1) / Math.log((16 ** difficulty - 1) / 16 ** difficulty);
  if (difficulty > 0) {
    setTotal(total);
    return await calculatePrefix({
      ...props,
      login: email,
      total
    });
  }
  return 0;
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
type CheckPowFuncType = (
  props: PowDetails & {
    setTotal: SetFuncType;
    setCount: SetFuncType;
    email: string;
    id: string;
  }
) => Promise<number>;
export type SetFuncType = (val: number) => void;
export type CounterType = { count?: number; total?: number };
export type CaptchasType = { pow?: PowDetails; geeTest?: GeeTestDetails };

export interface AuthService {
  getCapthca: GetCaptchaFuncType;
  calculatePrefix: CalculatePrefixFuncType;
  runCalculatingPow: CheckPowFuncType;
}
