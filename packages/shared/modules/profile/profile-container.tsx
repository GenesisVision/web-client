import { ProfileFullViewModel } from "gv-api-web";
import React, { useEffect, useState } from "react";
import {
  useTranslation,
  WithTranslation,
  withTranslation as translate
} from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

import Profile from "./profile";

const _ProfileContainer: React.FC<Props> = ({
  service: { alertMessageActionsSuccess }
}) => {
  const [t] = useTranslation();
  const [data, setData] = useState<ProfileFullViewModel | undefined>(undefined);
  const fetch = () =>
    profileApi.v10ProfileGet(authService.getAuthArg()).then(setData);
  useEffect(() => {
    fetch();
  }, []);
  const success = () => {
    alertMessageActionsSuccess(t("profile-page.success-edit"));
    fetch();
  };
  return (
    <Profile
      condition={!!data}
      info={data!}
      notifySuccess={alertMessageActionsSuccess}
      onSuccessEdit={success}
    />
  );
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    alertMessageActionsSuccess: (text: string) =>
      dispatch(alertMessageActions.success(text))
  }
});

interface OwnProps {}

interface DispatchProps {
  service: {
    alertMessageActionsSuccess: (text: string) => void;
  };
}

interface Props extends WithTranslation, DispatchProps, OwnProps {}

const ProfileContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_ProfileContainer);
export default ProfileContainer;
