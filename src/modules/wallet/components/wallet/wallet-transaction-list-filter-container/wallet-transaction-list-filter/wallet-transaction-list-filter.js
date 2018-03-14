import { withFormik, Field } from "formik";
import React from "react";

import GVSelect from "../../../../../../shared/components/form/gv-select/gv-select";

import "./wallet-transaction-list-filter.css";
const sortingOptions = [
  { value: "Name", label: "Name" },
  { value: "DaysLeft", label: "Days Left" }
];
const sortingDirectionOptions = [
  { value: "Asc", label: "Ascending" },
  { value: "Desc", label: "Descending" }
];
const WalletTransactionListFilter = ({
  programs,
  values,
  setFieldValue,
  setFieldTouched,
  onChangeComplete
}) => {
  return (
    <form className="wallet-transaction-list-filter">
      <div className="filter-item">
        <div className="filter-item__title">Sorting</div>
        <div className="filter-item__description">Select column</div>
        <div className="filter-item__component">
          <Field
            name="sorting"
            value={values.sorting}
            onChange={onChangeComplete("sorting")}
            setFieldValue={setFieldValue}
            onBlur={setFieldTouched}
            component={GVSelect}
            options={sortingOptions}
          />
        </div>
      </div>
      <div className="filter-item">
        <div className="filter-item__title">Sorting direction</div>
        <div className="filter-item__description">Select sorting direction</div>
        <div className="filter-item__component">
          <Field
            name="sortingDirection"
            value={values.sortingDirection}
            onChange={onChangeComplete("sortingDirection")}
            setFieldValue={setFieldValue}
            onBlur={setFieldTouched}
            component={GVSelect}
            options={sortingDirectionOptions}
          />
        </div>
      </div>
    </form>
  );
};

export default withFormik({
  displayName: "walletTransactionListFilterForm",
  mapPropsToValues: () => ({
    sorting: "",
    sortingDirection: ""
  })
})(WalletTransactionListFilter);
