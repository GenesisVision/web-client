import { Button } from "components/button/button";
import { SignalSubscription } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import EditFollowModuleContainer from "modules/follow-module/edit-follow-module-container";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum, Sizeable } from "utils/types";

const _EditFollowButton: React.FC<Props> = ({
  title,
  renderAssetPopup,
  size = "xlarge",
  signalSubscription,
  onApply,
  tradingAccountId,
  id,
  currency
}) => {
  const [t] = useTranslation();
  const [isOpenPopup, setIsOpenPopup, setIsClosePopup] = useIsOpen();
  const dispatchDescription = useCallback(() => {
    onApply();
  }, [id]);
  return (
    <>
      <Button size={size} onClick={setIsOpenPopup}>
        {t("buttons.edit")}
      </Button>
      <EditFollowModuleContainer
        title={title}
        renderAssetPopup={renderAssetPopup}
        signalSubscription={signalSubscription}
        tradingAccountId={tradingAccountId}
        id={id}
        open={isOpenPopup}
        currency={currency}
        onClose={setIsClosePopup}
        onApply={dispatchDescription}
      />
    </>
  );
};

interface Props extends Sizeable {
  title: string;
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  signalSubscription: SignalSubscription;
  onApply: VoidFunction;
  tradingAccountId: string;
  id: string;
  currency: CurrencyEnum;
}

const EditFollowButton = React.memo(_EditFollowButton);
export default EditFollowButton;
