import GVTFees from "components/gvt-fees/gvt-fees";
import SwitchWithQuestion from "components/switch-with-question/switch-with-question";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

import {
  offPayFeesWithGvt,
  onPayFeesWithGvt
} from "../../services/wallet.services";

const _WalletSettingsContainer: React.FC<Props> = ({
  isPayFeesWithGvt: isPayFeesWithGvtProp
}) => {
  const [t] = useTranslation();
  const [isOpenGVTFees, setOpenGVTFees, setCloseGVTFees] = useIsOpen();
  const [isPayFeesWithGvt, setPayFeesWithGvtValue] = useState(
    isPayFeesWithGvtProp
  );
  const setPayMiddleware = () => {
    setPayFeesWithGvtValue(!isPayFeesWithGvt);
  };
  const request = isPayFeesWithGvt ? offPayFeesWithGvt : onPayFeesWithGvt;
  const { isPending, sendRequest } = useApiRequest({
    request,
    middleware: [setPayMiddleware]
  });
  const handleSwitch = useCallback(() => sendRequest(), [
    request,
    isPayFeesWithGvt
  ]);
  return (
    <>
      <SwitchWithQuestion
        name="PayGVTFee"
        label={t("wallet-page.settings.label")}
        isPending={isPending}
        value={isPayFeesWithGvt}
        onChange={handleSwitch}
        onClickHelp={setOpenGVTFees}
      />
      <GVTFees open={isOpenGVTFees} onClose={setCloseGVTFees} />
    </>
  );
};

interface Props extends OwnProps {}

interface OwnProps {
  isPayFeesWithGvt: boolean;
}

const WalletSettingsContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_WalletSettingsContainer);
export default WalletSettingsContainer;
