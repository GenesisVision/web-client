import TradesDelay from "components/assets/fields/trades-delay";
import GVButton from "components/gv-button";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import { TradesDelay as TradesDelayType } from "gv-api-web";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

enum FIELDS {
  tradesDelay = "tradesDelay"
}
const _TradesUpdating: React.FC<Props> = ({
  onSubmit,
  tradesDelay,
  editError
}) => {
  const [t] = useTranslation();
  const form = useForm<TradesUpdatingFormValues>({
    defaultValues: {
      [FIELDS.tradesDelay]: tradesDelay
    },
    mode: "onBlur"
  });
  const {
    formState: { isValid, dirty, isSubmitting, isSubmitted }
  } = form;

  const isSuccessful = isSubmitted && !editError;
  const disabled = !isValid || !dirty || isSubmitting || isSuccessful;
  return (
    <SettingsBlock label={t("program-settings.trades-update.title")}>
      <HookForm form={form} onSubmit={onSubmit}>
        <TradesDelay name={FIELDS.tradesDelay} />
        <GVButton
          color="primary"
          type={"submit"}
          className="invest-form__submit-button"
          isPending={isSubmitting}
          isSuccessful={isSuccessful}
          disabled={disabled}
        >
          {t("program-settings.buttons.save")}
        </GVButton>
      </HookForm>
    </SettingsBlock>
  );
};

export interface TradesUpdatingFormValues {
  [FIELDS.tradesDelay]: TradesDelayType;
}

interface Props {
  editError?: boolean;
  tradesDelay: TradesDelayType;
  onSubmit: (values: TradesUpdatingFormValues) => void;
}

const TradesUpdating = withLoader(React.memo(_TradesUpdating));
export default TradesUpdating;
