import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import ChangeBrokerFormContainer, {
  IChangeBrokerFormContainerProps
} from "pages/invest/programs/programs-settings/change-broker/change-broker-form.container";
import React from "react";
import { useTranslation } from "react-i18next";

const _ChangeBroker: React.FC<IChangeBrokerFormContainerProps> = props => {
  const [t] = useTranslation();
  return (
    <SettingsBlock label={t("asset-settings:broker.title")}>
      <ChangeBrokerFormContainer {...props} />
    </SettingsBlock>
  );
};

const ChangeBroker = withLoader(React.memo(_ChangeBroker));

export default ChangeBroker;
