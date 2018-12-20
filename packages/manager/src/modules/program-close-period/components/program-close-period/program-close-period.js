import { withFormik } from "formik";
import React from "react";
import FormError from "shared/components/form/form-error/form-error";

import PopupButtons from "../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../popup/components/popup-header/popup-header";

const ProgramClosePeriod = ({
  setFieldValue,
  isSubmitting,
  closePopup,
  handleSubmit,
  error
}) => {
  return (
    <div className="popup">
      <PopupHeader header="Close Period" onClose={closePopup} />
      <form id="closePeriodForm" onSubmit={handleSubmit}>
        <div>Do you really want to restart current period?</div>
        <FormError error={error} />
        <PopupButtons
          submitLabel="Restart Period"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closePopup}
          submitButtonId="closePeriodSubmit"
        />
      </form>
    </div>
  );
};

export default withFormik({
  displayName: "programClosePeriodForm",
  handleSubmit: (values, { props, setSubmitting }) => {
    props.submitPopup(setSubmitting);
  }
})(ProgramClosePeriod);
