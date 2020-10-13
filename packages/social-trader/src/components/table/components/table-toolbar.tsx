import { CardsIcon } from "components/icon/cards-icon";
import { TableIcon } from "components/icon/table-icon";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import SortingFilter from "components/table/components/sorting/sorting-filter/sorting-filter";
import React, { useCallback } from "react";
import styled from "styled-components";
import { adaptiveMargin, horizontalPaddings } from "utils/style/mixins";
import { $paddingSmall } from "utils/style/sizes";

import { LIST_VIEW } from "../table.constants";
import { FilteringType, SortingColumn } from "./filtering/filter.type";
import {
  RenderFiltersFuncType,
  RenderSortingFuncType,
  UpdateFilterFunc,
  UpdateSortingFuncType
} from "./table.types";

const $viewSvgSize = 15;

const TableToolbarItem = RowItem;
const TableTitle = styled.h3`
  padding: 0;
  justify-self: flex-start;
  white-space: nowrap;
`;
const TableToolbarContainer = styled(Row)`
  width: 100%;
  justify-content: space-between;
  ${horizontalPaddings($paddingSmall)};
`;
const TableToggle = styled(Row)`
  justify-content: space-between;
`;
const TableToggleIcon = styled.div`
  cursor: pointer;
  line-height: 0;
  width: ${$viewSvgSize / 1.2}px;
  height: 18px;
  &:not(:last-child) {
    ${adaptiveMargin("right", $viewSvgSize * 2)};
  }
`;

const _TableToolbar: React.FC<ITableToolbarExternalProps &
  ITableToolbarInnerProps> = ({
  onChange,
  disableTitle,
  createButtonToolbar,
  exportButtonToolbar,
  title,
  renderMappings,
  renderFilters,
  updateFilter,
  filtering,
  view,
  columns,
  sorting,
  updateSorting,
  renderSorting,
  isViewSwitchEnabled,
  hide
}) => {
  const handleIconClick = useCallback(
    (view: LIST_VIEW) => () => {
      onChange(view);
    },
    [onChange]
  );

  if (hide) return null;

  const showTitle = title && !disableTitle;
  const showMappings = renderMappings && updateFilter && filtering;
  const showSortingFilter = view === LIST_VIEW.CARDS && sorting !== undefined;
  return (
    <TableToolbarContainer>
      {!showTitle && !showMappings && !showSortingFilter && <div />}
      {showTitle && (
        <TableToolbarItem>
          <TableTitle>{title}</TableTitle>
        </TableToolbarItem>
      )}
      {showMappings && (
        <TableToolbarItem>
          <Row wrap>{renderMappings!(updateFilter!, filtering!)}</Row>
        </TableToolbarItem>
      )}
      <TableToolbarItem>
        {showSortingFilter && (
          <SortingFilter
            sorting={sorting}
            columns={columns}
            updateSorting={updateSorting}
            renderValueText={renderSorting}
          />
        )}
      </TableToolbarItem>
      <RowItem>
        <Row>
          <RowItem>
            <Row wrap>
              {renderFilters &&
                updateFilter &&
                filtering &&
                renderFilters(updateFilter, filtering)}
              {createButtonToolbar && <RowItem>{createButtonToolbar}</RowItem>}
              {exportButtonToolbar && <RowItem>{exportButtonToolbar}</RowItem>}
            </Row>
          </RowItem>
          {isViewSwitchEnabled && (
            <RowItem>
              <TableToggle>
                <TableToggleIcon onClick={handleIconClick(LIST_VIEW.CARDS)}>
                  <CardsIcon primary={view === LIST_VIEW.CARDS} />
                </TableToggleIcon>
                <TableToggleIcon onClick={handleIconClick(LIST_VIEW.TABLE)}>
                  <TableIcon primary={view === LIST_VIEW.TABLE} />
                </TableToggleIcon>
              </TableToggle>
            </RowItem>
          )}
        </Row>
      </RowItem>
    </TableToolbarContainer>
  );
};

interface ITableToolbarInnerProps {
  view: LIST_VIEW;
  isViewSwitchEnabled: boolean;

  onChange(view: LIST_VIEW): any;

  exportButtonToolbar?: JSX.Element;
}

export interface ITableToolbarExternalProps {
  disableTitle?: boolean;
  createButtonToolbar?: JSX.Element;
  title?: JSX.Element | string;
  renderMappings?: RenderFiltersFuncType;
  renderFilters?: RenderFiltersFuncType;
  updateFilter?: UpdateFilterFunc;
  filtering?: FilteringType;
  columns?: SortingColumn[];
  sorting?: string;
  updateSorting?: UpdateSortingFuncType;
  renderSorting?: RenderSortingFuncType;
  hide?: boolean;
}

const TableToolbar = React.memo(_TableToolbar);
export default TableToolbar;
