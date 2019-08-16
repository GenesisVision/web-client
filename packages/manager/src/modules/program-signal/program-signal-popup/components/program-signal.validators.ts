import i18next from "i18next";
import {
  signalSuccessFeeShape,
  signalVolumeFeeShape
} from "modules/asset-settings/asset-edit.validation";
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
  t: i18next.TFunction;
  signalSuccessFee: number;
  signalVolumeFee: number;
}
