import { GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import TagProgramItem from "shared/components/tag-program/tag-program-item";
import { ProgramTag } from "gv-api-web";

interface ITagFilterPopoverState {
  choosed: ProgramTag[];
  filteredTags: ProgramTag[];
}

export interface ITagFilterPopoverProps {
  value: ProgramTag[];
  values: ProgramTag[];
  changeFilter(value: any[]): void;
}
class TagFilterPopover extends React.Component<
  ITagFilterPopoverProps,
  ITagFilterPopoverState
> {
  constructor(props: ITagFilterPopoverProps) {
    super(props);
    const { value, values } = this.props;
    this.state = {
      choosed: value,
      filteredTags: values
    };
  }
  componentDidMount() {
    this.setState({
      filteredTags: this.removeChoosed(this.props.values, this.state.choosed)
    });
  }
  search = (e: any) => {
    this.setState({
      filteredTags: this.removeChoosed(
        this.filtering(e.target.value, this.props.values),
        this.state.choosed
      )
    });
  };
  removeChoosed = (arr: any[], choosedArr: any[]): any[] =>
    arr.filter(
      item => !choosedArr.find((choose: any) => item.name === choose.name)
    );
  filtering = (searchValue: string, array: any[]) => {
    return searchValue
      ? array.filter(
          (item: { [key: string]: string }) =>
            ~item.name.toLowerCase().indexOf(searchValue.toLowerCase())
        )
      : array;
  };
  handleSubmit = (value: ProgramTag) => () => {
    const { choosed } = this.state;
    if (choosed.includes(value)) return;
    const newValue = [...choosed, value];
    this.setState({ choosed: newValue });
    this.props.changeFilter(newValue);
  };

  render() {
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
            adornmentPosition="start"
            onChange={this.search}
            autoFocus
          />
        </div>
        <div className="tag-filter__tags-list">
          {filteredTags.map(tag => (
            <div
              key={tag.name}
              className="tag-filter__tag"
              onClick={this.handleSubmit(tag)}
            >
              <TagProgramItem name={tag.name} color={tag.color} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default translate()(TagFilterPopover);
