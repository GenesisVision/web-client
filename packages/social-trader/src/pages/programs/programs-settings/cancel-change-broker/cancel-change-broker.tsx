import SettingsBlock from "components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

import CancelChangeBrokerForm, {
  CancelChangeBrokerFormOwnProps
} from "./cancel-change-broker-form";

const _ChangeChangeBroker: React.FC<
  CancelChangeBrokerFormOwnProps & WithTranslation
> = props => (
  <SettingsBlock label={props.t("program-settings.broker.title")}>
    <CancelChangeBrokerForm {...props} />
  </SettingsBlock>
);

const ChangeChangeBroker = compose<
  React.ComponentType<CancelChangeBrokerFormOwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  React.memo
)(_ChangeChangeBroker);

export default ChangeChangeBroker;
