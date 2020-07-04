import clsx from "clsx";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import { Text } from "components/text/text";
import React from "react";
import { useTranslation } from "react-i18next";
import { Sizeable } from "utils/types";

import styles from "./trade-table.module.scss";

interface Props extends Sizeable {
  className?: string;
  loaderData?: any[];
  isPending?: boolean;
  items?: any[];
  columns: SortingColumn[];
  renderHeaderCell: (column: SortingColumn) => JSX.Element;
  renderRow: (item: any, i: number) => JSX.Element;
}

const _TradeTable: React.FC<Props> = ({
  className,
  loaderData,
  isPending,
  size = "middle",
  items,
  columns,
  renderHeaderCell,
  renderRow
}) => {
  const [t] = useTranslation();
  const renderLoading = () =>
    loaderData ? <>{loaderData.map(renderRow)}</> : null;
  const renderItems = () =>
    items?.length ? (
      <>{items.map(renderRow)}</>
    ) : (
      <tr>
        <td colSpan={11}>
          <div className={styles["trade-table__empty-message"]}>
            <Text muted>{t("table.no-items")}</Text>
          </div>
        </td>
      </tr>
    );
  return (
    <>
      <div className={clsx(styles["trade-table__header-container"])}>
        <table
          className={clsx(styles["trade-table"], className, {
            [styles["trade-table--small"]]: size === "small",
            [styles["trade-table--middle"]]: size === "middle"
          })}
        >
          <thead>{columns.map(renderHeaderCell)}</thead>
        </table>
      </div>
      <div className={clsx(styles["trade-table__items-container"])}>
        <table
          className={clsx(
            styles["trade-table"],
            styles["trade-table--items"],
            className,
            {
              [styles["trade-table--small"]]: size === "small",
              [styles["trade-table--middle"]]: size === "middle"
            }
          )}
        >
          <tbody>{!items || isPending ? renderLoading() : renderItems()}</tbody>
        </table>
      </div>
    </>
  );
};

export const TradeTable = React.memo(_TradeTable);
