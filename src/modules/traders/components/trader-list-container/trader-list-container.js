import { connect } from "react-redux";
import React, { Component } from "react";
import TraderList from "./trader-list/trader-list";
import tradersActions from "../../actions/traders-actions";
import TraderFilter from "./trader-filter/trader-filter";

class TraderListContainer extends Component {
  componentWillMount() {
    this.props.fetchTraders();
  }

  render() {
    const { isPending, traders } = this.props;
    if (isPending || !traders) return null;
    return (
      <div>
        <h1>Traders</h1>
        <div className="row">
          <div className="col-2">
            <TraderFilter />
          </div>
          <div className="col-10">
            <TraderList traders={traders.investments} />
          </div>
        </div>
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
