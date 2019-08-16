import { ProfileFullViewModel } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
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
  const [data, setData] = useState<ProfileFullViewModel | undefined>(undefined);
  const fetch = () =>
    profileApi.v10ProfileGet(authService.getAuthArg()).then(setData);
  useEffect(() => {
    fetch();
  }, []);
  const success = (text: string) => {
    alertMessageActionsSuccess(text);
    fetch();
  };
  /*const handleEdit = useCallback(
    (values: ProfileFormValues, setSubmitting: SetSubmittingType) => {
      const model = pickBy(
        values,
        str => !!str
      ) as UpdatePersonalDetailViewModel;
      profileApi
        .v10ProfilePersonalUpdatePost(authService.getAuthArg(), {
          model
        })
        .then(() => {
          success(t("profile-page.success-edit"));
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    []
  );*/
  return (
    <Profile
      condition={!!data}
      info={data!}
      notifySuccess={alertMessageActionsSuccess}
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
