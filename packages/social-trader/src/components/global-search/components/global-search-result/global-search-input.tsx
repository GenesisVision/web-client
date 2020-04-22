import GVButton from "components/gv-button";
import GVTextField from "components/gv-text-field";
import { CloseIcon } from "components/icon/close-icon";
import SearchIcon from "components/icon/search-icon/search-icon";
import React, { useCallback } from "react";

import "./global-search-input.scss";

export const SearchInputField: React.FC<{
  canClose?: boolean;
  onBlur?: VoidFunction;
  value: string;
  onCancel?: VoidFunction;
  onChange: (event: React.ChangeEvent<any>) => void;
}> = ({ canClose = true, value, onChange, onCancel, onBlur }) => {
  return (
    <div className="global-search__input-container">
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
      {canClose && (
        <GVButton
          noPadding
          variant="text"
          color="secondary"
          className="global-search__cancel-button"
          onClick={onCancel}
        >
          <CloseIcon />
        </GVButton>
      )}
    </div>
  );
};

const GlobalSearchInput: React.FC<Props> = React.memo(
  ({ canClose, query, onChange }) => {
    const handleOnChange = useCallback(
      (event: React.ChangeEvent<any>) => onChange(event.target.value),
      [onChange]
    );

    return (
      <div className="global-search-input">
        {/*
      //@ts-ignore TODO сделать фикс GVTextField*/}
        <SearchInputField
          canClose={canClose}
          value={query}
          onChange={handleOnChange}
        />
      </div>
    );
  }
);

interface Props {
  canClose?: boolean;
  onChange(value: string): void;
  query: string;
}

export default GlobalSearchInput;
