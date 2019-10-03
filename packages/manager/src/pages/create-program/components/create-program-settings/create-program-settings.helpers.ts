import { BrokerAccountType } from "gv-api-web";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";
import {
  assetDescriptionShape,
  assetTitleShape,
  entryFeeShape,
  signalSuccessFeeShape,
  signalVolumeFeeShape,
  successFeeShape
} from "shared/utils/validators/validators";
import { boolean, lazy, mixed, number, object, string } from "yup";

import { BROKER_CARD_EXTRA_STATE } from "../create-program-broker/broker-card/broker-card.constants";
import {
  ICreateProgramSettingsFormValues,
  ICreateProgramSettingsProps
} from "./create-program-settings";

export const getCurrency = (accountType: BrokerAccountType): CurrencyEnum =>
  accountType.currencies[0] as CurrencyEnum; // TODO say to backend change type to CurrencyEnum[]

export const getLeverage = (accountType: BrokerAccountType): number =>
  accountType.leverages[0];

export const getBrokerId = (accountTypes: BrokerAccountType[]): string =>
  accountTypes[0].id;

export const getLeverageDescription = (
  leverageMin: number,
  leverageMax: number
): string => {
  let result;

  if (leverageMin === leverageMax) {
    result = "1:" + leverageMin;
  } else {
    result = `1:${leverageMin} - 1:${leverageMax}`;
  }

  return result;
};

export const getAccountTypes = (accountTypes: BrokerAccountType[]) => {
  if (!accountTypes[0].currencies) return null;
  return accountTypes[0].currencies.join(", ");
};

export const getBrokerState = (
  isForex: boolean,
  isForexAllowed: boolean,
  isKycConfirmed: boolean
): BROKER_CARD_EXTRA_STATE => {
  if (isForex && !isKycConfirmed) {
    return BROKER_CARD_EXTRA_STATE.KYC_REQUIRED;
  }
  if (isForex && !isForexAllowed) {
    return BROKER_CARD_EXTRA_STATE.FOREX_DISABLED;
  }
  return BROKER_CARD_EXTRA_STATE.NONE;
};

export const createProgramMapPropsToValues = ({
  broker,
  programsInfo
}: ICreateProgramSettingsProps): ICreateProgramSettingsFormValues => ({
  [CREATE_PROGRAM_FIELDS.available]: 0,
  [CREATE_PROGRAM_FIELDS.rate]: 1,
  [CREATE_PROGRAM_FIELDS.tradesDelay]: "None",
  [CREATE_PROGRAM_FIELDS.stopOutLevel]: 100,
  [CREATE_PROGRAM_FIELDS.brokerAccountTypeId]: getBrokerId(broker.accountTypes),
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
  [CREATE_PROGRAM_FIELDS.currency]: getCurrency(broker.accountTypes[0]),
  [CREATE_PROGRAM_FIELDS.leverage]: getLeverage(broker.accountTypes[0]),
  [CREATE_PROGRAM_FIELDS.periodLength]:
    programsInfo.periods.length === 1 ? programsInfo.periods[0] : undefined,
  [CREATE_PROGRAM_FIELDS.depositWalletId]: "",
  [CREATE_PROGRAM_FIELDS.depositAmount]: undefined
});

const createProgramSettingsValidationSchema = ({
  t,
  minimumDepositsAmount,
  programsInfo
}: ICreateProgramSettingsProps) => {
  return lazy<ICreateProgramSettingsFormValues>(values => {
    const minDeposit = parseFloat(
      formatCurrencyValue(
        convertToCurrency(
          minimumDepositsAmount[values[CREATE_PROGRAM_FIELDS.currency]],
          values[CREATE_PROGRAM_FIELDS.rate] || 1
        ),
        values[CREATE_PROGRAM_FIELDS.currency]
      )
    );
    return object<ICreateProgramSettingsFormValues>().shape({
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
      [CREATE_PROGRAM_FIELDS.periodLength]: number().required(
        t("manager.create-program-page.settings.validation.period-required")
      ),
      [CREATE_PROGRAM_FIELDS.leverage]: number().required(
        t("manager.create-program-page.settings.validation.leverage-required")
      ),
      [CREATE_PROGRAM_FIELDS.entryFee]: entryFeeShape(
        t,
        programsInfo.managerMaxEntryFee
      ),
      [CREATE_PROGRAM_FIELDS.successFee]: successFeeShape(
        t,
        programsInfo.managerMaxSuccessFee
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
          then: signalSuccessFeeShape(t, programsInfo.managerMaxSuccessFee)
        }
      ),
      [CREATE_PROGRAM_FIELDS.brokerAccountTypeId]: string().required(
        t(
          "manager.create-program-page.settings.validation.account-type-required"
        )
      ),
      [CREATE_PROGRAM_FIELDS.depositAmount]: values[
        CREATE_PROGRAM_FIELDS.currency
      ]
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
              values[CREATE_PROGRAM_FIELDS.available],
              t(
                "manager.create-program-page.settings.validation.amount-is-large"
              )
            )
        : number().required(
            t("manager.create-program-page.settings.validation.amount-required")
          )
    });
  });
};

export enum CREATE_PROGRAM_FIELDS {
  available = "available",
  rate = "rate",
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
