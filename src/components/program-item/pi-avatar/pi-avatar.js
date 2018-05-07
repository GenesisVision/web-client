import React, { Component } from "react";
import ProgramAvatar from "../../program-avatar/program-avatar";

import "./pi-avatar.css";

export default class PIAvatar extends Component {
  render() {
    const { url, level } = this.props;
    return (
      <div className="pi-avatar">
        {true && (
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
