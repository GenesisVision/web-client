import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as globalSearchService from "../../services/global-search.service";
import GlobalSearchInput from "./global-search-input";

const mapStateToProps = state => {
  const { queryValue } = state.globalSearch;
  return { query: queryValue };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(globalSearchService, dispatch)
});

const GlobalSearchInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalSearchInput);

export default GlobalSearchInputContainer;
