import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _TransactionDetails: React.FC<Props> = ({ header, body, bottom }) => {
  const [t] = useTranslation();
  return (
    <>
      <DialogTop
        title={t(`wallet-page:transactions-details.title`)}
        subtitle={header}
      >
        {body}
      </DialogTop>
      <DialogBottom>{bottom}</DialogBottom>
    </>
  );
};

interface Props {
  header: JSX.Element | string;
  body: JSX.Element;
  bottom: JSX.Element;
}

const TransactionDetails = React.memo(_TransactionDetails);
export default TransactionDetails;
