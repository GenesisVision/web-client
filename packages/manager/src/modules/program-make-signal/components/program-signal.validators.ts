import {
  signalSuccessFeeShape,
  signalVolumeFeeShape
} from "pages/create-program/components/create-program-settings/create-program-settings.validators";
import { InjectedTranslateProps } from "react-i18next";
import { object } from "yup";

export const SignalValidationSchema = ({ t }: InjectedTranslateProps) =>
  object().shape({
    successFee: signalSuccessFeeShape(t, 50),
    volumeFee: signalVolumeFeeShape(t)
  });
