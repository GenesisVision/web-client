import { NOT_FOUND_PAGE_ROUTE } from "pages/not-found/not-found.routes";
import { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import { bindActionCreators, compose } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import * as walletWithdrawConfirmService from "./services/wallet-withdraw-confirm.services";

class EmailConfirmContainer extends PureComponent {
  componentDidMount() {
    const {
      t,
      queryParams,
      service,
      showNotFoundPage,
      notifySuccess,
      notifyError
    } = this.props;
    if (queryParams.requestId && queryParams.code) {
      service
        .confirmWithdraw(queryParams.requestId, queryParams.code)
        .then(() => {
          notifySuccess(t("wallet-withdraw.confirmation.sucess"));
        })
        .catch(error => {
          notifyError(
            t("wallet-withdraw.confirmation.error") + error.errorMessage
          );
        });
    } else {
      showNotFoundPage();
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(walletWithdrawConfirmService, dispatch),
  showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE)),
  notifySuccess: text => dispatch(alertMessageActions.success(text)),
  notifyError: text => dispatch(alertMessageActions.error(text))
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(EmailConfirmContainer);
