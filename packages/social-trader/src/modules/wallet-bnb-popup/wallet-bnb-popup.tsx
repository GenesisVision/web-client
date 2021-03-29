import { Button } from "components/button/button";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { DialogTop } from "components/dialog/dialog-top";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _WalletBnbPopup: React.FC<Props> = ({ text, title, changePopup }) => {
  const [t] = useTranslation();
  return (
    <>
      <DialogTop title={title} />
      <DialogBottom>
        <DialogListItem label={text} />
        <DialogButtons>
          <Button wide onClick={changePopup}>
            {t("wallet-page:buttons.understand")}
          </Button>
        </DialogButtons>
      </DialogBottom>
    </>
  );
};

interface Props {
  text: string;
  title: string;
  changePopup: () => void;
}

const WalletBnbPopup = React.memo(_WalletBnbPopup);
export default WalletBnbPopup;
