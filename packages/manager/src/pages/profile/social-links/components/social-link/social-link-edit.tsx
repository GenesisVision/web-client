import * as React from "react";
import GVButton from "shared/components/gv-button";
import GVTextField from "shared/components/gv-text-field";

const SocialLinkEdit: React.FC<OwnProps> = ({
  id,
  name,
  value,
  url,
  onSubmit
}) => {
  const [isButtonsVisible, setVisible] = React.useState(false);
  const [localValue, setValue] = React.useState(value);
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmitClick();
  };
  const handleSubmitClick = () => {
    setVisible(false);
    onSubmit(id, localValue);
  };
  const handleCancelClick = () => {
    setVisible(false);
    setValue(value);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      {/* 
      //@ts-ignore */}
      <GVTextField
        adornmentClassName="social-input__adornment"
        labelClassName="social-input__label"
        type="text"
        name={name}
        label={name}
        value={localValue}
        adornment={localValue || isButtonsVisible ? url : ""}
        adornmentPosition="start"
        onClick={() => {
          if (!isButtonsVisible) setVisible(!isButtonsVisible);
        }}
        onChange={e => {
          setValue(e.target.value);
        }}
        autocomplete="off"
      />
      {isButtonsVisible && (
        <div>
          <GVButton className="social-button" onClick={handleSubmitClick}>
            Save
          </GVButton>
          <GVButton
            color="secondary"
            variant="outlined"
            onClick={handleCancelClick}
          >
            Cancel
          </GVButton>
        </div>
      )}
    </form>
  );
};

export default SocialLinkEdit;

interface OwnProps {
  id: string;
  name: string;
  value: string;
  url: string;
  onSubmit(id: string, value: string): void;
}
