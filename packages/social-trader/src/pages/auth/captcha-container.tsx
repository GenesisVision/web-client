import { CaptchaType, PowDetails } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import React, { useCallback, useEffect, useState } from "react";

import * as authService from "./auth.service";
import Pow from "./captcha/pow";

export enum CAPTCHA_STATUS {
  WAIT = "WAIT",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS"
}

const _CaptchaContainer: React.FC<Props> = ({
  renderForm,
  request,
  disable
}) => {
  const [status, setStatus] = useState<CAPTCHA_STATUS>(CAPTCHA_STATUS.WAIT);
  const [pow, setPow] = useState<PowDetails | undefined>(undefined);
  // const [geeTest, setGeeTest] = useState<GeeTestDetails | undefined>(undefined);
  const [captchaType, setCaptchaType] = useState<CaptchaType>("None");
  const [prefix, setPrefix] = useState<number | undefined>(undefined);
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [values, setValues] = useState<TValues | undefined>(undefined);
  const [isSubmit, setIsSubmit, setIsNotSubmit] = useIsOpen();

  useEffect(() => {
    if (disable) setStatus(CAPTCHA_STATUS.PENDING);
  }, [disable, status]);

  useEffect(() => {
    const captchaCheckResult = {
      id,
      pow: {
        prefix
      },
      geeTest: {}
    };
    const sendRequest = () =>
      request({
        ...values,
        captchaCheckResult
      }).then(res => {
        if (res) setStatus(CAPTCHA_STATUS.SUCCESS);
        else setStatus(CAPTCHA_STATUS.WAIT);
        return res;
      });
    if (isSubmit) {
      switch (captchaType) {
        case "Pow":
          if (prefix) {
            sendRequest();
            setPow(undefined);
            setPrefix(undefined);
            setIsNotSubmit();
          }
          break;
        default:
          sendRequest();
          setIsNotSubmit();
          break;
      }
    }
  }, [id, prefix, values, isSubmit, captchaType]);
  const handleSubmit = useCallback((values: TValues) => {
    setStatus(CAPTCHA_STATUS.PENDING);
    authService.getCaptcha(values.email).then(({ captchaType, id, pow }) => {
      setEmail(values.email);
      setCaptchaType(captchaType);
      // setGeeTest(geeTest);
      setId(id);
      setPow(pow);
      setValues(values);
      setIsSubmit();
    });
  }, []);
  return (
    <CaptchaStatusContext.Provider value={status}>
      <AlertMessageList />
      {renderForm(handleSubmit)}
      {pow && <Pow {...pow} login={email} handleSuccess={setPrefix} />}
    </CaptchaStatusContext.Provider>
  );
};

export const CaptchaStatusContext = React.createContext<CAPTCHA_STATUS>(
  CAPTCHA_STATUS.WAIT
);

export type TValues = any;

interface OwnProps {
  disable?: boolean;
  request: (values: TValues) => Promise<any>;
  renderForm: (handle: (values: TValues) => void) => JSX.Element;
}
export type ValuesType = any; // TODO declare type

interface Props extends OwnProps {}

const CaptchaContainer = React.memo(_CaptchaContainer);
export default CaptchaContainer;
