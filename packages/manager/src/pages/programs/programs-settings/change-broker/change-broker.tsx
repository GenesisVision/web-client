import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import SettingsBlock from "shared/components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import ChangeBrokerForm, {
  ChangeBrokerFormOwnProps
} from "./change-broker-form";

const _ChangeBroker: React.FC<
  ChangeBrokerFormOwnProps & WithTranslation
> = props => (
  <SettingsBlock
    label={props.t("manager.program-settings.broker.title")}
    content={<ChangeBrokerForm {...props} />}
  />
);

const ChangeBroker = compose<
  React.ComponentType<ChangeBrokerFormOwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  React.memo
)(_ChangeBroker);

export default ChangeBroker;
