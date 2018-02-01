// @flow
import { Link } from "react-router-dom";
import React, { Component } from "react";

import { IProfileFullProps } from "./profile.type";

import { PROFILE_EDIT_ROUTE } from "../../../profile.constants";

class Profile extends Component<IProfileFullProps> {
  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    const { isPending, profile } = this.props;
    if (!profile || isPending) return null;
    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <img
            src={profile.avatar}
            alt={profile.fullName}
            className="rounded img-fluid"
          />
        </div>
        <div className="col-sm-6 col-md-8">
          <h1>{profile.fullName}</h1>
          <h2>Balance: {profile.balance}</h2>
          <div>Birthday: {profile.birthday.toDateString()}</div>
          <div>Passport No: {profile.documentNumber}</div>
          <div className="mb-4" />
          <Link to={PROFILE_EDIT_ROUTE} className="btn btn-primary">
            Edit Profile
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
