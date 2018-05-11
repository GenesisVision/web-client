import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { push } from "react-router-redux";

import tournamentService from "../../service/tournament-service";
import TournamentTabs from "./tournament-tabs/tournament-tabs";
import replaceParams from "../../../../utils/replace-params";
import {
  TOURNAMENT_ROUND_ROUTE,
  ROUND_NUMBER_FILTER_NAME
} from "../../tournament.constants";
import { normalizeFilteringSelector } from "../../../filtering/selectors/filtering-selectors";

class TournamentTabsContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.handleFilterChange({
      name: ROUND_NUMBER_FILTER_NAME,
      value: +match.params.round
    });
  }

  componentWillUpdate(nextProps) {
    const { match, filtering } = nextProps;
    if (
      filtering.filters[ROUND_NUMBER_FILTER_NAME] &&
      +match.params.round !== filtering.filters[ROUND_NUMBER_FILTER_NAME]
    ) {
      this.props.handleFilterChange({
        name: ROUND_NUMBER_FILTER_NAME,
        value: +match.params.round
      });
    }
  }

  onFilterChange = roundNo => () => {
    this.props.pushRoute(roundNo);
  };

  render() {
    const { filtering, tournamentSettings } = this.props;
    if (!filtering.filters) return null;
    return (
      <TournamentTabs
        activeRound={filtering.filters[ROUND_NUMBER_FILTER_NAME]}
        roundsCount={tournamentSettings.tournamentTotalRounds}
        onFilterChange={this.onFilterChange}
      />
    );
  }
}

const mapStateToProps = state => {
  const { data: tournamentSettings } = state.platformData.settings;
  const filtering = normalizeFilteringSelector(state.tournamentData.programs);
  return { tournamentSettings, filtering };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    dispatch(tournamentService.changeFilter(filter));
  },
  pushRoute: roundNo => {
    dispatch(
      push(
        replaceParams(TOURNAMENT_ROUND_ROUTE, {
          ":round": roundNo
        })
      )
    );
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TournamentTabsContainer)
);
