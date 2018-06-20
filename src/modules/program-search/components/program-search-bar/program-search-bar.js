import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import "./program-search-bar.css";

class ProgramSearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.isFocused) {
      this.inputRef.current.focus();
    } else {
      this.inputRef.current.blur();
    }
  }

  handleSearch = () => {
    this.props.toggleFocus(true);
  };

  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.props.toggleFocus(false);
    }
  };

  handleFocus = () => {
    if (!this.props.isFocused) {
      this.props.toggleFocus(true);
    }
  };

  handleBlur = () => {
    if (this.props.isFocused) {
      this.props.toggleFocus(false);
    }
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
          title="Search"
        />
        <input
          type="text"
          className="program-search-bar__input"
          value={query}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={this.inputRef}
          placeholder="Program search"
        />
        {this.canClearQuery() && (
          <i
            className="fas fa-times program-search-bar__icon program-search-bar__icon--clear"
            onClick={this.clearQuery}
            title="Clear input"
          />
        )}
      </div>
    );
  }
}

ProgramSearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleFocus: PropTypes.func.isRequired
};

export default ProgramSearchBar;
