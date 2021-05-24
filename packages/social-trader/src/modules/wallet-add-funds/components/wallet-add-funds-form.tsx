import { CurrencySourceSelectElement } from "components/currency-source-select/currency-source-select.element";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import GVqr from "components/gv-qr/gv-qr";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { ISelectChangeEvent } from "components/select/select";
import withLoader from "decorators/with-loader";
import { Blockchain, WalletData } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import CopyButton from "modules/copy-button/copy-button";
import { fetchWalletsAction } from "pages/wallet/actions/wallet.actions";
import BlockchainSelectContainer from "pages/wallet/components/blockchain-select/blockchain-select-container";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraphMobile } from "utils/style/sizes";

enum WALLET_ADD_FUNDS_FIELDS {
  blockchain = "blockchain"
}
interface IWalletDepositFormValues {
  [WALLET_ADD_FUNDS_FIELDS.blockchain]: Blockchain;
}

interface Props {
  wallets: WalletData[];
  currentWallet: WalletData;
}

const Bottom = styled(DialogBottom)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddressBlock = styled(Row)`
  text-align: center;
`;

const AddressValue = styled.div`
  ${fontSize($fontSizeParagraphMobile)}
`;

const _WalletAddFundsForm: React.FC<Props> = ({ wallets, currentWallet }) => {
  const dispatch = useDispatch();
  const accountCurrency = useAccountCurrency();
  const [t] = useTranslation();
  const [selected, setSelected] = useState<WalletData>(currentWallet);
  const { depositAddresses } = selected;

  const form = useForm<IWalletDepositFormValues>({
    defaultValues: {
      [WALLET_ADD_FUNDS_FIELDS.blockchain]: depositAddresses[0].blockchain
    },
    mode: "onChange"
  });

  const { reset, watch } = form;

  const { blockchain } = watch();

  const depositAddress = useMemo(
    () =>
      safeGetElemFromArray(
        depositAddresses,
        depositAddress => depositAddress.blockchain === blockchain
      ).address,
    [depositAddresses, blockchain]
  );

  const onChangeWallet = useCallback(
    (event: ISelectChangeEvent) => {
      setSelected(() => {
        const newWallet = safeGetElemFromArray(
          wallets,
          wallet => wallet.id === event.target.value
        );
        reset({
          [WALLET_ADD_FUNDS_FIELDS.blockchain]:
            newWallet.depositAddresses[0].blockchain
        });
        return newWallet;
      });
    },
    [wallets, setSelected]
  );

  const handleClickUpdate = useCallback(() => {
    dispatch(fetchWalletsAction(accountCurrency));
  }, []);
  return (
    <HookForm form={form}>
      <DialogTop title={t("wallet-deposit.title")}>
        <Row size={"large"}>
          <CurrencySourceSelectElement
            onClickUpdate={handleClickUpdate}
            name=""
            items={wallets}
            value={selected.id}
            wide
            label={t("wallet-deposit.select-currency")}
            onChange={onChangeWallet}
          />
        </Row>
        <Row size={"large"}>
          <BlockchainSelectContainer
            name={WALLET_ADD_FUNDS_FIELDS.blockchain}
            values={depositAddresses.map(item => item)}
          />
        </Row>
      </DialogTop>
      <Bottom>
        <Row>
          <GVqr value={depositAddress} />
        </Row>
        <AddressBlock>
          <LabeledValue label={t("wallet-deposit.deposit-address")}>
            <AddressValue>{depositAddress}</AddressValue>
          </LabeledValue>
        </AddressBlock>
        <DialogButtons>
          <CopyButton wide value={depositAddress} />
        </DialogButtons>
      </Bottom>
    </HookForm>
  );
};

const WalletAddFundsForm = withLoader(React.memo(_WalletAddFundsForm));
export default WalletAddFundsForm;
