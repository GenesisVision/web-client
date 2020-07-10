import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import useCopy from "hooks/copy.hook";
import { useLocation } from "hooks/location";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { composePostDetailsUrl } from "routes/social.routes";

export interface ICopyLinkProps {
  onApply?: VoidFunction;
  url: string;
}

const _CopyLink: React.FC<ICopyLinkProps> = ({ onApply, url }) => {
  const [t] = useTranslation();
  const { location } = useLocation();
  const { copy } = useCopy();

  const [value, setValue] = useState<string | undefined>();

  useEffect(() => {
    if (location) setValue(location.origin + composePostDetailsUrl(url));
  }, [location]);

  const handleClick = useCallback(() => {
    if (value) {
      copy(value);
      onApply && onApply();
    }
  }, [value]);

  return (
    <TableCardActionsItem onClick={handleClick}>
      {t("Copy link")}
    </TableCardActionsItem>
  );
};

export const CopyLink = React.memo(_CopyLink);
