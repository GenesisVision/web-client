import { Center } from "components/center/center";
import GVTabs from "components/gv-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import GVTextField from "components/gv-text-field";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { RowItem } from "components/row-item/row-item";
import { FilterTitle } from "components/table/components/filtering/filter-title";
import useTab from "hooks/tab.hook";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface Props<T extends TileFilterPopoverItemType> {
  tabs?: string[];
  tabCountField?: string;
  header: string;
  placeholder: string;
  values: T[];
  changeFilter: (value: string) => void;
  children: (
    items: T[],
    select: (id: string) => void,
    tab?: string
  ) => React.ReactNode;
}

export type TileFilterPopoverItemType = {
  id: string;
  searchValue: string;
};

const Header = styled(Center)`
  align-items: flex-end;
  min-width: 200px;
`;

const _TileFilterPopover: React.FC<Props<any>> = ({
  tabCountField,
  tabs,
  changeFilter,
  values,
  header,
  placeholder,
  children
}) => {
  const { tab, setTab } = useTab(tabs ? tabs[0] : "");
  const [filteredItems, setFilteredItems] = useState(values);

  useEffect(() => {
    setFilteredItems(values);
  }, [values]);

  const findItem = useCallback((searchValue: string, array: any[]) => {
    if (!searchValue) return array;
    return array.filter(
      item => ~item.searchValue.toUpperCase().indexOf(searchValue.toUpperCase())
    );
  }, []);

  const search = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilteredItems(findItem(e.target.value, values));
    },
    [values]
  );

  const handleClick = useCallback(
    (id: string) => {
      if (changeFilter) changeFilter(id);
    },
    [changeFilter]
  );

  return (
    <PopoverContentCardBlock>
      <FilterTitle>{header}</FilterTitle>
      <Header>
        {tabs && (
          <RowItem>
            <GVTabs value={tab} onChange={setTab}>
              {tabs.map(tab => (
                <GVTab
                  count={
                    tabCountField
                      ? filteredItems.filter(
                        item => item[tabCountField] === tab
                      ).length
                      : undefined
                  }
                  value={tab}
                  label={tab}
                />
              ))}
            </GVTabs>
          </RowItem>
        )}
        <RowItem>
          <GVTextField
            name="queryValue"
            placeholder={placeholder}
            autoComplete="off"
            adornmentPosition="start"
            onChange={search}
          />
        </RowItem>
      </Header>
      {children(filteredItems, handleClick, tab)}
    </PopoverContentCardBlock>
  );
};

const TileFilterPopover = React.memo(_TileFilterPopover);
export default TileFilterPopover;
