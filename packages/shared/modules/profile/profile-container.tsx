import {
  ProfileFullViewModel,
  UpdatePersonalDetailViewModel
} from "gv-api-web";
import { pickBy } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { ProfileFormValues } from "shared/modules/profile/profile-form";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch, SetSubmittingType } from "shared/utils/types";

import Profile from "./profile";

const _ProfileContainer: React.FC<Props> = ({
  service,
  personal,
  editable,
  t
}) => {
  const [data, setData] = useState<ProfileFullViewModel | undefined>(undefined);
  const fetch = () =>
    profileApi.v10ProfileGet(authService.getAuthArg()).then(setData);
  useEffect(() => {
    fetch();
  }, []);
  const success = (text: string) => {
    service.alertMessageActionsSuccess(text);
    fetch();
  };
  const handleEdit = useCallback(
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
  );
  if (!data) return null;
  return <Profile personal={personal} info={data} />;
};

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    alertMessageActionsSuccess: (text: string) =>
      dispatch(alertMessageActions.success(text))
  }
});

interface OwnProps {
  editable?: boolean;
  personal?: boolean;
}

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
