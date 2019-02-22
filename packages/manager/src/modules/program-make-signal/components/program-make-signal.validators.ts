import { InjectedTranslateProps } from "react-i18next";
import { object } from "yup";

import {
  signalEntryFeeShape,
  signalSuccessFeeShape
} from "../../../pages/create-program/components/create-program-settings/create-program-settings.validators";

export const makeSignalValidationSchema = ({ t }: InjectedTranslateProps) =>
  object().shape({
    successFee: signalSuccessFeeShape(t, 50),
    subscriptionFee: signalEntryFeeShape(t, 100)
  });
