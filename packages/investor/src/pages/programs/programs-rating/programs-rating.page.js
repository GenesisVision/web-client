import React, { Component } from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import NavigationTabsContainer from "shared/components/navigation-tabs-container/navigation-tabs-container";
import * as routes from "../programs.routes";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";
import ProgramsRatingTables from "./programs-rating-tables";
import Surface from "shared/components/surface/surface";

const tabs = [
  { name: "1>2" },
  { name: "2>3" },
  { name: "3>4" },
  { name: "5>6" },
  { name: "7>8" },
  { name: "9>10" },
  { name: "11>12" }
];

class ProgramsRatingPage extends Component {
  state = {
    tab: "1>2"
  };

  componentDidMount() {
    const { match } = this.props;
    if (match.params.tab) this.setState({ tab: match.params.tab });
  }
  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };
  render() {
    const { t, id } = this.props;
    const { tab } = this.state;
    if (!tab) return null;
    return (
      <Page title={t("programs-page.title")}>
        <Surface>
          <NavigationTabsContainer
            programFacetRoute={routes.PROGRAMS_RATING_TAB_ROUTE}
            tabs={tabs}
            handleTabChange={this.handleTabChange}
            tab={tab}
          />
          {id && <ProgramsRatingTables key={tab} tab={tab} id={id} />}
        </Surface>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.profileHeader.info;
  if (!data) return {};
  return { id: data.id };
};

export default compose(
  translate(),
  connect(mapStateToProps)
)(ProgramsRatingPage);
