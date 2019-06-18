import {
  signalSuccessFeeShape,
  signalVolumeFeeShape
} from "pages/create-program/components/create-program-settings/create-program-settings.validators";
import { TranslationFunction } from "react-i18next";
import { object } from "yup";

export const SignalValidationSchema = ({
  t,
  signalSuccessFee = 50,
  signalVolumeFee = 0.1
}: SignalValidationSchemaProps) =>
  object().shape({
    successFee: signalSuccessFeeShape(t, signalSuccessFee),
    volumeFee: signalVolumeFeeShape(t, 0, signalVolumeFee)
  });

interface SignalValidationSchemaProps {
  t: TranslationFunction;
  signalSuccessFee: number;
  signalVolumeFee: number;
}
