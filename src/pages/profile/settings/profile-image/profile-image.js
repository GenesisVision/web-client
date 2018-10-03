import "./profile-image.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import InputImage from "shared/components/form/input-image/input-image";
import UserIcon from "shared/media/user-avatar.svg";

class ProfileImage extends Component {
  state = {
    value: {
      src: "",
      isNew: false,
      isDefault: false
    }
  };

  constructor(props) {
    super(props);

    this.state.value.src = props.avatar;
  }

  onChange = (name, value) => {
    this.setState({ value: { ...value } });
    if (!value.cropped) return;

    this.props.onChange(value.cropped);
  };

  render() {
    const { onChange } = this;
    const { value } = this.state;
    const { t } = this.props;

    return (
      <div className="profile-image">
        <h3 className="profile-image__heading">
          {t("profile.settings.profile-image")}
        </h3>

        <div className="profile-image__requirements">
          {t("profile.settings.image-requirements")}
        </div>

        <InputImage
          defaultImage={UserIcon}
          onChange={onChange}
          value={value}
          className="profile-image__input-image"
        />
      </div>
    );
  }
}

export default translate()(ProfileImage);
