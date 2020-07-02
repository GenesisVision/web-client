import TradesDelay from "components/assets/fields/trades-delay";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { SubmitButton } from "components/submit-button/submit-button";
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

  return (
    <SettingsBlock label={t("asset-settings:trades-update.title")}>
      <HookForm form={form} onSubmit={onSubmit}>
        <TradesDelay name={FIELDS.tradesDelay} />
        <Row size={"large"}>
          <SubmitButton isSuccessful={!editError}>
            {t("asset-settings:buttons.save")}
          </SubmitButton>
        </Row>
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
