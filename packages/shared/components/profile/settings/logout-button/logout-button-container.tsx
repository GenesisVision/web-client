import * as React from "react";
import { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";

import { logoutFromDevices } from "../services/profile-settings.service";

const _LogoutButtonContainer: React.FC<Props> = ({ t, service }) => {
  const [isPending, setPending, setNotPending] = useIsOpen();
  const handleSubmit = useCallback(
    () => {
      setPending();
      service.logoutFromDevices().finally(setNotPending);
    },
    [service, setNotPending, setPending]
  );
  return (
    <div className="logout-container">
      <GVButton onClick={handleSubmit} disabled={isPending}>
        {t("profile-page.settings.logout-from-another-devices")}
      </GVButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { logoutFromDevices },
    dispatch
  )
});

interface Props extends OwnProps, DispatchProps, WithTranslation {}

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
