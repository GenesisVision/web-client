import { DefaultTableBlock } from "components/default.block/default-table.block";
import { UsersTable } from "pages/social/users/users-table";
import React from "react";
import { useTranslation } from "react-i18next";

export const UsersContainer: React.FC = () => {
  return (
    <DefaultTableBlock>
      <UsersTable />
    </DefaultTableBlock>
  );
};
