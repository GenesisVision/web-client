import { CaptchaDetails, PowDetails } from "gv-api-web";
import { NextPageContext } from "next";
import platformApi from "services/api-client/platform-api";
import { getCookie, setCookie } from "utils/cookie";

//@ts-ignore
import SHAWorker from "./sha.worker";
import { client } from "./signin/signin.service";

export const calculatePrefix: CalculatePrefixFuncType = props => {
  const worker = new SHAWorker(); // TODO check
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
  return platformApi.getRiskControlInfo(login, { client });
};

export const checkPow: CheckPowFuncType = async props => {
  const { difficulty, setTotal } = props;
  if (difficulty > 0) {
    const total =
      Math.log(0.1) / Math.log((16 ** difficulty - 1) / 16 ** difficulty);
    setTotal(total);
    return await calculatePrefix({
      ...props,
      total
    });
  }
  return 0;
};

export const EMAIL_PENDING_KEY = "EMAIL_PENDING_KEY";

export const initialEmailPendingState: EmailPendingStateType = {
  email: ""
};

export const clearEmailPendingState = () => {
  setCookie(EMAIL_PENDING_KEY, "");
};

export const storeEmailPendingState = (state: EmailPendingStateType) => {
  const JSONState = JSON.stringify(state);
  setCookie(EMAIL_PENDING_KEY, JSONState);
};

export const getEmailPendingState = (
  ctx?: NextPageContext
): EmailPendingStateType => {
  const JSONState = getCookie(EMAIL_PENDING_KEY, ctx);
  return JSONState ? JSON.parse(JSONState) : initialEmailPendingState;
};

export type EmailPendingStateType = {
  email: string;
};

type GetCaptchaFuncType = (login: string) => Promise<CaptchaDetails>;
type CalculatePrefixFuncType = (props: {
  difficulty: number;
  nonce: string;
  login: string;
  setCount: (val: number) => void;
  total: number;
}) => Promise<number>;
type CheckPowFuncType = (
  props: PowDetails & {
    setTotal: SetFuncType;
    setCount: SetFuncType;
    login: string;
  }
) => Promise<number>;
export type SetFuncType = (val: number) => void;
