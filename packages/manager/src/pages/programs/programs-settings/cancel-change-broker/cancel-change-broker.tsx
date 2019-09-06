import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import SettingsBlock from "shared/components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import CancelChangeBrokerForm, {
  CancelChangeBrokerFormOwnProps
} from "./cancel-change-broker-form";

const _ChangeChangeBroker: React.FC<
  CancelChangeBrokerFormOwnProps & WithTranslation
> = props => (
  <SettingsBlock
    label={props.t("manager.program-settings.broker.title")}
    content={<CancelChangeBrokerForm {...props} />}
  />
);

const ChangeChangeBroker = compose<
  React.ComponentType<CancelChangeBrokerFormOwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  React.memo
)(_ChangeChangeBroker);

export default ChangeChangeBroker;
