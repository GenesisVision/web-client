import { Link } from "react-router-dom";
import React, { Component } from "react";

import { PROFILE_EDIT_ROUTE } from "../../../profile.constants";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    const { isFetching, profile } = this.props;
    if (!profile || isFetching) return null;
    const fullName = `${profile.firstName || "FirstName"} ${profile.lastName ||
      "LastName"}`;
    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <img
            src={profile.avatar || "http://via.placeholder.com/350x650"}
            alt={fullName}
            className="rounded img-fluid"
          />
        </div>
        <div className="col-sm-6 col-md-8">
          <h1>{fullName}</h1>
          <div>Birthday: {profile.birthday.toDateString()}</div>
          <div className="mb-4">Passport No: {profile.documentNumber}</div>
          <Link to={PROFILE_EDIT_ROUTE} className="btn btn-primary">
            Edit Profile
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
