import React, { Component } from "react";
import { translate } from "react-i18next";
import { GVTextField } from "gv-react-components";
import { SearchIcon } from "shared/components/icon/search-icon";

class TagFilterPopover extends Component {
  state = {
    chooses: this.props.value,
    filteredTags: this.props.values
    // chooses: this.props.value
  };

  search = e => {
    this.setState({
      filteredAssets: this.filtering(e.target.value, this.props.values)
    });
  };
  filtering = (searchValue, array) => {
    return searchValue
      ? array.filter(
          item => ~item.name.toLowerCase().indexOf(searchValue.toLowerCase())
        )
      : array;
  };
  handleChange = e => {
    this.setState({ value: e });
  };
  handleSubmit = value => e => {
    const { chooses } = this.state;
    if (chooses.includes(value)) return;
    const newValue = [...chooses, value];
    this.setState({ chooses: newValue });
    this.props.changeFilter(newValue);
  };
  handleAdd = value => e => {
    this.props.handleAdd(value);
  };

  render() {
    const { t, values } = this.props;
    return (
      <div className="tag-filter">
        <div className="tag-filter__title">Add tag</div>
        <div className="tag-filter__search">
          <GVTextField
            name="queryValue"
            wrapperClassName="popover-add__search-input"
            placeholder="Search for tags"
            autoComplete="off"
            adornment={<SearchIcon secondary />}
            adornmentPosition="start"
            onChange={this.search}
            autoFocus
          />
        </div>
        <div className="tag-filter__tags">
          {values.map(value => (
            <div
              key={value.name}
              classname="tag-filter__tag"
              onClick={this.handleSubmit(value.name)}
            >
              {value.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default translate()(TagFilterPopover);
