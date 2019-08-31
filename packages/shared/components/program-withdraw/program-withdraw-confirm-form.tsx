import { InjectedFormikProps, withFormik } from "formik";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import { formatCurrencyValue } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";

const _ProgramWithdrawConfirmForm: React.FC<InjectedFormikProps<Props, {}>> = ({
  programCurrency,
  amount,
  withdrawAll,
  periodEnds,
  isSubmitting,
  errorMessage,
  handleSubmit,
  onBackClick
}) => {
  const [t] = useTranslation();
  return (
    <form id="withdraw-submit-form" onSubmit={handleSubmit}>
      <ul className="dialog-list">
        <li className="dialog-list__item">
          {t("withdraw-program.withdrawing")}
          <span className="dialog-list__value">
            {amount && !withdrawAll
              ? `${formatCurrencyValue(
                  amount,
                  programCurrency
                )} ${programCurrency}`
              : t("withdraw-program.all")}
          </span>
        </li>
        <li className="dialog-list__item">
          {t("withdraw-program.payout-date")}
          <span className="dialog-list__value">
            {moment(periodEnds).format()}
          </span>
        </li>
      </ul>
      <div className="form-error">
        <FormError error={errorMessage} />
      </div>
      <div className="dialog__buttons">
        <GVButton
          onClick={onBackClick}
          color="secondary"
          variant="outlined"
          title={"back"}
        >
          {t("withdraw-program.back")}
        </GVButton>
        <GVButton
          title={"submit"}
          type={"submit"}
          id="programWithdrawFormSubmit"
          disabled={isSubmitting}
        >
          {t("withdraw-program.submit")}
        </GVButton>
      </div>
    </form>
  );
};

const ProgramWithdrawConfirmForm = compose<React.ComponentType<OwnProps>>(
  withFormik<Props, {}>({
    displayName: "withdraw-submit-form",
    handleSubmit: (_, { props, setSubmitting }) => {
      props.onSubmit(setSubmitting);
    }
  }),
  React.memo
)(_ProgramWithdrawConfirmForm);

export default ProgramWithdrawConfirmForm;

interface OwnProps {
  errorMessage?: string;
  onSubmit(setSubmitting: SetSubmittingType): void;
  onBackClick(): void;
  amount?: number;
  periodEnds: Date;
  programCurrency: string;
  withdrawAll?: boolean;
}

interface Props extends OwnProps {}
