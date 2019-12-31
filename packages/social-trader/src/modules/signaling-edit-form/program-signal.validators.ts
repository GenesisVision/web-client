import { FollowCreateAssetPlatformInfo } from "gv-api-web";
import i18next from "i18next";
import {
  signalSuccessFeeShape,
  signalVolumeFeeShape
} from "utils/validators/validators";
import { object } from "yup";

export const SignalValidationSchema = ({
  followInfo: { maxSuccessFee, maxVolumeFee, minSuccessFee, minVolumeFee },
  t
}: SignalValidationSchemaProps) =>
  object().shape({
    successFee: signalSuccessFeeShape(t, minVolumeFee, maxVolumeFee),
    volumeFee: signalVolumeFeeShape(t, minSuccessFee, maxSuccessFee)
  });

interface SignalValidationSchemaProps {
  followInfo: FollowCreateAssetPlatformInfo;
  t: i18next.TFunction;
}
