import { TranslationFunction } from "react-i18next";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { boolean, mixed, number, object, string } from "yup";

import { ICreateProgramSettingsProps } from "./create-program-settings";

const createProgramSettingsValidationSchema = (
  props: ICreateProgramSettingsProps
) => {
  const { t } = props;
  const minDeposit = parseFloat(
    formatCurrencyValue(
      convertToCurrency(
        props.minimumDepositsAmount[props.programCurrency!],
        props.rate || 1
      ),
      props.programCurrency!
    )
  );
  return object().shape({
    stopOutLevel: number()
      .required(
        t("manager.create-program-page.settings.validation.stop-out-required")
      )
      .min(
        10,
        t("manager.create-program-page.settings.validation.stop-out-is-zero")
      )
      .max(
        100,
        t("manager.create-program-page.settings.validation.stop-out-is-large")
      ),

    logo: inputImageShape(t),
    title: assetTitleShape(t),
    description: assetDescriptionShape(t),
    currency: string().required(
      t("manager.create-program-page.settings.validation.currency-required")
    ),
    periodLength: string().required(
      t("manager.create-program-page.settings.validation.period-required")
    ),
    leverage: string().required(
      t("manager.create-program-page.settings.validation.leverage-required")
    ),
    entryFee: number()
      .required(
        t("manager.create-program-page.settings.validation.entry-fee-required")
      )
      .min(
        0,
        t("manager.create-program-page.settings.validation.entry-fee-min")
      )
      .max(
        props.programsInfo.managerMaxEntryFee,
        t("manager.create-program-page.settings.validation.entry-fee-max", {
          max: props.programsInfo.managerMaxEntryFee
        })
      ),
    successFee: number()
      .min(
        0,
        t("manager.create-program-page.settings.validation.success-fee-min")
      )
      .required(
        t(
          "manager.create-program-page.settings.validation.success-fee-required"
        )
      )
      .max(
        props.programsInfo.managerMaxSuccessFee,
        t("manager.create-program-page.settings.validation.success-fee-max", {
          max: props.programsInfo.managerMaxSuccessFee
        })
      ),
    isSignalProgram: boolean(),
    signalVolumeFee: mixed().when("isSignalProgram", {
      is: true,
      then: signalVolumeFeeShape(t)
    }),
    signalSuccessFee: mixed().when("isSignalProgram", {
      is: true,
      then: signalSuccessFeeShape(t, props.programsInfo.managerMaxSuccessFee)
    }),
    brokerAccountTypeId: string().required(
      t("manager.create-program-page.settings.validation.account-type-required")
    ),
    depositAmount:
      props.rate && props.programCurrency && props.rate
        ? number()
            .required(
              t(
                "manager.create-program-page.settings.validation.amount-required"
              )
            )
            .min(
              minDeposit,
              t(
                "manager.create-program-page.settings.validation.amount-is-zero",
                {
                  min: minDeposit
                }
              )
            )
            .max(
              props.wallet.available,
              t(
                "manager.create-program-page.settings.validation.amount-is-large"
              )
            )
        : number().required(
            t("manager.create-program-page.settings.validation.amount-required")
          )
  });
};

export const assetTitleShape = (t: TranslationFunction) => {
  return string()
    .trim()
    .required(
      t("manager.create-program-page.settings.validation.title-required")
    )
    .min(4, t("manager.create-program-page.settings.validation.title-is-short"))
    .max(20, t("manager.create-program-page.settings.validation.title-is-long"))
    .matches(
      /^[-a-zA-Z0-9\s]{4,20}$/,
      t(
        "manager.create-program-page.settings.validation.title-is-latin-and-numbers"
      )
    );
};

export const assetDescriptionShape = (t: TranslationFunction) => {
  return string()
    .trim()
    .required(
      t("manager.create-program-page.settings.validation.description-required")
    )
    .min(
      20,
      t("manager.create-program-page.settings.validation.description-is-short")
    )
    .max(
      500,
      t("manager.create-program-page.settings.validation.description-is-long")
    );
};

export const signalSuccessFeeShape = (
  t: TranslationFunction,
  managerMaxSuccessFee: number
) => {
  return number()
    .min(
      0.01,
      t("manager.create-program-page.settings.validation.success-fee-min")
    )
    .required(
      t("manager.create-program-page.settings.validation.success-fee-required")
    )
    .max(
      managerMaxSuccessFee,
      t("manager.create-program-page.settings.validation.success-fee-max", {
        max: managerMaxSuccessFee
      })
    );
};

export const signalVolumeFeeShape = (
  t: TranslationFunction,
  minVolumeFee: number = 0,
  maxVolumeFee: number = 0.1
) => {
  return number()
    .required(
      t(
        "manager.create-program-page.settings.validation.signal-volume-fee-required"
      )
    )
    .min(
      minVolumeFee,
      t(
        "manager.create-program-page.settings.validation.signal-volume-fee-min",
        { min: minVolumeFee.toFixed(2) }
      )
    )
    .max(
      maxVolumeFee,
      t(
        "manager.create-program-page.settings.validation.signal-volume-fee-max",
        { max: maxVolumeFee.toFixed(2) }
      )
    );
};

export default createProgramSettingsValidationSchema;
