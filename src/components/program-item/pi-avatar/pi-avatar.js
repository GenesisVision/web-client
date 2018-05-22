import React, { Component } from "react";
import classnames from "classnames";
import ProgramAvatar from "../../program-avatar/program-avatar";

import "./pi-avatar.css";

class PIAvatar extends Component {
  render() {
    const { url, level, isTournament, className } = this.props;
    return (
      <div className={classnames("pi-avatar", className)}>
        {isTournament && (
          <span className="pi-avatar__label pi-avatar__tournament">
            <i className="fas fa-trophy" />
          </span>
        )}
        <ProgramAvatar className="pi-avatar__image" url={url} />
        <span className="pi-avatar__label pi-avatar__level">{level}</span>
      </div>
    );
  }
}

export default PIAvatar;
