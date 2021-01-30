import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { ExchangeCredentials } from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  data: ExchangeCredentials;
}

const _AddApiKeyCredentials: React.FC<Props> = ({ data }) => {
  const [t] = useTranslation();
  return (
    <>
      <Row wide onlyOffset>
        <Row>
          <RowItem wide>
            <LabeledValue label={t("api-keys:key-dialog.API-key")}>
              <Text sizeValue={"10"}>{data.apiKey}</Text>
            </LabeledValue>
          </RowItem>
        </Row>
        <Row>
          <CopyButton value={data.apiKey} />
        </Row>
      </Row>
      <Row wide onlyOffset>
        <Row>
          <RowItem wide>
            <LabeledValue label={t("api-keys:key-dialog.API-secret")}>
              <Text sizeValue={"10"}>{data.apiSecret}</Text>
            </LabeledValue>
          </RowItem>
        </Row>
        <Row>
          <CopyButton value={data.apiSecret} />
        </Row>
      </Row>
      <Row>
        <Text muted>{t("api-keys:key-dialog.create-text")}</Text>
      </Row>
    </>
  );
};

export const AddApiKeyCredentials = React.memo(_AddApiKeyCredentials);
