import TradesDelay from "components/assets/fields/trades-delay";
import GVButton from "components/gv-button";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { FormikProps, withFormik } from "formik";
import { TradesDelay as TradesDelayType } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";

const _TradesUpdating: React.FC<Props> = ({
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => {
  const [t] = useTranslation();
  return (
    <SettingsBlock label={t("program-settings.trades-update.title")}>
      <form id="edit-form" onSubmit={handleSubmit}>
        <TradesDelay name={FIELDS.tradesDelay} />
        <GVButton
          color="primary"
          type={"submit"}
          className="invest-form__submit-button"
          disabled={!dirty || !isValid || isSubmitting}
        >
          {t("program-settings.buttons.save")}
        </GVButton>
      </form>
    </SettingsBlock>
  );
};

enum FIELDS {
  tradesDelay = "tradesDelay"
}

export interface TradesUpdatingFormValues {
  [FIELDS.tradesDelay]: TradesDelayType;
}

interface Props extends OwnProps, FormikProps<TradesUpdatingFormValues> {}

interface OwnProps {
  tradesDelay: TradesDelayType;
  onSubmit: (
    values: TradesUpdatingFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const TradesUpdating = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  withFormik<OwnProps, TradesUpdatingFormValues>({
    enableReinitialize: true,
    displayName: "edit-form",
    mapPropsToValues: ({ tradesDelay }) => ({
      [FIELDS.tradesDelay]: tradesDelay
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_TradesUpdating);
export default TradesUpdating;
