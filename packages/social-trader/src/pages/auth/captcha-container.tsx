import { CaptchaType, PowDetails } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import AlertMessageList from "modules/alert-message/components/alert-message-list/alert-message-list";
import React, { useCallback, useEffect, useState } from "react";
import { SetSubmittingType } from "utils/types";

import * as authService from "./auth.service";
import Pow from "./captcha/pow";

const _CaptchaContainer: React.FC<Props> = ({ renderForm, request }) => {
  const [pow, setPow] = useState<PowDetails | undefined>(undefined);
  // const [geeTest, setGeeTest] = useState<GeeTestDetails | undefined>(undefined);
  const [captchaType, setCaptchaType] = useState<CaptchaType>("None");
  const [prefix, setPrefix] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [values, setValues] = useState<TValues | undefined>(undefined);
  const [setSubmitting, setSetSubmitting] = useState<{
    func?: SetSubmittingType;
  }>({});
  const [isSubmit, setIsSubmit, setIsNotSubmit] = useIsOpen();

  useEffect(() => {
    const captchaCheckResult = {
      id,
      pow: {
        prefix
      },
      geeTest: {}
    };
    const sendRequest = () =>
      request(
        {
          ...values,
          captchaCheckResult
        },
        setSubmitting.func!
      );
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
  }, [id, prefix, values, isSubmit, captchaType, setSubmitting]);
  const handleSubmit = useCallback(
    (values: TValues, setSubmittingProp?: SetSubmittingType) => {
      authService.getCaptcha(values.email).then(({ captchaType, id, pow }) => {
        setEmail(values.email);
        setCaptchaType(captchaType);
        // setGeeTest(geeTest);
        setId(id);
        setPow(pow);
        setValues(values);
        setSetSubmitting({ func: setSubmittingProp });
        setIsSubmit();
      });
    },
    []
  );
  return (
    <>
      <AlertMessageList />
      {renderForm(handleSubmit)}
      {pow && <Pow {...pow} login={email} handleSuccess={setPrefix} />}
    </>
  );
};

export type TValues = any;

interface OwnProps {
  request: (values: TValues, setSubmitting: SetSubmittingType) => void;
  renderForm: (
    handle: (values: TValues, setSubmitting?: SetSubmittingType) => void
  ) => JSX.Element;
}
export type ValuesType = any; // TODO declare type

interface Props extends OwnProps {}

const CaptchaContainer = React.memo(_CaptchaContainer);
export default CaptchaContainer;
