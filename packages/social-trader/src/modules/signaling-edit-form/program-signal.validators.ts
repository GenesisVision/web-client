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
    successFee: signalSuccessFeeShape(t, minSuccessFee, maxSuccessFee),
    volumeFee: signalVolumeFeeShape(t, minVolumeFee, maxVolumeFee)
  });

interface SignalValidationSchemaProps {
  followInfo: FollowCreateAssetPlatformInfo;
  t: i18next.TFunction;
}
