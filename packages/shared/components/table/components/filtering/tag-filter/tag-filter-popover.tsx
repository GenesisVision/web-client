import { ProgramTag } from "gv-api-web";
import * as React from "react";
import GVTextField from "shared/components/gv-text-field";
import TagProgramItem from "shared/components/tag-program/tag-program-item";

interface ITagFilterPopoverState {
  selected: ProgramTag[];
  filteredTags: ProgramTag[];
}

export interface ITagFilterPopoverProps {
  value: ProgramTag[];
  values: ProgramTag[];
  changeFilter(value: ProgramTag[]): void;
}
class TagFilterPopover extends React.PureComponent<
  ITagFilterPopoverProps,
  ITagFilterPopoverState
> {
  constructor(props: ITagFilterPopoverProps) {
    super(props);
    const { value, values } = this.props;
    this.state = {
      selected: value,
      filteredTags: values
    };
  }
  componentDidMount() {
    this.setState({
      filteredTags: this.removeSelected(this.props.values, this.state.selected)
    });
  }
  search = (e: React.ChangeEvent<any>) => {
    this.setState({
      filteredTags: this.removeSelected(
        this.filtering(e.target.value, this.props.values),
        this.state.selected
      )
    });
  };
  removeSelected = (
    arr: ProgramTag[],
    selectedArr: ProgramTag[]
  ): ProgramTag[] =>
    arr.filter(item => !selectedArr.find(select => item.name === select.name));
  filtering = (searchValue: string, array: ProgramTag[]): ProgramTag[] =>
    searchValue
      ? array.filter(
          (item: ProgramTag) =>
            ~item.name.toLowerCase().indexOf(searchValue.toLowerCase())
        )
      : array;

  handleSubmit = (value: ProgramTag) => () => {
    const { selected } = this.state;
    if (selected.includes(value)) return;
    const newValue = [...selected, value];
    this.setState({ selected: newValue });
    this.props.changeFilter(newValue);
  };

  render() {
    const { filteredTags } = this.state;
    return (
      <div className="tag-filter">
        <div className="tag-filter__title">Add tag</div>
        <div className="tag-filter__search">
          {/*
          //@ts-ignore*/}
          <GVTextField
            name="queryValue"
            wrapperClassName="popover-add__search-input"
            placeholder="Search for tags"
            autoComplete="off"
            adornmentPosition="start"
            onChange={this.search}
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

export default TagFilterPopover;
