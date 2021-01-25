import authActions from "actions/auth-actions";
import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_ROUTE } from "routes/app.routes";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import authService from "services/auth-service";
import { MiddlewareDispatch } from "utils/types";

import { useThreeFactorState } from "../signin/signin.service";
import SecurityVerificationForm from "./security-verification-form";
import { confirmThreeStepAuth } from "./service/security-verification.service";

const _SecurityVerificationContainer: React.FC<Props> = ({
    code,
    email: urlEmail
}) => {
    const dispatch = useDispatch<MiddlewareDispatch>();
    const { clearThreeFactorState, getThreeFactorState } = useThreeFactorState();
    const updateTokenMiddleware = (token: string): void => {
        clearThreeFactorState();
        if (token) {
            authService.storeToken(token);
            dispatch(authActions.updateTokenAction(true));
            Push(DASHBOARD_ROUTE);
        } else {
            Push(LOGIN_ROUTE);
        }
    };
    const { email: cookieEmail, tempToken: token } = getThreeFactorState();
    const email = urlEmail || cookieEmail;
    const { sendRequest, errorMessage } = useApiRequest({
        middleware: [updateTokenMiddleware],
        successMessage: "auth:security-verification.success-alert-message",
        request: confirmThreeStepAuth
    });

    useEffect(() => {
        if (code && urlEmail) {
            sendRequest({ email, token, code });
        } else if (!email || !token) {
            Push(NOT_FOUND_PAGE_ROUTE);
        }
    }, []);

    return (
        <SecurityVerificationForm
            onSubmit={sendRequest}
            errorMessage={errorMessage}
            email={email}
            token={token}
        />
    );
};

interface Props {
    code: string;
    email: string;
}

const SecurityVerificationContainer = React.memo(
    _SecurityVerificationContainer
);
export default SecurityVerificationContainer;
