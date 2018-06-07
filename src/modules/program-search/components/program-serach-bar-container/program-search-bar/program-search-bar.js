import PropTypes from "prop-types";
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

  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  canClearQuery = () => {
    return this.props.query && this.props.query.length > 0;
  };

  clearQuery = () => {
    this.props.onChange("");
  };

  render() {
    const { query } = this.props;
    return (
      <div className="program-search-bar">
        <i
          className="fas fa-search program-search-bar__icon"
          onClick={this.handleSearch}
        />
        <input
          type="text"
          className="program-search-bar__input"
          value={query}
          onChange={this.handleChange}
          ref={this.inputRef}
          placeholder="Search here"
        />
        {this.canClearQuery() && (
          <i
            className="fas fa-times program-search-bar__icon program-search-bar__icon--clear"
            onClick={this.clearQuery}
          />
        )}
      </div>
    );
  }
}

ProgramSearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ProgramSearchBar;
