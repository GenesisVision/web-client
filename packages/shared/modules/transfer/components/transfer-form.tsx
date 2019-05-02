import "./transfer-form.scss";

import { FormikProps, withFormik } from "formik";
import {
  InternalTransferRequest,
  InternalTransferRequestSourceTypeEnum
} from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TransferRate from "shared/modules/transfer/components/transfer-rate";
import filesService from "shared/services/file-service";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";
import { Schema, lazy, number, object } from "yup";

import * as service from "../services/transfer.services";
import { ItemType, ItemsType, TRANSFER_CONTAINER } from "../transfer.types";

class _TransferForm extends React.PureComponent<Props> {
  onChangeSourceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldValue, values } = this.props;
    const currencyFromNew = event.target.value;
    if (currencyFromNew === values[FIELDS.destinationId]) {
      setFieldValue("destinationId", values[FIELDS.sourceId]);
    }
    setFieldValue("amount", "");
    setFieldValue("sourceId", currencyFromNew);
  };

  onChangeDestinationId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldValue } = this.props;
    setFieldValue("destinationId", event.target.value);
  };

  isAllow = (values: NumberFormatValues) => {
    const selectedSourceItem = service.getSelectedItem(
      this.props.sourceItems,
      this.props.values[FIELDS.sourceId]
    );

    const { floatValue, formattedValue, value } = values;
    const { currency, available } = selectedSourceItem;
    return (
      formattedValue === "" ||
      (validateFraction(value, currency) && floatValue <= available)
    );
  };

  render() {
    const {
      sourceType,
      destinationType,
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
    const { title = t("transfer.title") } = this.props;
    const destinationItemWithoutCurrent = service.getDestinationItems(
      destinationItems,
      values[FIELDS.sourceId]
    );
    const selectedSourceItem = service.getSelectedItem(
      sourceItems,
      values[FIELDS.sourceId]
    );
    const formattedAvailableSourceItem = formatCurrencyValue(
      selectedSourceItem.available,
      selectedSourceItem.currency
    );
    const selectedDestinationItem = service.getSelectedItem(
      destinationItemWithoutCurrent,
      values[FIELDS.destinationId]
    );
    const formattedAvailableDestinationItem = formatCurrencyValue(
      selectedDestinationItem.available,
      selectedDestinationItem.currency
    );

    const setMaxAmount = () => {
      setFieldValue("amount", formattedAvailableSourceItem);
    };

    const disableButton = isSubmitting || !values.amount || !isValid || !dirty;

    return (
      <form
        id="transfer"
        className="transfer-popup"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{title}</h2>
          </div>
          <GVFormikField
            name={FIELDS.sourceId}
            component={GVTextField}
            label={t("transfer.from")}
            InputComponent={Select}
            onChange={this.onChangeSourceId}
          >
            {sourceItems.map(item => (
              <option value={item.id} key={`from-${item.id}`}>
                <img
                  src={filesService.getFileUrl(item.logo)}
                  className="transfer-popup__icon"
                  alt={item.currency}
                />
                {`${item.title} | ${item.currency}`}
              </option>
            ))}
          </GVFormikField>
          <StatisticItem label={t(`transfer.available${sourceType}From`)}>
            {`${formattedAvailableSourceItem} ${selectedSourceItem.currency}`}
          </StatisticItem>
        </div>
        <div className="dialog__bottom">
          <GVFormikField
            name={FIELDS.destinationId}
            component={GVTextField}
            label={t("transfer.to")}
            InputComponent={Select}
            onChange={this.onChangeDestinationId}
          >
            {destinationItemWithoutCurrent.map(item => (
              <option value={item.id} key={`to-${item.id}`}>
                <img
                  src={filesService.getFileUrl(item.logo)}
                  className="transfer-popup__icon"
                  alt={item.currency}
                />
                {`${item.title} | ${item.currency}`}
              </option>
            ))}
          </GVFormikField>
          <StatisticItem label={t(`transfer.available${destinationType}To`)}>
            {`${formattedAvailableDestinationItem} ${
              selectedDestinationItem.currency
            }`}
          </StatisticItem>
          <div className="dialog-field">
            <InputAmountField
              name={FIELDS.amount}
              label={t("transfer.amount")}
              currency={selectedSourceItem.currency}
              setMax={setMaxAmount}
              isAllow={this.isAllow}
              emptyInit
            />
          </div>
          {!!values.amount && (
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
          <div className="dialog__info">{t("transfer.info")}</div>
        </div>
      </form>
    );
  }
}

const TransferForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, TransferFormValues>({
    displayName: "transfer",
    mapPropsToValues: props => {
      const {
        destinationType,
        sourceType,
        sourceItems,
        destinationItems,
        currentItem,
        currentItemContainer
      } = props;
      let sourceId, destinationId;
      if (currentItemContainer === TRANSFER_CONTAINER.DESTINATION) {
        destinationId = currentItem.id;
        const sourceItemWithoutCurrent = service.getDestinationItems(
          sourceItems,
          destinationId
        );
        sourceId = sourceItemWithoutCurrent[0].id;
      } else {
        sourceId = currentItem.id;
        const destinationItemWithoutCurrent = service.getDestinationItems(
          destinationItems,
          sourceId
        );
        destinationId = destinationItemWithoutCurrent[0].id;
      }
      return {
        [FIELDS.sourceId]: sourceId,
        [FIELDS.amount]: 0,
        [FIELDS.destinationId]: destinationId,
        [FIELDS.sourceType]: sourceType,
        [FIELDS.destinationType]: destinationType,
        [FIELDS.transferAll]: false
      };
    },
    validationSchema: (props: Props) => {
      const { sourceItems, t } = props;
      return lazy(
        (values: TransferFormValues): Schema<any> => {
          const selectedSourceItem = service.getSelectedItem(
            sourceItems,
            values.sourceId
          );
          return object().shape({
            [FIELDS.amount]: number()
              .moreThan(0, t("transfer.validation.amount-is-zero"))
              .max(
                +formatCurrencyValue(
                  selectedSourceItem.available,
                  selectedSourceItem.currency
                ),
                t("transfer.validation.amount-more-than-available")
              )
          });
        }
      );
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      const { amount, sourceId } = values;

      const transferAll = service.getTransferAll(
        { amount, sourceId },
        props.sourceItems
      );
      props.onSubmit({ ...values, transferAll }, setSubmitting);
    }
  })
)(_TransferForm);
export default TransferForm;

enum FIELDS {
  sourceId = "sourceId",
  sourceType = "sourceType",
  destinationId = "destinationId",
  destinationType = "destinationType",
  amount = "amount",
  transferAll = "transferAll"
}

interface OwnProps {
  onSubmit(values: TransferFormValues, setSubmitting: SetSubmittingType): void;
  currentItem: ItemType;
  sourceType: InternalTransferRequestSourceTypeEnum;
  destinationType: InternalTransferRequestSourceTypeEnum;
  sourceItems: ItemsType;
  destinationItems: ItemsType;
  errorMessage?: string;
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

export interface TransferFormValues extends InternalTransferRequest {}

type Props = InjectedTranslateProps &
  FormikProps<TransferFormValues> &
  OwnProps;
