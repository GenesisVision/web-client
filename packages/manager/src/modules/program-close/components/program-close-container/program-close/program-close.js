import { withFormik } from "formik";
import React from "react";
import FormError from "shared/components/form/form-error/form-error";

import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";

const ProgramClose = ({
  setFieldValue,
  isSubmitting,
  closePopup,
  handleSubmit,
  error
}) => {
  return (
    <div className="popup">
      <PopupHeader header="Close Program" onClose={closePopup} />
      <form id="closeProgramForm" onSubmit={handleSubmit}>
        <div>
          Investment program will be closed after this reporting period. Current
          investment requests will be cancelled and new requests won’t be
          accepted. Profit and funds from the trading account will be deposited
          to GVT wallets of investors and manager according to their shares.
        </div>
        <FormError error={error} />
        <PopupButtons
          submitLabel="Close Program"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closePopup}
          submitButtonId="closeProgramSubmit"
        />
      </form>
    </div>
  );
};

export default withFormik({
  displayName: "programCloseForm",
  handleSubmit: (values, { props, setSubmitting }) => {
    props.submitPopup(setSubmitting);
  }
})(ProgramClose);
