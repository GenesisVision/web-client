import { replace } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import { ActionType } from "shared/utils/types";

import * as walletWithdrawConfirmService from "./services/wallet-withdraw-confirm.services";

interface IEmailConfirmContainerProps {
  queryParams: any;
}

interface IEmailConfirmContainerDispatchProps {
  service: {
    confirmWithdraw(
      requestId?: string,
      code?: string
    ): (dispatch: Dispatch<ActionType>) => Promise<any>;
    showNotFoundPage(): void;
  };
}

class EmailConfirmContainer extends React.PureComponent<
  IEmailConfirmContainerProps & IEmailConfirmContainerDispatchProps
> {
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

const mapDispatchToProps = (
  dispatch: Dispatch
): IEmailConfirmContainerDispatchProps => ({
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
