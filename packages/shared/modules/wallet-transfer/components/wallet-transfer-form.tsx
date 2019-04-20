import "./wallet-transfer-form.scss";

import { FormikProps, withFormik } from "formik";
import {
  CopyTradingAccountInfo,
  InternalTransferRequestDestinationTypeEnum,
  InternalTransferRequestSourceTypeEnum,
  WalletData
} from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TransferRate from "shared/modules/wallet-transfer/components/transfer-rate";
import filesService from "shared/services/file-service";
import { formatCurrencyValue } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";
import { Schema, lazy, number, object } from "yup";

import { TRANSFER_DIRECTION } from "../wallet-transfer-popup";
import * as walletService from "./wallet-transfer.service";

class WalletTransferForm extends React.PureComponent<Props> {
  onChangeSourceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldValue, values } = this.props;
    const currencyFromNew = event.target.value;
    if (currencyFromNew === values.destinationId) {
      setFieldValue("destinationId", values.sourceId);
    }
    setFieldValue("sourceId", currencyFromNew);
  };

  onChangeDestinationId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldValue } = this.props;
    setFieldValue("destinationId", event.target.value);
  };

  isAllow = (values: NumberFormatValues) => values.value !== ".";

  render() {
    const {
      sourceItems,
      destinationItems,
      t,
      handleSubmit,
      values,
      isValid,
      dirty,
      errorMessage,
      setFieldValue,
      isSubmitting
    } = this.props;
    const { sourceId, destinationId } = values;
    const destinationItemWithoutCurrent = walletService.getDestinationItems(
      destinationItems,
      sourceId
    );
    const selectedSourceItem = walletService.getSelectedItem(
      sourceItems,
      sourceId
    );
    const formattedAvailableSourceItem = formatCurrencyValue(
      selectedSourceItem.available,
      selectedSourceItem.currency
    );
    const selectedDestinationItem = walletService.getSelectedItem(
      destinationItemWithoutCurrent,
      destinationId
    );
    const formattedAvailableToItem = formatCurrencyValue(
      selectedDestinationItem.available,
      selectedDestinationItem.currency
    );

    const setMaxAmount = () => {
      setFieldValue("amount", formattedAvailableSourceItem);
    };

    const disableButton = isSubmitting || !values.amount || !isValid || !dirty;

    return (
      <form
        id="wallet-transfer"
        className="wallet-transfer-popup"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("wallet-transfer.title")}</h2>
          </div>
          <GVFormikField
            name="sourceId"
            component={GVTextField}
            label={t("wallet-transfer.from")}
            InputComponent={Select}
            onChange={this.onChangeSourceId}
          >
            {sourceItems.map(item => (
              <option value={item.id} key={`from-${item.id}`}>
                <img
                  src={filesService.getFileUrl(item.logo)}
                  className="wallet-transfer-popup__icon"
                  alt={item.currency}
                />
                {`${item.title} | ${item.currency}`}
              </option>
            ))}
          </GVFormikField>
          <StatisticItem label={t("wallet-transfer.availableFrom")}>
            {`${formattedAvailableSourceItem} ${selectedSourceItem.currency}`}
          </StatisticItem>
        </div>
        <div className="dialog__bottom">
          <GVFormikField
            name="destinationId"
            component={GVTextField}
            label={t("wallet-transfer.to")}
            InputComponent={Select}
            onChange={this.onChangeDestinationId}
          >
            {destinationItemWithoutCurrent.map(item => (
              <option value={item.id} key={`to-${item.id}`}>
                <img
                  src={filesService.getFileUrl(item.logo)}
                  className="wallet-transfer-popup__icon"
                  alt={item.currency}
                />
                {`${item.title} | ${item.currency}`}
              </option>
            ))}
          </GVFormikField>
          <StatisticItem label={t("wallet-transfer.availableTo")}>
            {`${formattedAvailableToItem} ${selectedDestinationItem.currency}`}
          </StatisticItem>
          <div className="dialog-field">
            <InputAmountField
              name="amount"
              label={t("wallet-transfer.amount")}
              currency={selectedSourceItem.currency}
              setMax={setMaxAmount}
              isAllow={this.isAllow}
            />
          </div>
          {values.amount && (
            <TransferRate
              destinationCurrency={selectedDestinationItem.currency}
              sourceCurrency={selectedSourceItem.currency}
            >
              {props => (
                <span>{`≈ ${formatCurrencyValue(
                  props.rate * Number(values.amount),
                  selectedDestinationItem.currency
                )} ${selectedDestinationItem.currency}`}</span>
              )}
            </TransferRate>
          )}
          <div className="form-error">{errorMessage}</div>
          <div className="dialog__buttons">
            <GVButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={disableButton}
            >
              {t("buttons.confirm")}
            </GVButton>
          </div>
          <div className="dialog__info">{t("wallet-transfer.info")}</div>
        </div>
      </form>
    );
  }
}

export default compose<React.FunctionComponent<OwnProps>>(
  translate(),
  withFormik<OwnProps, FormValues>({
    displayName: "wallet-transfer",
    mapPropsToValues: props => {
      const {
        sourceItems,
        destinationItems,
        currentItem,
        destinationType
      } = props;
      let sourceId, destinationId;
      if (destinationType === TRANSFER_DIRECTION.COPYTRADING_ACCOUNT) {
        sourceId = sourceItems[0].id;
        destinationId = currentItem.id;
      } else {
        sourceId = currentItem.id;
        const destinationItem = walletService.getDestinationItems(
          destinationItems,
          sourceId
        );
        destinationId = destinationItem[0].id;
      }
      return { sourceId, amount: "", destinationId };
    },
    validationSchema: (props: Props) => {
      const { sourceItems, t } = props;
      return lazy(
        (values: FormValues): Schema<any> => {
          const selectedSourceItem = walletService.getSelectedItem(
            sourceItems,
            values.sourceId
          );
          return object().shape({
            amount: number()
              .moreThan(0, t("wallet-transfer.validation.amount-is-zero"))
              .max(
                +formatCurrencyValue(
                  selectedSourceItem.available,
                  selectedSourceItem.currency
                ),
                t("wallet-transfer.validation.amount-more-than-available")
              )
          });
        }
      );
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      const transferAll = getTransferAll(values, props);
      props.onSubmit({ ...values, transferAll }, setSubmitting);
    }
  })
)(WalletTransferForm);

const getTransferAll = (values: FormValues, props: OwnProps) => {
  const { amount, sourceId } = values;
  const { sourceItems } = props;
  const selectedSourceItem = walletService.getSelectedItem(
    sourceItems,
    sourceId
  );
  const formattedAvailableSourceItem = formatCurrencyValue(
    selectedSourceItem.available,
    selectedSourceItem.currency
  );
  return amount === formattedAvailableSourceItem;
};

interface OwnProps {
  onSubmit(
    values: TransferFormValuesType,
    setSubmitting: SetSubmittingType
  ): void;
  errorMessage?: string;
  currentItem: WalletData;
  destinationType?: TRANSFER_DIRECTION;
  sourceItems: Array<CopyTradingAccountInfo | WalletData>;
  destinationItems: Array<CopyTradingAccountInfo | WalletData>;
}

interface FormValues {
  sourceId: string;
  destinationId: string;
  amount: string;
}

type Props = InjectedTranslateProps & FormikProps<FormValues> & OwnProps;

export type TransferFormValuesType = FormValues & {
  transferAll: boolean;
  sourceType?: InternalTransferRequestSourceTypeEnum;
  destinationType?: InternalTransferRequestDestinationTypeEnum;
};
