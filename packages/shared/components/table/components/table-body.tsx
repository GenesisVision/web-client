import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { LIST_VIEW } from "../table.constants";
import TableLoader from "./table-loader";
import { UpdateRowFuncType } from "./table.types";

interface ITableBodyProps {
  children?(
    x: any,
    updateRow?: UpdateRowFuncType,
    updateItems?: () => void
  ): JSX.Element;
  updateRow?: UpdateRowFuncType;
  updateItems?(): void;
  items: any[];
  tag: React.ComponentType<{ className?: string }> | string;
  isPending?: boolean;
  view: LIST_VIEW;
  className?: string;
}

const TableBody: React.FC<ITableBodyProps & InjectedTranslateProps> = ({
  updateItems,
  t,
  items,
  children,
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
    return items.map((x, idx: number) => (
      <React.Fragment key={x.id || idx}>
        {children && children(x, updateRow, updateItems)}
      </React.Fragment>
    ));
  };

  return <Tag className={className}>{renderItems()}</Tag>;
};

export default translate()(TableBody);
