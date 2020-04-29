import GVTFees from "components/gvt-fees/gvt-fees";
import TextWithQuestion from "components/text-with-question/text-with-question";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _WalletSettingsContainer: React.FC<Props> = ({
  genesisMarketsDiscountPercent
}) => {
  const [t] = useTranslation();
  const [isOpenGVTFees, setOpenGVTFees, setCloseGVTFees] = useIsOpen();
  return (
    <>
      <TextWithQuestion
        label={t("wallet-page.settings.label", {
          percent: genesisMarketsDiscountPercent
        })}
        onClickHelp={setOpenGVTFees}
      />
      <GVTFees open={isOpenGVTFees} onClose={setCloseGVTFees} />
    </>
  );
};

interface Props {
  genesisMarketsDiscountPercent: number;
}

const WalletSettingsContainer = React.memo(_WalletSettingsContainer);
export default WalletSettingsContainer;
