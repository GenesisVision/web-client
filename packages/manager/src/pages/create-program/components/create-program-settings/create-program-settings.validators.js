import { number, object, string, boolean, lazy } from "yup";

const createProgramSettingsValidationSchema = ({ t, ...props }) =>
  lazy(values =>
    object().shape({
      depositAmount: number()
        .required()
        .moreThan(0)
        .max(
          props.wallets.find(
            item => item.currency === values.depositWalletCurrency
          ).available,
          "Must be less than available in wallet"
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
      entryFeeInvest: number()
        .required(
          t(
            "manager.create-program-page.settings.validation.entry-fee-required"
          )
        )
        .min(0.01, "Entry fee must be greater than 0.01 % ")
        .max(
          props.programsInfo.managerMaxEntryFee,
          "Entry fee must be less than  " +
            props.programsInfo.managerMaxEntryFee +
            " %"
        ),
      successFeeInvest: number()
        .min(0.01, "Success fee must be greater than 0.01 % ")
        .required(
          t(
            "manager.create-program-page.settings.validation.success-fee-required"
          )
        )
        .max(
          props.programsInfo.managerMaxSuccessFee,
          "Success fee must be less than  " +
            props.programsInfo.managerMaxSuccessFee +
            " %"
        ),
      provideSignals: boolean(),
      entryFeeSignal: number().when("provideSignals", {
        is: true,
        then: number()
          .required(
            t(
              "manager.create-program-page.settings.validation.entry-fee-required"
            )
          )
          .min(0.01, "Monthly subscription fee must be greater than 0.01 % ")
          .max(
            props.programsInfo.managerMaxEntryFee,
            " Monthly subscription fee must be less than  " +
              props.programsInfo.managerMaxEntryFee
          ),
        otherwise: number()
      }),
      successFeeSignal: number().when("provideSignals", {
        is: true,
        then: number()
          .min(0.01, "Success fee must be greater than 0.01 % ")
          .required(
            t(
              "manager.create-program-page.settings.validation.success-fee-required"
            )
          )
          .max(
            props.programsInfo.managerMaxSuccessFee,
            "Success fee must be less than  " +
              props.programsInfo.managerMaxSuccessFee +
              " %"
          ),
        otherwise: number()
      }),
      accountType: string().required(
        t(
          "manager.create-program-page.settings.validation.account-type-required"
        )
      )
    })
  );

export default createProgramSettingsValidationSchema;
