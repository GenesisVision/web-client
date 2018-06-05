import React, { PureComponent } from "react";
import "./program-search-bar.css";

class ProgramSearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleSearch = () => {
    console.log(this.inputRef);
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div className="program-search-bar">
        <i
          className="fas fa-search program-search-bar__icon"
          onClick={this.handleSearch}
        />
        <input
          type="text"
          className="program-search-bar__input"
          ref={this.inputRef}
          placeholder="Search here"
        />
        <i className="fas fa-times program-search-bar__icon" />
      </div>
    );
  }
}

export default ProgramSearchBar;
