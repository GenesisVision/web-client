import { withFormik, Field } from "formik";
import React from "react";

import GVSelect from "../../../../../../shared/components/form/gv-select/gv-select";

const programOptions = programs =>
  programs.map(x => ({ value: x.id, label: x.title }));

const transactionTypeOptions = [
  { value: "All", label: "All" },
  { value: "Internal", label: "Internal" },
  { value: "External", label: "External" }
];
const WalletTransactionListFilter = ({
  programs,
  values,
  setFieldValue,
  setFieldTouched,
  onChangeComplete
}) => {
  return (
    <form className="filter-list">
      <div className="filter-item">
        <div className="filter-item__title">Program</div>
        <div className="filter-item__description">Select Program</div>
        <div className="filter-item__component">
          <Field
            name="program"
            value={values.program}
            onChange={onChangeComplete("program")}
            setFieldValue={setFieldValue}
            onBlur={setFieldTouched}
            component={GVSelect}
            options={programOptions(programs)}
          />
        </div>
      </div>
      <div className="filter-item">
        <div className="filter-item__title">Transactions Type</div>
        <div className="filter-item__description">Select Transactions Type</div>
        <div className="filter-item__component">
          <Field
            name="transactionType"
            value={values.transactionType}
            onChange={onChangeComplete("transactionType")}
            setFieldValue={setFieldValue}
            onBlur={setFieldTouched}
            component={GVSelect}
            options={transactionTypeOptions}
          />
        </div>
      </div>
    </form>
  );
};

export default withFormik({
  displayName: "walletTransactionListFilterForm",
  mapPropsToValues: props => ({
    program: props.filtering.investmentProgramId,
    transactionType: props.filtering.type
  })
})(WalletTransactionListFilter);
