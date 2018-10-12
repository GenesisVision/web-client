import FundNotificationsCustom from "modules/fund-notifications/fund-notifications-custom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

import FundNotificationsGeneral from "./fund-notificatations-general";

class FundNotifications extends Component {
  getGeneralSettings = () => {
    return this.props.fund.settingsGeneral.reduce((acc, setting) => {
      acc[setting.type] = setting;
      return acc;
    }, {});
  };
  render() {
    const { fund } = this.props;
    return (
      <div>
        <h3 className="notification-settings__title">{fund.title}</h3>
        <FundNotificationsGeneral
          settings={this.getGeneralSettings()}
          fundId={fund.fundId}
        />
        <FundNotificationsCustom fund={fund} />
      </div>
    );
  }
}

const settingsGeneralProps = PropTypes.shape({
  id: PropTypes.string,
  fundId: PropTypes.string,
  managerId: PropTypes.string,
  type: PropTypes.string,
  conditionType: PropTypes.string,
  conditionAmount: PropTypes.number
});

const settingsCustomProps = PropTypes.shape({
  id: PropTypes.string,
  fundId: PropTypes.string,
  managerId: PropTypes.string,
  type: PropTypes.string,
  conditionType: PropTypes.string,
  conditionAmount: PropTypes.number
});

FundNotifications.propTypes = {
  t: PropTypes.func,
  fund: PropTypes.shape({
    fundId: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    logo: PropTypes.string,
    level: PropTypes.number,
    settingsGeneral: PropTypes.arrayOf(settingsGeneralProps),
    settingsCustom: PropTypes.arrayOf(settingsCustomProps)
  })
};

export default translate()(FundNotifications);
