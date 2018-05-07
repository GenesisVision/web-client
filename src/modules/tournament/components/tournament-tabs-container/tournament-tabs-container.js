import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { push } from "react-router-redux";

import tournamentService from "../../service/tournament-service";
import TournamentTabs from "./tournament-tabs/tournament-tabs";
import replaceParams from "../../../../utils/replace-params";
import { TOURNAMENT_ROUND_ROUTE } from "../../tournament.constants";

class TournamentTabsContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.handleFilterChange({
      name: "round",
      value: +match.params.round
    });
  }

  componentWillUpdate(nextProps) {
    const { match } = nextProps;
    const { filtering } = this.props;
    if (+match.params.round !== filtering.round) {
      this.props.handleFilterChange({
        name: "round",
        value: +match.params.round
      });
    }
  }

  onFilterChange = roundNo => () => {
    this.props.pushRoute(roundNo);
  };

  render() {
    const { filtering, tournamentSettings } = this.props;
    return (
      <TournamentTabs
        activeRound={filtering.round}
        roundsCount={tournamentSettings.tournamentTotalRounds}
        onFilterChange={this.onFilterChange}
      />
    );
  }
}

const mapStateToProps = state => {
  const { data: tournamentSettings } = state.platformData.settings;
  const { filtering } = state.tournamentData.programs;
  return { tournamentSettings, filtering };
};

const mapDispatchToProps = dispatch => ({
  handleFilterChange: filter => {
    dispatch(tournamentService.changeFilter(filter));
  },
  setFilter: roundNo => {
    dispatch(tournamentService.updateFiltering(roundNo));
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
