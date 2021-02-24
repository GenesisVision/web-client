import Dialog, { IDialogProps } from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import FollowTop from "modules/follow-module/follow-popup/follow-popup-top";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { postponeCallback } from "utils/hook-form.helpers";

import { IProgramUnfollowFormValues } from "./components/unfollow-form";
import {
  detachToSignalExternal,
  detachToSignalInternal
} from "./services/unfollow.service";

const UnfollowForm = dynamic(() => import("./components/unfollow-form"));

const _UnfollowContainer: React.FC<Props> = ({
  title,
  renderAssetPopup,
  tradingAccountId,
  isExternal,
  open,
  onClose,
  onApply,
  id
}) => {
  const [t] = useTranslation();
  const { sendRequest } = useApiRequest({
    request: getDetachMethod(isExternal),
    successMessage: "unfollow-program.success-alert-message",
    middleware: [
      postponeCallback(() => {
        onClose();
        onApply();
      })
    ]
  });
  const handleSubmit = useCallback(
    ({ mode }: IProgramUnfollowFormValues) => {
      return sendRequest({ id, model: { mode, tradingAccountId } });
    },
    [id, tradingAccountId]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      {renderAssetPopup(
        <FollowTop header={t("unfollow-program.title")} title={title} />,
        <UnfollowForm isExternal={isExternal} onSubmit={handleSubmit} />
      )}
    </Dialog>
  );
};

const getDetachMethod = (isExternal: boolean) =>
  isExternal ? detachToSignalExternal : detachToSignalInternal;

interface Props extends IDialogProps {
  title: string;
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  tradingAccountId: string;
  isExternal: boolean;
  id: string;
  onApply: () => void;
}

const UnfollowContainer = React.memo(_UnfollowContainer);
export default UnfollowContainer;
