import { connect } from "react-redux";
import React, { Component } from "react";

import FilterContainer from "../../../filter/components/filter-container";
import TraderList from "./trader-list/trader-list";
import tradersActions from "../../actions/traders-actions";

class TraderListContainer extends Component {
  componentWillMount() {
    this.props.fetchTraders();
  }

  render() {
    const { isPending, traders } = this.props;
    if (isPending || !traders) return null;
    return (
      <div>
        <FilterContainer isOpen={true}>123</FilterContainer>
        <TraderList traders={traders.investmentPrograms} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.tradersData;
  return { isPending, traders: data };
};

const mapDispatchToProps = dispatch => ({
  fetchTraders: () => {
    dispatch(tradersActions.fetchTraders());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderListContainer
);
