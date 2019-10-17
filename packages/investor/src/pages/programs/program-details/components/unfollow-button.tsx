import ProgramUnfollowContainer from "modules/program-unfollow/program-unfollow-container";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import GVButton from "shared/components/gv-button";
import { dispatchProgramDescription } from "shared/components/programs/program-details/services/program-details.service";
import useIsOpen from "shared/hooks/is-open.hook";

const _UnFollowButton: React.FC<Props> = ({
  id,
  service: { dispatchProgramDescription }
}) => {
  const [t] = useTranslation();
  const [isOpenUnFollow, setIsOpenUnFollow, setIsCloseUnFollow] = useIsOpen();
  return (
    <>
      <GVButton
        color="secondary"
        variant="outlined"
        className="asset-details-description__invest-btn"
        onClick={setIsOpenUnFollow}
      >
        {t("program-details-page.description.unfollow")}
      </GVButton>
      <ProgramUnfollowContainer
        open={isOpenUnFollow}
        id={id}
        onClose={setIsCloseUnFollow}
        onApply={dispatchProgramDescription}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchProgramDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchProgramDescription: typeof dispatchProgramDescription;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  id: string;
}

interface Props extends OwnProps, DispatchProps {}

const UnFollowButton = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_UnFollowButton);
export default UnFollowButton;
