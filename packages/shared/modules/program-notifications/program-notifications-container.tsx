import { ProgramNotificationSettingList } from "gv-api-web";
import React from "react";
import { ResolveThunks, connect } from "react-redux";
import { ActionCreatorsMapObject, Dispatch, bindActionCreators } from "redux";
import { AuthRootState } from "shared/utils/types";

import ProgramNotifications from "./program-notifications";
import { fetchProgramNotifications } from "./services/program-notifications.services";

class ProgramNotificationsContainer extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.service.fetchProgramNotifications(this.props.id);
  }

  render() {
    return (
      <ProgramNotifications
        condition={!!this.props.program}
        program={this.props.program!}
      />
    );
  }
}

const mapStateToProps = (
  state: AuthRootState,
  props: OwnProps
): StateProps => ({
  program: state.programNotifications.data[props.id]
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { fetchProgramNotifications },
    dispatch
  )
});

interface Props extends OwnProps, StateProps, DispatchProps {}

interface OwnProps {
  id: string;
}

interface StateProps {
  program?: ProgramNotificationSettingList;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  fetchProgramNotifications: typeof fetchProgramNotifications;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

export default connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
  mapStateToProps,
  mapDispatchToProps
)(ProgramNotificationsContainer);
