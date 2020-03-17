import { withBlurLoader } from "decorators/with-blur-loader";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { TagType } from "utils/types";

import { LIST_VIEW } from "../table.constants";
import {
  RenderBodyItemFuncType,
  UpdateItemsFuncType,
  UpdateRowFuncType
} from "./table.types";

const _TableBody: React.FC<ITableBodyExternalProps & ITableBodyInnerProps> = ({
  updateItems,
  data,
  renderBodyItem,
  view,
  updateRow
}) => (
  <TableItems
    data={data!}
    view={view}
    renderBodyItem={renderBodyItem}
    updateRow={updateRow}
    updateItems={updateItems}
  />
);
const TableBody = withBlurLoader(React.memo(_TableBody));

const _TableItems: React.FC<ITableItemsProps> = ({
  data,
  renderBodyItem,
  updateRow,
  updateItems
}) => (
  <>
    {data.map((item, idx: number) => (
      <React.Fragment key={item.id || idx}>
        {renderBodyItem(item, updateRow, updateItems)}
      </React.Fragment>
    ))}
  </>
);
const TableItems = React.memo(_TableItems);

const _EmptyMessage: React.FC<{ view: LIST_VIEW } & WithTranslation> = ({
  view,
  t
}) => {
  switch (view) {
    case LIST_VIEW.CARDS:
      return <div className="table-message">{t("table.no-items")}</div>;
    case LIST_VIEW.TABLE:
    default:
      return (
        <tbody>
          <tr>
            <td colSpan={11}>
              <div className="table-message">{t("table.no-items")}</div>
            </td>
          </tr>
        </tbody>
      );
  }
};
const EmptyMessage = translate()(React.memo(_EmptyMessage));

interface ITableItemsProps {
  data: any[];
  view: LIST_VIEW;
  renderBodyItem: RenderBodyItemFuncType;
  updateRow?: UpdateRowFuncType;
  updateItems?: UpdateItemsFuncType;
}

interface ITableBodyInnerProps {
  renderBodyItem: RenderBodyItemFuncType;
  tag: TagType;
  view: LIST_VIEW;
}

export interface ITableBodyContainerExternalProps {
  loaderData?: any[];
  updateRow?: UpdateRowFuncType;
  updateItems?: UpdateItemsFuncType;
  items?: any[];
  isPending?: boolean;
  className?: string;
}

export interface ITableBodyExternalProps {
  updateRow?: UpdateRowFuncType;
  updateItems?: UpdateItemsFuncType;
  data?: any[];
  isPending?: boolean;
  className?: string;
}

const _TableBodyContainer: React.FC<ITableBodyContainerExternalProps &
  ITableBodyInnerProps> = props => {
  const { items, view, loaderData, tag } = props;
  return (
    (items && items.length === 0 && <EmptyMessage view={view} />) || (
      <TableBody {...props} loaderData={loaderData!} data={items} tag={tag} />
    )
  );
};
const TableBodyContainer = React.memo(_TableBodyContainer);
export default TableBodyContainer;
