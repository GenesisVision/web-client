import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { LIST_VIEW } from "../table.constants";
import TableLoader from "./table-loader";
import {
  RenderBodyItemFuncType,
  UpdateItemsFuncType,
  UpdateRowFuncType
} from "./table.types";

const TableBody: React.FC<ITableBodyExternalProps & ITableBodyInnerProps> = ({
  updateItems,
  items,
  renderBodyItem,
  tag: Tag,
  className,
  isPending,
  view,
  updateRow
}) => (
  <Tag className={className}>
    <TableItems
      items={items}
      isPending={isPending}
      view={view}
      renderBodyItem={renderBodyItem}
      updateRow={updateRow}
      updateItems={updateItems}
    />
  </Tag>
);

const _TableItems: React.FC<ITableItemsProps> = ({
  items,
  isPending,
  view,
  renderBodyItem,
  updateRow,
  updateItems
}) => {
  if (isPending || items === null || items === undefined)
    return <TableLoader view={view} />;
  if (items.length === 0) return <EmptyMessage view={view} />;
  return (
    <>
      {items.map((item, idx: number) => (
        <React.Fragment key={item.id || idx}>
          {renderBodyItem(item, updateRow, updateItems)}
        </React.Fragment>
      ))}
    </>
  );
};
const TableItems = React.memo(_TableItems);

const _EmptyMessage: React.FC<{ view: LIST_VIEW } & InjectedTranslateProps> = ({
  view,
  t
}) => {
  switch (view) {
    case LIST_VIEW.CARDS:
      return <div className="message">{t("table.no-items")}</div>;
    case LIST_VIEW.TABLE:
    default:
      return (
        <tr>
          <td colSpan={11}>
            <div className="message">{t("table.no-items")}</div>
          </td>
        </tr>
      );
  }
};
const EmptyMessage = React.memo(translate()(_EmptyMessage));

interface ITableItemsProps {
  items?: any[];
  view: LIST_VIEW;
  renderBodyItem: RenderBodyItemFuncType;
  updateRow?: UpdateRowFuncType;
  updateItems?: UpdateItemsFuncType;
  isPending?: boolean;
}

interface ITableBodyInnerProps {
  renderBodyItem: RenderBodyItemFuncType;
  tag: React.ComponentType<{ className?: string }> | string;
  view: LIST_VIEW;
}

export interface ITableBodyExternalProps {
  updateRow?: UpdateRowFuncType;
  updateItems?: UpdateItemsFuncType;
  items?: any[];
  isPending?: boolean;
  className?: string;
}

export default React.memo(TableBody);
