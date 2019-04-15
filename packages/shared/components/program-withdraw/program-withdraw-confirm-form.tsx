import { InjectedFormikProps, withFormik } from "formik";
import { GVButton } from "gv-react-components";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import { formatCurrencyValue } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";

class _ProgramWithdrawConfirmForm extends React.PureComponent<
  InjectedFormikProps<Props, {}>
> {
  render() {
    const {
      t,
      programCurrency,
      amount,
      periodEnds,
      isSubmitting,
      errorMessage,
      handleSubmit,
      onBackClick
    } = this.props;
    return (
      <form id="withdraw-submit-form" onSubmit={handleSubmit}>
        <ul className="dialog-list">
          <li className="dialog-list__item">
            {t("withdraw-program.withdrawing")}
            <span className="dialog-list__value">
              {formatCurrencyValue(amount, programCurrency)} {programCurrency}
            </span>
          </li>
          <li className="dialog-list__item">
            {t("withdraw-program.payout-date")}
            <span className="dialog-list__value">
              {moment(periodEnds).format("lll")}
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
  }
}

const ProgramWithdrawConfirmForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, {}>({
    displayName: "withdraw-submit-form",
    handleSubmit: (_, { props, setSubmitting }) => {
      props.onSubmit(setSubmitting);
    }
  })
)(_ProgramWithdrawConfirmForm);

export default ProgramWithdrawConfirmForm;

interface OwnProps {
  errorMessage?: string;
  onSubmit(setSubmitting: SetSubmittingType): void;
  onBackClick(): void;
  amount: number;
  periodEnds: Date;
  programCurrency: string;
}

interface Props extends InjectedTranslateProps, OwnProps {}
