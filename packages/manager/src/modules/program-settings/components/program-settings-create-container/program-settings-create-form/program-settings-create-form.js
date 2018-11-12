import "./program-settings-create-form.css";

import { Field, withFormik } from "formik";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";

import Button from "shared/components/button/button";
import FormError from "shared/components/form/form-error/form-error";
import GVDatePicker from "shared/components/form/gv-datepicker/gv-datepicker";
import GVSelect from "shared/components/form/gv-select/gv-select";
import GVTextarea from "shared/components/form/gv-textarea/gv-textarea";
import InputFile from "shared/components/form/input-file/input-file";
import InputText from "shared/components/form/input-text/input-text";
import managerAvatar from "shared/media/manager-avatar.png";
import programSettingsCreateFormValidationSchema from "./program-settings-create-form.validators";

const ProgramCreateForm = ({
  t,
  programForm,
  isSubmitting,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
  error,
  values,
  touched,
  errors
}) => {
  const brokerOptions = programForm.brokers.map(x => ({
    value: x.id,
    label: `${x.name} (${x.host})`
  }));
  const periodOptions = [1, 2, 3, 5, 7, 10, 14].map(x => ({
    value: x,
    label: `${x} days`
  }));
  const getLeverages = brokerServerId => {
    const broker = programForm.brokers.find(x => x.id === brokerServerId);
    if (!broker) return [];
    return broker.leverages.map(x => ({
      value: x,
      label: x
    }));
  };

  return (
    <form
      id="createProgramForm"
      onSubmit={handleSubmit}
      className="create-program-form"
      noValidate
    >
      <div className="create-program-form__header">Create Program</div>
      <div className="create-program-form__program-detail">
        <div className="create-program-form__program-description">
          <Field
            name="logo"
            label="Program Logo"
            className="create-program-form__program-image"
            component={InputFile}
            defaultImage={managerAvatar}
          />
          <Field
            material
            name="title"
            label="Program Title"
            component={InputText}
          />
          <Field
            name="description"
            label="Description"
            component={GVTextarea}
          />
        </div>
        <div className="create-program-form__program-settings">
          <Field
            material
            type="password"
            name="tradePlatformPassword"
            label="Trading Account Password"
            component={InputText}
          />
          <Field
            material
            type="password"
            name="confirmTradePlatformPassword"
            label="Confirm Trading Account Password"
            component={InputText}
          />
          <Field
            material
            name="brokerTradeServerId"
            value={values.brokerTradeServerId}
            onBlur={setFieldTouched}
            component={GVSelect}
            options={brokerOptions}
            clearable={false}
            label="Broker Server"
            placeholder=" "
          />
          <Field
            material
            disabled={!values.brokerTradeServerId}
            name="leverage"
            value={values.leverage}
            onBlur={setFieldTouched}
            component={GVSelect}
            options={getLeverages(values.brokerTradeServerId)}
            clearable={false}
            label={t("program-settings.leverage.text") + " %"}
            helpMessage={t("program-settings.leverage.tooltip")}
            placeholder=" "
          />
          <Field
            material
            name="period"
            value={values.period}
            onBlur={setFieldTouched}
            component={GVSelect}
            options={periodOptions}
            clearable={false}
            label={t("program-settings.period-length.text") + " %"}
            helpMessage={t("program-settings.period-length.tooltip")}
            placeholder=" "
          />
          <Field
            material
            selected={values.dateFrom}
            name="dateFrom"
            minDate={moment()}
            showTimeSelect
            dateFormat="LLL"
            component={GVDatePicker}
            label={t("program-settings.start-date.text")}
            helpMessage={t("program-settings.start-date.tooltip")}
          />
          <Field
            material
            name="depositAmount"
            label={t("program-settings.deposit-amount.text")}
            helpMessage={t("program-settings.deposit-amount.tooltip")}
            component={InputText}
          />
          <div className="create-program-form__couple-field">
            <Field
              material
              name="feeSuccess"
              label={t("program-settings.success-fee.text") + " %"}
              helpMessage={t("program-settings.success-fee.tooltip")}
              component={InputText}
            />
            <Field
              material
              name="feeManagement"
              label={t("program-settings.management-fee.text") + " %"}
              helpMessage={t("program-settings.management-fee.tooltip")}
              component={InputText}
            />
          </div>
          <div className="create-program-form__couple-field">
            <Field
              material
              name="tokenName"
              label={t("program-settings.token-name.text")}
              helpMessage={t("program-settings.token-name.tooltip")}
              component={InputText}
            />
            <Field
              material
              name="tokenSymbol"
              label={t("program-settings.token-symbol.text")}
              helpMessage={t("program-settings.token-symbol.tooltip")}
              component={InputText}
            />
          </div>
        </div>
      </div>
      <FormError error={error} />
      <Button
        label="Create Program"
        type="submit"
        id="createProgramSubmit"
        disabled={isSubmitting}
        primary
        className="create-program-form__submit"
      />
    </form>
  );
};

export default translate()(
  withFormik({
    displayName: "programCreateForm",
    mapPropsToValues: () => ({
      logo: {
        src: managerAvatar,
        filename: "image.png",
        filetype: "image/png",
        cropped: null
      },
      tradePlatformPassword: "",
      confirmTradePlatformPassword: "",
      brokerTradeServerId: "",
      leverage: "",
      title: "",
      description: "",
      depositAmount: "",
      tokenName: "",
      tokenSymbol: "",
      period: "",
      dateFrom: null,
      feeSuccess: "",
      feeManagement: ""
    }),
    validationSchema: programSettingsCreateFormValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })(ProgramCreateForm)
);
