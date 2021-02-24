import { Button } from "components/button/button";
import { BrokerTradeServerType } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import FollowModuleContainer from "modules/follow-module/follow-module-container";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _FollowButton: React.FC<Props> = ({
  title,
  renderAssetPopup,
  canFollow,
  onApply,
  leverage,
  brokerId,
  isExternal,
  broker,
  id,
  currency
}) => {
  const [t] = useTranslation();
  const label = t("asset-details:description.follow-trade");
  const [isOpenFollow, setIsOpenFollow, setIsCloseFollow] = useIsOpen();
  const dispatchDescription = useCallback(() => {
    onApply && onApply();
  }, [id]);
  return (
    <>
      <Button
        className={label}
        disabled={!canFollow}
        size={"xlarge"}
        onClick={setIsOpenFollow}
      >
        {t("asset-details:description.follow-trade")}
      </Button>
      <FollowModuleContainer
        title={title}
        renderAssetPopup={renderAssetPopup}
        leverage={leverage}
        isExternal={isExternal}
        brokerId={brokerId}
        broker={broker}
        id={id}
        open={isOpenFollow}
        currency={currency}
        onClose={setIsCloseFollow}
        onApply={dispatchDescription}
      />
    </>
  );
};

interface Props {
  title: string;
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  canFollow?: boolean;
  onApply?: VoidFunction;
  leverage: number;
  isExternal: boolean;
  brokerId: string;
  broker: BrokerTradeServerType;
  id: string;
  currency?: CurrencyEnum;
}

const FollowButton = React.memo(_FollowButton);
export default FollowButton;
