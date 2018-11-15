import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import { bindActionCreators } from "redux";

import * as walletWithdrawConfirmService from "./services/wallet-withdraw-confirm.services";

class EmailConfirmContainer extends PureComponent {
  componentDidMount() {
    const { queryParams, service } = this.props;
    if (queryParams.requestId && queryParams.code) {
      service.confirmWithdraw(queryParams.requestId, queryParams.code);
    } else {
      service.showNotFoundPage();
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    {
      ...walletWithdrawConfirmService,
      showNotFoundPage: () => replace(NOT_FOUND_PAGE_ROUTE)
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(EmailConfirmContainer);
