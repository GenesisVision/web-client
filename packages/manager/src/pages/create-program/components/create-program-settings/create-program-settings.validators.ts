import { TranslationFunction } from "react-i18next";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { boolean, mixed, number, object, string } from "yup";

import {
  CREATE_PROGRAM_FIELDS,
  ICreateProgramSettingsProps
} from "./create-program-settings";

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
    [CREATE_PROGRAM_FIELDS.stopOutLevel]: number()
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

    [CREATE_PROGRAM_FIELDS.logo]: inputImageShape(t),
    [CREATE_PROGRAM_FIELDS.title]: assetTitleShape(t),
    [CREATE_PROGRAM_FIELDS.description]: assetDescriptionShape(t),
    [CREATE_PROGRAM_FIELDS.currency]: string().required(
      t("manager.create-program-page.settings.validation.currency-required")
    ),
    [CREATE_PROGRAM_FIELDS.periodLength]: string().required(
      t("manager.create-program-page.settings.validation.period-required")
    ),
    [CREATE_PROGRAM_FIELDS.leverage]: string().required(
      t("manager.create-program-page.settings.validation.leverage-required")
    ),
    [CREATE_PROGRAM_FIELDS.entryFee]: number()
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
    [CREATE_PROGRAM_FIELDS.successFee]: number()
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
    [CREATE_PROGRAM_FIELDS.hasInvestmentLimit]: boolean(),
    [CREATE_PROGRAM_FIELDS.investmentLimit]: mixed().when(
      CREATE_PROGRAM_FIELDS.hasInvestmentLimit,
      {
        is: true,
        then: number()
          .min(
            0,
            t(
              "manager.create-program-page.settings.validation.investment-limit-min"
            )
          )
          .lessThan(
            10000000000,
            "Investment Limit must be less than 10000000000"
          )
          .required(
            t(
              "manager.create-program-page.settings.validation.investment-limit-required"
            )
          )
      }
    ),
    [CREATE_PROGRAM_FIELDS.isSignalProgram]: boolean(),
    [CREATE_PROGRAM_FIELDS.signalVolumeFee]: mixed().when(
      CREATE_PROGRAM_FIELDS.isSignalProgram,
      {
        is: true,
        then: signalVolumeFeeShape(t)
      }
    ),
    [CREATE_PROGRAM_FIELDS.signalSuccessFee]: mixed().when(
      CREATE_PROGRAM_FIELDS.isSignalProgram,
      {
        is: true,
        then: signalSuccessFeeShape(t, props.programsInfo.managerMaxSuccessFee)
      }
    ),
    [CREATE_PROGRAM_FIELDS.brokerAccountTypeId]: string().required(
      t("manager.create-program-page.settings.validation.account-type-required")
    ),
    [CREATE_PROGRAM_FIELDS.depositAmount]:
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
      0,
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
