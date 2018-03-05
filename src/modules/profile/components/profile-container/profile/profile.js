// @flow
import { Link } from "react-router-dom";
import React from "react";

import { IProfile } from "./profile.type";
import { PROFILE_EDIT_ROUTE } from "../../../profile.constants";

const Profile = ({ profile }: IProfile) => {
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
        <div>Username: {profile.userName}</div>
        <div>Birthday: {profile.birthday.toDateString()}</div>
        <div>Passport No: {profile.documentNumber}</div>
        <div className="mb-4" />
        <Link to={PROFILE_EDIT_ROUTE} className="btn btn-primary">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
