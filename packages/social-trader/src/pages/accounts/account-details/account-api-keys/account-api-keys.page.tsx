import { ApiKeysContextProvider } from "components/api-keys/api-keys.context";
import React from "react";
import { useSelector } from "react-redux";

import { accountDescriptionSelector } from "../reducers/description.reducer";
import AccountApiKeysContainer from "./account-api-keys.contaner";

const _AccountApiKeysPage: React.FC = () => {
  const description = useSelector(accountDescriptionSelector);
  return (
    <ApiKeysContextProvider>
      <AccountApiKeysContainer data={description!} />
    </ApiKeysContextProvider>
  );
};

const AccountApiKeysPage = React.memo(_AccountApiKeysPage);
export default AccountApiKeysPage;
