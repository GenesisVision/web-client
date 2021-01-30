import { DeleteApiKeyButton } from "components/api-keys/api-key/delete-api-key/delete-api-key.button";
import { EditApiKeyButton } from "components/api-keys/api-key/edit-api-key/edit-api-key.button";
import { IApiKeyFormValues } from "components/api-keys/api-key/form/api-key.helpers";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { ExchangeCredentialsIpInfo } from "gv-api-web";
import CopyButton from "modules/copy-button/copy-button";
import React from "react";

interface Props {
  id: string;
  allowedIps: Array<ExchangeCredentialsIpInfo>;
  apiKey: string;
  apiSecret: string;
  title: string;
  ipRestrict: boolean;
  readonly: boolean;
}

const _ApiKeysTableRow: React.FC<Props> = ({
  id,
  allowedIps,
  apiKey,
  apiSecret,
  title,
  ipRestrict,
  readonly
}) => {
  const defaultValues: Partial<IApiKeyFormValues> = {
    isIpRestrict: ipRestrict,
    allowedIps: allowedIps.map(({ ip }) => ip),
    isTradingEnabled: readonly,
    id
  };
  const formattedApiKey = `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`;
  return (
    <TableRow>
      <TableCell>{title}</TableCell>
      <TableCell>
        <Row>
          <RowItem>{formattedApiKey}</RowItem>
          <RowItem>
            <CopyButton value={apiKey} />
          </RowItem>
        </Row>
      </TableCell>
      <TableCell>{apiSecret}</TableCell>
      <TableCell>{readonly ? "✔" : "—"}</TableCell>
      <TableCell>{ipRestrict ? "✔" : "—"}</TableCell>
      <TableCell>
        <Row>
          <RowItem>
            <EditApiKeyButton defaultValues={defaultValues} />
          </RowItem>
          <RowItem>
            <DeleteApiKeyButton apiKey={apiKey} id={id} title={title} />
          </RowItem>
        </Row>
      </TableCell>
    </TableRow>
  );
};

export const ApiKeysTableRow = React.memo(_ApiKeysTableRow);
