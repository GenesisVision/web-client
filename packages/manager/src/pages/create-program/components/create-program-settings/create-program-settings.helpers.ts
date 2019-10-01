import { useTranslation } from "react-i18next";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import {
  assetDescriptionShape,
  assetTitleShape,
  entryFeeShape,
  signalSuccessFeeShape,
  signalVolumeFeeShape,
  successFeeShape
} from "shared/utils/validators/validators";
import { boolean, mixed, number, object, string } from "yup";

import { ICreateProgramSettingsFormValues, ICreateProgramSettingsOwnProps } from "./create-program-settings";

export const createProgramMapPropsToValues = ({
  wallet,
  broker,
  programCurrency,
  leverage,
  programsInfo,
  accountType
}: ICreateProgramSettingsOwnProps): ICreateProgramSettingsFormValues => ({
  [CREATE_PROGRAM_FIELDS.tradesDelay]: "None",
  [CREATE_PROGRAM_FIELDS.stopOutLevel]: 100,
  [CREATE_PROGRAM_FIELDS.brokerAccountTypeId]: accountType
    ? accountType.id
    : "",
  [CREATE_PROGRAM_FIELDS.title]: "",
  [CREATE_PROGRAM_FIELDS.description]: "",
  [CREATE_PROGRAM_FIELDS.logo]: {},
  [CREATE_PROGRAM_FIELDS.entryFee]: undefined,
  [CREATE_PROGRAM_FIELDS.successFee]: undefined,
  [CREATE_PROGRAM_FIELDS.hasInvestmentLimit]: false,
  [CREATE_PROGRAM_FIELDS.investmentLimit]: undefined,
  [CREATE_PROGRAM_FIELDS.isSignalProgram]: broker.isSignalsAvailable,
  [CREATE_PROGRAM_FIELDS.signalSuccessFee]: broker.isSignalsAvailable
    ? undefined
    : 0,
  [CREATE_PROGRAM_FIELDS.signalVolumeFee]: broker.isSignalsAvailable
    ? undefined
    : 0,
  [CREATE_PROGRAM_FIELDS.currency]: programCurrency,
  [CREATE_PROGRAM_FIELDS.leverage]: leverage,
  [CREATE_PROGRAM_FIELDS.periodLength]:
    programsInfo.periods.length === 1 ? programsInfo.periods[0] : undefined,
  [CREATE_PROGRAM_FIELDS.depositWalletId]: wallet.id,
  [CREATE_PROGRAM_FIELDS.depositAmount]: undefined
});

const createProgramSettingsValidationSchema = (
  props: ICreateProgramSettingsOwnProps
) => {
  const [t] = useTranslation();
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
    [CREATE_PROGRAM_FIELDS.entryFee]: entryFeeShape(
      t,
      props.programsInfo.managerMaxEntryFee
    ),
    [CREATE_PROGRAM_FIELDS.successFee]: successFeeShape(
      t,
      props.programsInfo.managerMaxSuccessFee
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

export enum CREATE_PROGRAM_FIELDS {
  tradesDelay = "tradesDelay",
  currency = "currency",
  periodLength = "periodLength",
  successFee = "successFee",
  stopOutLevel = "stopOutLevel",
  leverage = "leverage",
  brokerAccountTypeId = "brokerAccountTypeId",
  signalSuccessFee = "signalSuccessFee",
  signalVolumeFee = "signalVolumeFee",
  isSignalProgram = "isSignalProgram",
  hasInvestmentLimit = "hasInvestmentLimit",
  title = "title",
  description = "description",
  logo = "logo",
  entryFee = "entryFee",
  depositAmount = "depositAmount",
  depositWalletId = "depositWalletId",
  investmentLimit = "investmentLimit"
}

export default createProgramSettingsValidationSchema;
