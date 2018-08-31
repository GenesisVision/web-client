import "./program-withdraw.css";

import Metric from "components/metric/metric";
import { Field, withFormik } from "formik";
import React from "react";
import { translate } from "react-i18next";
import FormError from "shared/components/form/form-error/form-error";
import InputText from "shared/components/form/input-text/input-text";
import { number as yupNumber, object as yupObject } from "yup";

import ProgramAvatar from "../../../../../components/program-avatar/program-avatar";
import TimeLeftWidget from "../../../../../components/time-left-widget/time-left-widget";
import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";

const TraderWithdraw = ({
  t,
  values,
  programWithdraw,
  handleSubmit,
  closePopup,
  error,
  isSubmitting,
  setFieldValue
}) => {
  const handleWithdrawAll = () => {
    setFieldValue("amount", programWithdraw.investedTokens);
  };
  return (
    <div className="popup">
      <PopupHeader header={t("program-withdraw.header")} onClose={closePopup} />
      <form id="programWithdrawForm" onSubmit={handleSubmit}>
        <div className="program-withdraw__info">
          <div className="program-withdraw__info-cell">
            <div className="program-withdraw__trader">
              <div className="program-withdraw__avatar">
                <ProgramAvatar
                  url={programWithdraw.logo}
                  level={programWithdraw.level}
                />
              </div>
              <div className="program-withdraw__name">
                {programWithdraw.title}
              </div>
            </div>
          </div>
          <div className="program-withdraw__info-cell">
            <div className="program-withdraw__time-left">
              <TimeLeftWidget
                start={programWithdraw.startOfPeriod}
                end={programWithdraw.endOfPeriod}
              />
            </div>
          </div>
          <div className="program-withdraw__info-cell">
            <Metric
              value={programWithdraw.investedTokens}
              description={`${t("program-withdraw.invested")} ${
                programWithdraw.token.tokenSymbol
              }`}
            />
          </div>
        </div>
        <div className="program-withdraw__calculator">
          <div className="program-withdraw__calculator-header">
            {t("program-withdraw.how-much-withdraw")}
          </div>
          <div className="program-withdraw__calculator-cell input-token">
            <div className="input-gvt__token">
              <Field
                name="amount"
                type="number"
                placeholder="0"
                controllClass="input-token__amount"
                component={InputText}
                allowNegative={false}
              />
            </div>
            <div className="input-token__description">
              {t("program-withdraw.enter-amount", {
                token: programWithdraw.token.tokenSymbol
              })}
            </div>
          </div>
          <div>
            <span className="link" onClick={handleWithdrawAll}>
              {t("program-withdraw.withdraw-all")}
            </span>
          </div>
        </div>

        <FormError error={error} />
        <PopupButtons
          submitLabel="Sell Tokens"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closePopup}
          submitButtonId="programWithdrawSubmit"
        />
      </form>
    </div>
  );
};

export default withFormik({
  displayName: "programWithdrawForm",
  mapPropsToValues: () => ({
    amount: ""
  }),
  validationSchema: yupObject().shape({
    amount: yupNumber()
      .typeError("Amount must be a number.")
      .moreThan(0, "Amount must be greater than zero")
      .required("Amount is required.")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.submitPopup(values, setSubmitting);
  }
})(translate()(TraderWithdraw));
