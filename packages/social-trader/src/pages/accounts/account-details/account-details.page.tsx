import AccountDetailsContainer from "pages/accounts/account-details/account-details.contaner";
import React from "react";
import { useSelector } from "react-redux";

import { accountDescriptionSelector } from "./reducers/description.reducer";

const _AccountDetailsPage: React.FC = () => {
  const description = useSelector(accountDescriptionSelector);
  return <AccountDetailsContainer data={description!} />;
};

const AccountDetailsPage = React.memo(_AccountDetailsPage);
export default AccountDetailsPage;
