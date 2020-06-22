import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import CancelChangeBrokerFormContainer, {
  ICancelChangeBrokerFormContainerProps
} from "pages/invest/programs/programs-settings/cancel-change-broker/cancel-change-broker-form.container";
import React from "react";
import { useTranslation } from "react-i18next";

const _ChangeChangeBroker: React.FC<ICancelChangeBrokerFormContainerProps> = props => {
  const [t] = useTranslation();
  return (
    <SettingsBlock label={t("asset-settings:broker.title")}>
      <CancelChangeBrokerFormContainer {...props} />
    </SettingsBlock>
  );
};

const ChangeChangeBroker = withLoader(React.memo(_ChangeChangeBroker));
export default ChangeChangeBroker;
