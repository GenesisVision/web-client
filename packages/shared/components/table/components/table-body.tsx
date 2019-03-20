import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { LIST_VIEW } from "../table.constants";
import TableLoader from "./table-loader";
import { RenderBodyItemFuncType, UpdateRowFuncType } from "./table.types";

interface ITableBodyInnerProps {
  renderBodyItem?: RenderBodyItemFuncType;
  tag: React.ComponentType<{ className?: string }> | string;
  view: LIST_VIEW;
}

export interface ITableBodyExternalProps {
  updateRow?: UpdateRowFuncType;
  updateItems?(): void;
  items?: any[];
  isPending?: boolean;
  className?: string;
}

const TableBody: React.FC<
  ITableBodyExternalProps & ITableBodyInnerProps & InjectedTranslateProps
> = ({
  updateItems,
  t,
  items,
  renderBodyItem,
  tag: Tag,
  className,
  isPending,
  view,
  updateRow
}) => {
  const setMessage = (message: string): JSX.Element => {
    switch (view) {
      case LIST_VIEW.CARDS:
        return <div className="message">{message}</div>;
      case LIST_VIEW.TABLE:
      default:
        return (
          <tr>
            <td colSpan={11}>
              <div className="message">{message}</div>
            </td>
          </tr>
        );
    }
  };

  const renderItems = (): JSX.Element[] | JSX.Element => {
    if (isPending || items === null || items === undefined)
      return <TableLoader view={view} />;
    if (items.length === 0) return setMessage(t("table.no-items"));
    return items.map((item, idx: number) => (
      <React.Fragment key={item.id || idx}>
        {renderBodyItem && renderBodyItem(item, updateRow, updateItems)}
      </React.Fragment>
    ));
  };

  return <Tag className={className}>{renderItems()}</Tag>;
};

export default translate()(TableBody);
