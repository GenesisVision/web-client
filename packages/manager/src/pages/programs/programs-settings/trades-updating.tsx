import { FormikProps, withFormik } from "formik";
import { ProgramDetailsFullTradesDelayEnum } from "gv-api-web";
import TradesDelay from "pages/create-program/components/create-program-settings/fields/trades-delay";
import React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import SettingsBlock from "shared/components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { SetSubmittingType } from "shared/utils/types";

const _TradesUpdating: React.FC<Props> = ({
  values,
  handleSubmit,
  dirty,
  isValid,
  isSubmitting
}) => {
  const [t] = useTranslation();
  return (
    <SettingsBlock label={t("manager.program-settings.trades-update.title")}>
      <form id="edit-form" onSubmit={handleSubmit}>
        <TradesDelay name={FIELDS.tradesDelay} />
        <GVButton
          color="primary"
          type={"submit"}
          className="invest-form__submit-button"
          disabled={!dirty || !isValid || isSubmitting}
        >
          {t("manager.program-settings.buttons.save")}
        </GVButton>
      </form>
    </SettingsBlock>
  );
};

enum FIELDS {
  tradesDelay = "tradesDelay"
}

export interface TradesUpdatingFormValues {
  [FIELDS.tradesDelay]: ProgramDetailsFullTradesDelayEnum;
}

interface Props extends OwnProps, FormikProps<TradesUpdatingFormValues> {}

interface OwnProps {
  tradesDelay: ProgramDetailsFullTradesDelayEnum;
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
