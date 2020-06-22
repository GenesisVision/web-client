import FormTextField from "components/assets/fields/form-text-field";
import { Row } from "components/row/row";
import React from "react";
import { useTranslation } from "react-i18next";

export enum CHANGE_BROKER_FORM_FIELDS {
  brokerAccountTypeId = "brokerAccountTypeId",
  leverage = "leverage"
}

export interface ChangeBrokerFormValues {
  [CHANGE_BROKER_FORM_FIELDS.brokerAccountTypeId]: string;
  [CHANGE_BROKER_FORM_FIELDS.leverage]: number;
}

interface IHuobiWarningProps {
  from: string;
  to: string;
  isSignalProgram: boolean;
}

export const HuobiWarning: React.FC<IHuobiWarningProps> = ({
  from,
  to,
  isSignalProgram
}) => {
  const [t] = useTranslation();
  return from === "Genesis Markets" && to === "Huobi" && isSignalProgram ? (
    <Row>
      <FormTextField accent>
        {t("asset-settings:broker.text-warning")}
      </FormTextField>
    </Row>
  ) : null;
};
