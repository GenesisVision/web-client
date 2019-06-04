import "./global-search-input.scss";

import * as React from "react";
import GVTextField from "shared/components/gv-text-field";
import SearchIcon from "shared/components/icon/search-icon/search-icon";

interface Props {
  onChange(value: string): void;
  query: string;
}

class GlobalSearchInput extends React.PureComponent<Props> {
  handleOnChange = (event: React.ChangeEvent<any>) => {
    const { onChange } = this.props;
    onChange(event.target.value);
  };

  render() {
    const { query } = this.props;
    return (
      <div className="global-search-input">
        {/*
      //@ts-ignore TODO сделать фикс GVTextField*/}
        <GVTextField
          name="queryValue"
          wrapperClassName="global-search-input__wrapper"
          placeholder="Search for programs or funds or managers"
          autoComplete="off"
          adornment={<SearchIcon primary />}
          adornmentPosition="start"
          value={query}
          onChange={this.handleOnChange}
          autoFocus
        />
      </div>
    );
  }
}

export default GlobalSearchInput;
