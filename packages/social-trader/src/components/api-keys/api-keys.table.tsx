import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { Table } from "components/table/components";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { ExchangeCredentialsInfo } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { ApiKeysContext } from "./api-keys.context";
import { API_KEYS_TABLE_COLUMNS } from "./api-keys.helpers";
import { ApiKeysTableRow } from "./api-keys.table-row";
import { getApiKeys } from "./services/api-keys.service";

interface Props {
  id: string;
}

const _ApiKeysTable: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();

  const { tableKey } = useContext(ApiKeysContext);

  const { data, sendRequest } = useApiRequest<Array<ExchangeCredentialsInfo>>({
    name: "apiKeys",
    cache: true,
    request: () => getApiKeys(id)
  });

  useEffect(() => {
    sendRequest();
  }, [tableKey]);

  return (
    <Table
      title={t("api-keys:title")}
      items={data || []}
      columns={API_KEYS_TABLE_COLUMNS}
      renderHeader={column =>
        column.tooltip ? (
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.LEFT}
            render={() => (
              <TooltipContent>
                {t(`api-keys:tooltips.${column.name}`)}
              </TooltipContent>
            )}
          >
            <span>{t(`api-keys:columns.${column.name}`)}</span>
          </Tooltip>
        ) : (
          <span>{t(`api-keys:columns.${column.name}`)}</span>
        )
      }
      renderBodyRow={({
        id,
        apiKey,
        apiSecret,
        title,
        isIpRestrict,
        isTradingEnabled,
        allowedIps
      }: ExchangeCredentialsInfo) => (
        <ApiKeysTableRow
          key={id}
          id={id}
          allowedIps={allowedIps}
          apiKey={apiKey}
          apiSecret={apiSecret}
          title={title}
          ipRestrict={isIpRestrict}
          readonly={!isTradingEnabled}
        />
      )}
    />
  );
};

export const ApiKeysTable = React.memo(_ApiKeysTable);
