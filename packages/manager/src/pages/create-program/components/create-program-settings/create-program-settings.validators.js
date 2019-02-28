import { boolean, lazy, mixed, number, object, string } from "yup";

const createProgramSettingsValidationSchema = ({ t, ...props }) =>
  lazy(values =>
    object().shape({
      stopOutLevel: number()
        .required(
          t("manager.create-program-page.settings.validation.stop-out-required")
        )
        .moreThan(
          0,
          t("manager.create-program-page.settings.validation.stop-out-is-zero")
        )
        .max(
          100,
          t("manager.create-program-page.settings.validation.stop-out-is-large")
        ),
      depositAmount: number()
        .required(
          t("manager.create-program-page.settings.validation.amount-required")
        )
        .moreThan(
          0,
          t("manager.create-program-page.settings.validation.amount-is-zero")
        )
        .max(
          props.wallets.find(
            item => item.currency === values.depositWalletCurrency
          ).available,
          t("manager.create-program-page.settings.validation.amount-is-large")
        ),
      logo: object().shape({
        width: number().min(
          300,
          t(
            "manager.create-program-page.settings.validation.image-resolution-incorrect"
          )
        ),
        height: number().min(
          300,
          t(
            "manager.create-program-page.settings.validation.image-resolution-incorrect"
          )
        ),
        size: number().max(
          2097152,
          t(
            "manager.create-program-page.settings.validation.image-file-is-large"
          )
        )
      }),
      title: string()
        .required(
          t("manager.create-program-page.settings.validation.title-required")
        )
        .min(
          4,
          t("manager.create-program-page.settings.validation.title-is-short")
        )
        .max(
          20,
          t("manager.create-program-page.settings.validation.title-is-long")
        )
        .matches(
          /^[-a-zA-Z0-9\s]{4,20}$/,
          t(
            "manager.create-program-page.settings.validation.title-is-latin-and-numbers"
          )
        ),
      description: string()
        .required(
          t(
            "manager.create-program-page.settings.validation.description-required"
          )
        )
        .min(
          20,
          t(
            "manager.create-program-page.settings.validation.description-is-short"
          )
        )
        .max(
          500,
          t(
            "manager.create-program-page.settings.validation.description-is-long"
          )
        ),
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
          t(
            "manager.create-program-page.settings.validation.entry-fee-required"
          )
        )
        .min(
          0.01,
          t("manager.create-program-page.settings.validation.entry-fee-min")
        )
        .lessThan(
          props.programsInfo.managerMaxEntryFee,
          "Entry fee must be less than  " +
            props.programsInfo.managerMaxEntryFee +
            " %"
        ),
      successFee: number()
        .min(
          0.01,
          t("manager.create-program-page.settings.validation.success-fee-min")
        )
        .required(
          t(
            "manager.create-program-page.settings.validation.success-fee-required"
          )
        )
        .lessThan(
          props.programsInfo.managerMaxSuccessFee,
          "Success fee must be less than  " +
            props.programsInfo.managerMaxSuccessFee +
            " %"
        ),
      isSignalProgram: boolean(),
      signalSubscriptionFee: mixed().when("isSignalProgram", {
        is: true,
        then: signalEntryFeeShape(t, props.programsInfo.managerMaxEntryFee)
      }),
      signalSuccessFee: mixed().when("isSignalProgram", {
        is: true,
        then: signalSuccessFeeShape(t, props.programsInfo.managerMaxSuccessFee)
      }),
      accountType: string().required(
        t(
          "manager.create-program-page.settings.validation.account-type-required"
        )
      )
    })
  );

export const signalSuccessFeeShape = (t, managerMaxSuccessFee) => {
  return number()
    .min(0.01, "Success fee must be greater than 0.01 % ")
    .required(
      t("manager.create-program-page.settings.validation.success-fee-required")
    )
    .lessThan(
      managerMaxSuccessFee,
      `Success fee must be less than ${managerMaxSuccessFee} %`
    );
};

export const signalEntryFeeShape = (t, managerMaxEntryFee) => {
  return number()
    .required(
      t(
        "manager.create-program-page.settings.validation.signal-subscription-fee-required"
      )
    )
    .min(
      0.01,
      t(
        "manager.create-program-page.settings.validation.signal-subscription-fee-min"
      )
    )
    .lessThan(
      managerMaxEntryFee,
      `Monthly subscription fee must be less than ${managerMaxEntryFee} GVT`
    );
};

export default createProgramSettingsValidationSchema;
