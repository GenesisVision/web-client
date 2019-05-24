import * as React from "react";
import GVTextField from "shared/components/gv-text-field";

const SocialLinkView: React.FC<OwnProps> = ({ name, url, value, onClick }) => {
  if (value)
    return (
      <div onClick={onClick}>
        <GVTextField
          adornmentClassName="social-input__adornment"
          labelClassName="social-input__label"
          inputClassName="social-input__input"
          type="text"
          name={name}
          label={name}
          value={value}
          adornment={url}
          adornmentPosition="start"
        />
      </div>
    );
  return (
    <div onClick={onClick}>
      <GVTextField
        adornmentClassName="social-input__adornment"
        labelClassName="social-input__label"
        inputClassName="social-input__input"
        type="text"
        name={name}
        label={name}
        disabled
      />
    </div>
  );
};

export default SocialLinkView;

interface OwnProps {
  name: string;
  url: string;
  value: string;
  onClick(): void;
}
