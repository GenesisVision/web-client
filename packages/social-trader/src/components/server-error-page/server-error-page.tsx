import NotFoundPage from "components/not-found/not-found";
import ServerConnectionErrorPage from "components/server-error-page/server-connection-error-page";
import { ErrorViewModel } from "gv-api-web";
import React from "react";

const getErrorMessage = (error: ErrorViewModel): string | undefined => {
  if (typeof error === "string") return error;
  console.log(error);
  if (error.errors)
    return error.errors.map(({ message }) => message).join(", ");
};

const ServerErrorPage: React.FC<Props> = ({ ex }) => {
  switch (ex.code) {
    case "InternalServerError":
      return <NotFoundPage />;
    default:
      return <ServerConnectionErrorPage message={getErrorMessage(ex)} />;
  }
};

export default ServerErrorPage;

interface Props {
  ex: ErrorViewModel;
}
