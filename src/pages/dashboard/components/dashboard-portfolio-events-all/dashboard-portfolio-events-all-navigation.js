import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";

class PortfolioEventsAllNavigation extends Component {
  render() {
    const { t, className, goBack } = this.props;
    return (
      <div className={className}>
        <GVButton variant="text" onClick={goBack}>
          &larr; {t("buttons.back")}
        </GVButton>
        <div className="navigation-title">/dashboard</div>
      </div>
    );
  }
}

export default translate()(PortfolioEventsAllNavigation);
