import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import { TEvent } from "hooks/anchor.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { SocialShareDialog } from "./social-share.dialog";

interface Props {
  clearAnchor: (event?: TEvent) => void;
  label?: string;
  url: string;
}

export const _SocialShareButton: React.FC<Props> = ({
  clearAnchor,
  label,
  url
}) => {
  const [t] = useTranslation();
  const [isOpen, setIsOpen, setIsClose] = useIsOpen();

  const handleClose = useCallback(() => {
    setIsClose();
    clearAnchor();
  }, []);

  return (
    <>
      <TableCardActionsItem onClick={() => setIsOpen()}>
        {label || t("Share")}
      </TableCardActionsItem>
      <SocialShareDialog url={url} open={isOpen} onClose={handleClose} />
    </>
  );
};

export const SocialShareButton = React.memo(_SocialShareButton);
