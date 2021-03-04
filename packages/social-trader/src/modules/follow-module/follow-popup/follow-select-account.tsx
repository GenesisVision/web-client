import { Button } from "components/button/button";
import { CurrencySourceSelectElement } from "components/currency-source-select/currency-source-select.element";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { Row } from "components/row/row";
import { ISelectChangeEvent } from "components/select/select";
import { TradingAccountDetails } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const _FollowSelectAccount: React.FC<Props> = ({ accounts, onSelect }) => {
  const [account, setAccount] = useState(accounts[0].id);
  const [t] = useTranslation();
  const handleNext = useCallback(() => onSelect(account), [onSelect, account]);
  const onChange = useCallback(
    (event: ISelectChangeEvent) => {
      setAccount(event.target.value);
    },
    [setAccount]
  );
  return (
    <form id="follow-select-account">
      <Row>
        <CurrencySourceSelectElement
          wide
          value={account}
          name={""}
          label={t("follow-program.create-account.from")}
          items={accounts.map(item => ({ ...item, title: item.login }))}
          onChange={onChange}
        />
      </Row>
      <DialogButtons>
        <Button wide onClick={handleNext}>
          {t("follow-program.create-account.next")}
        </Button>
      </DialogButtons>
    </form>
  );
};

interface Props {
  accounts: TradingAccountDetails[];
  onSelect: (values: string) => void;
}

const FollowSelectAccount = React.memo(_FollowSelectAccount);
export default FollowSelectAccount;
