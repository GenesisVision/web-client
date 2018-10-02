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
  };

  render() {
    const { onChange } = this;
    const { value } = this.state;
    const { t } = this.props;

    return (
      <div className="profile-image-container">
        <h3>{t("profile.settings.profile-image")}</h3>

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
