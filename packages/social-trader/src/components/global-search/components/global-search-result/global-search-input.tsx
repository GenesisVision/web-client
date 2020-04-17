import GVButton from "components/gv-button";
import GVTextField from "components/gv-text-field";
import { CloseIcon } from "components/icon/close-icon";
import SearchIcon from "components/icon/search-icon/search-icon";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React, { useCallback } from "react";

export const SearchInputField: React.FC<{
  onBlur?: VoidFunction;
  value: string;
  onCancel?: VoidFunction;
  onChange: (event: React.ChangeEvent<any>) => void;
}> = ({ value, onChange, onCancel, onBlur }) => {
  return (
    <Row wide>
      <RowItem wide>
        <GVTextField
          onBlur={onBlur}
          wide
          noMargin
          name="queryValue"
          placeholder="Search"
          autoComplete="off"
          adornment={<SearchIcon primary />}
          adornmentPosition="start"
          value={value}
          onChange={onChange}
          autoFocus
        />
      </RowItem>
      <GVButton
        noPadding
        variant="text"
        color="secondary"
        className="global-search__cancel-button"
        onClick={onCancel}
      >
        <CloseIcon />
      </GVButton>
    </Row>
  );
};

const GlobalSearchInput: React.FC<Props> = React.memo(({ query, onChange }) => {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<any>) => onChange(event.target.value),
    [onChange]
  );

  return (
    <div className="global-search-input">
      {/*
      //@ts-ignore TODO сделать фикс GVTextField*/}
      <SearchInputField value={query} onChange={handleOnChange} />
    </div>
  );
});

interface Props {
  onChange(value: string): void;
  query: string;
}

export default GlobalSearchInput;
