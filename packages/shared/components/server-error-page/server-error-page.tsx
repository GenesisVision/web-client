import { ErrorViewModel } from "gv-api-web";
import React from "react";
import NotFoundPage from "shared/components/not-found/not-found";
import ServerConnectionErrorPage from "shared/components/server-error-page/server-connection-error-page";

const ServerErrorPage: React.FC<Props> = ({ ex }) => {
  switch (ex.code) {
    case "InternalServerError":
      return <NotFoundPage />;
    case "ServerConnectionError":
    default:
      return <ServerConnectionErrorPage />;
  }
};

export default ServerErrorPage;

interface Props {
  ex: ErrorViewModel;
}
