import * as React from "react";
import { connect } from "react-redux";
import { isTablet } from "shared/utils/breakpoints";
import GoogleAuthDesktop, {
  IGoogleAuthProps
} from "./google-auth-steps-desktop";
import GoogleAuthMobile from "./google-auth-steps-mobile";
import RootState from "shared/reducers/root-reducer";

class GoogleAuthSteps extends React.PureComponent<Props> {
  render() {
    return isTablet(this.props.innerWidth) ? (
      <GoogleAuthMobile {...this.props} />
    ) : (
      <GoogleAuthDesktop {...this.props} />
    );
  }
}

const mapStateToProps = ({ ui }: RootState) => ({
  innerWidth: ui.innerWidth
});

interface Props extends IGoogleAuthProps, StateProps {}

interface StateProps {
  innerWidth: number;
}

const GoogleAuthStepsContainer = connect(mapStateToProps)(GoogleAuthSteps);

export default GoogleAuthStepsContainer;
