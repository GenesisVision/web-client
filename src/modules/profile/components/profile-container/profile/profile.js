import React, { Component } from "react";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    const { isFetching, profile } = this.props;
    if (!profile || isFetching) return null;

    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="rounded img-fluid"
          />
        </div>
        <div className="col-sm-6 col-md-8">
          <h1>{profile.name}</h1>
          <div>Birthday: {profile.birthday}</div>
          <div className="mb-4">Passport No: {profile.passportNo}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
