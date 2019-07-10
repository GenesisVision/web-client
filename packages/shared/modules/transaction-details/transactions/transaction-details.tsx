import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";

const _TransactionDetails: React.FC<Props> = ({ header, body, bottom, t }) => (
  <>
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t(`transactions-details.title`)}</h2>
        <p>{header}</p>
      </div>
      {body}
    </div>
    <div className="dialog__bottom">{bottom}</div>
  </>
);

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  header: JSX.Element;
  body: JSX.Element;
  bottom: JSX.Element;
}

const TransactionDetails = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_TransactionDetails);
export default TransactionDetails;
