import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import useCopy from "hooks/copy.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { composePostDetailsUrl } from "routes/social.routes";

export interface ICopyLinkProps {
  url: string;
}

const _CopyLink: React.FC<ICopyLinkProps> = ({ url }) => {
  const [t] = useTranslation();
  const value = composePostDetailsUrl(url);

  const { copy } = useCopy();
  const handleClick = useCallback(() => {
    copy(value);
  }, [value]);

  return (
    <TableCardActionsItem onClick={handleClick}>
      {t("Copy link")}
    </TableCardActionsItem>
  );
};

export const CopyLink = React.memo(_CopyLink);
