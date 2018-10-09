import "./profile-image.scss";

import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import UserIcon from "shared/media/user-avatar.svg";

import ProfileInputImage from "./profile-input-image/profile-input-image";

class ProfileImage extends Component {
  state = {
    value: {
      src: "",
      isNew: false,
      isDefault: false,
      isImageChanged: false
    },
    isSubmitting: false
  };

  constructor(props) {
    super(props);
    this.state.value.src = props.avatar;
  }

  onChange = (name, value) => {
    this.setState({ value: { ...value } });
  };

  onSubmit = () => {
    this.setState({ isSubmitting: true }, () =>
      this.props.handleSubmit(this.state.value.cropped, this.submitCallback)
    );
  };

  submitCallback = imageSrc => {
    this.setState({
      isSubmitting: false,
      value: {
        ...this.state.value,
        isImageChanged: false,
        isNew: false,
        src: imageSrc
      }
    });
  };

  get isSubmitDisabled() {
    const { value, isSubmitting } = this.state;
    const { avatar } = this.props;

    if (isSubmitting) return true;
    if (!value.isImageChanged) return true;
    if (!value.cropped && !avatar) return true;

    return false;
  }

  render() {
    const { onChange, onClear, onSubmit, isSubmitDisabled } = this;
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

        <ProfileInputImage
          defaultImage={UserIcon}
          onChange={onChange}
          onClear={onClear}
          value={value}
          className="profile-image__input-image"
        />

        <GVButton
          color="primary"
          variant="outlined"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="profile-image__submit-btn"
        >
          {t("profile.settings.save-photo")}
        </GVButton>
      </div>
    );
  }
}

export default translate()(ProfileImage);
