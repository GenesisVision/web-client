import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import SettingsBlock from "../settings-block";
import CancelChangeBrokerForm, {
  CancelChangeBrokerFormOwnProps
} from "./cancel-change-broker-form";

const _ChangeChangeBroker: React.FC<
  CancelChangeBrokerFormOwnProps & WithTranslation
> = props => (
  <SettingsBlock
    label={props.t("manager.asset-settings.broker.title")}
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
