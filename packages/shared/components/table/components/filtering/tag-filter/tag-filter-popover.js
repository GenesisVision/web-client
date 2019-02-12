import React, { Component } from "react";
import { translate } from "react-i18next";
import { GVTextField } from "gv-react-components";
import { SearchIcon } from "shared/components/icon/search-icon";

class TagFilterPopover extends Component {
  state = {
    choosed: this.props.value,
    filteredTags: this.props.values
  };
  componentDidMount() {
    this.setState({
      filteredTags: this.removeChoosed(this.props.values)
    });
  }
  search = e => {
    this.setState({
      filteredTags: this.removeChoosed(
        this.filtering(e.target.value, this.props.values)
      )
    });
  };
  removeChoosed = arr =>
    arr.filter(
      item => !this.state.choosed.find(choose => item.name === choose)
    );
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
    const { choosed } = this.state;
    if (choosed.includes(value)) return;
    const newValue = [...choosed, value];
    this.setState({ choosed: newValue });
    this.props.changeFilter(newValue);
  };
  handleAdd = value => e => {
    this.props.handleAdd(value);
  };

  render() {
    const { t } = this.props;
    const { filteredTags } = this.state;
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
          {filteredTags.map(tag => (
            <div
              key={tag.name}
              className="tag-filter__tag"
              onClick={this.handleSubmit(tag.name)}
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default translate()(TagFilterPopover);
