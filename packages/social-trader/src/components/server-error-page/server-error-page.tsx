import NotFoundPage from "components/not-found/not-found";
import ServerConnectionErrorPage from "components/server-error-page/server-connection-error-page";
import { ErrorViewModel } from "gv-api-web";
import React from "react";

const ServerErrorPage: React.FC<Props> = ({ ex }) => {
  switch (ex.code) {
    case "InternalServerError":
      return <NotFoundPage />;
    default:
      return <ServerConnectionErrorPage />;
  }
};

export default ServerErrorPage;

interface Props {
  ex: ErrorViewModel;
}
