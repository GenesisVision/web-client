import * as React from "react";
import { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";

import { logoutFromDevices } from "../services/profile-settings.service";

const _LogoutButtonContainer: React.FC<Props> = ({ t, service }) => {
  const [isPending, setPending, setNotPending] = useIsOpen();
  const handleSubmit = useCallback(() => {
    setPending();
    service
      .logoutFromDevices()
      .then(setNotPending)
      .catch(setNotPending);
  }, []);
  return (
    <GVButton
      variant="text"
      onClick={handleSubmit}
      color="secondary"
      disabled={isPending}
      className="profile-settings__logout-devices"
    >
      {t("profile-page.settings.logout-from-another-devices")}
    </GVButton>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { logoutFromDevices },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  logoutFromDevices: typeof logoutFromDevices;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {}

const LogoutButtonContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_LogoutButtonContainer);
export default LogoutButtonContainer;
