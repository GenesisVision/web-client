import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FundNotifications from "./fund-notifications";
import { fetchFundNotificationsService } from "./services/fund-notifications.services";

class FundNotificationsContainer extends Component {
  componentDidMount() {
    this.props.services.fetchFundNotificationsService(this.props.id);
  }

  render() {
    const { fund } = this.props;
    if (!fund) return null;
    return <FundNotifications fund={fund} />;
  }
}

FundNotificationsContainer.propTypes = {
  id: PropTypes.string
};

const mapStateToProps = (state, props) => ({
  fund: state.fundNotifications.data[props.id]
});

const mapDispatchToProps = dispatch => ({
  services: bindActionCreators({ fetchFundNotificationsService }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundNotificationsContainer);
