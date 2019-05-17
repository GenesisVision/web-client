import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import RootState from "shared/reducers/root-reducer";
import { SetSubmittingType } from "shared/utils/types";

import { updateProfileAvatar } from "../services/profile-settings.service";
import ProfileImage from "./profile-image";

const _ProfileImageContainer: React.FC<StateProps & DispatchProps> = ({
  headerData,
  services
}) => {
  if (headerData === undefined) return null;

  const handleSubmit = (
    image: IImageValue,
    setSubmitting: SetSubmittingType
  ) => {
    services.updateProfileAvatar(image).then(() => {
      setSubmitting(false);
    });
  };

  return (
    <ProfileImage
      key={headerData.avatar}
      onSubmit={handleSubmit}
      avatar={headerData.avatar}
    />
  );
};

const mapStateToProps = ({ profileHeader }: RootState): StateProps => {
  return { headerData: profileHeader.info.data };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  services: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { updateProfileAvatar },
    dispatch
  )
});

const ProfileImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProfileImageContainer);

export default ProfileImageContainer;

interface StateProps {
  headerData?: ProfileHeaderViewModel;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  updateProfileAvatar: typeof updateProfileAvatar;
}

interface DispatchProps {
  services: ResolveThunks<ServiceThunks>;
}
