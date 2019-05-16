import { replace } from "connected-react-router";
import { CancelablePromise } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";
import { MiddlewareDispatch, ResponseError } from "shared/utils/types";

import EmailConfirmFailure from "./email-confirm-failure";
import { confirmEmail } from "./service/email-confirm.service";

class _EmailConfirmContainer extends React.PureComponent<Props, State> {
  state = {
    isPending: true,
    errorMessage: ""
  };

  componentDidMount() {
    const { queryParams, service } = this.props;
    if (queryParams.userId && queryParams.code) {
      service
        .confirmEmail(queryParams.userId, queryParams.code)
        .catch(({ errorMessage }: ResponseError) =>
          this.setState({ errorMessage, isPending: false })
        );
    } else service.showNotFoundPage();
  }

  render() {
    const { isPending, errorMessage } = this.state;
    if (isPending) return null;
    return <EmailConfirmFailure errorMessage={errorMessage} />;
  }
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch) => ({
  service: {
    confirmEmail: (userId: string, code: string) =>
      dispatch(confirmEmail(userId, code)),
    showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE))
  }
});

interface Props extends OwnProps, DispatchProps {}

interface DispatchProps {
  service: {
    confirmEmail: (userId: string, code: string) => CancelablePromise<void>;
    showNotFoundPage: () => void;
  };
}

interface OwnProps {
  queryParams: IQueryParams;
}

interface State {
  isPending: boolean;
  errorMessage: string;
}

export interface IQueryParams {
  userId: string;
  code: string;
}

const EmailConfirmContainer = connect<null, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(_EmailConfirmContainer);
export default EmailConfirmContainer;
