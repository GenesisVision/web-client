import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import withLoader from "shared/decorators/with-loader";

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
      condition={!isPending && items !== null && items !== undefined}
      loader={<TableLoader view={view} />}
      items={items!}
      view={view}
      renderBodyItem={renderBodyItem}
      updateRow={updateRow}
      updateItems={updateItems}
    />
  </Tag>
);

const _TableItems: React.FC<ITableItemsProps> = ({
  items,
  view,
  renderBodyItem,
  updateRow,
  updateItems
}) =>
  (items.length === 0 && <EmptyMessage view={view} />) || (
    <>
      {items.map((item, idx: number) => (
        <React.Fragment key={item.id || idx}>
          {renderBodyItem(item, updateRow, updateItems)}
        </React.Fragment>
      ))}
    </>
  );
const TableItems = withLoader(React.memo(_TableItems));

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
  items: any[];
  view: LIST_VIEW;
  renderBodyItem: RenderBodyItemFuncType;
  updateRow?: UpdateRowFuncType;
  updateItems?: UpdateItemsFuncType;
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
