import * as React from "react";

interface IInputImageDefaultProps {
  defaultImage: any;
}

const InputImageDefault: React.FC<IInputImageDefaultProps> = ({
  defaultImage
}) => {
  if (defaultImage.type === "svg") return defaultImage;
  else
    return (
      <span
        className="input-image__preview-img"
        style={{
          backgroundImage: `url(${defaultImage})`
        }}
      />
    );
};

export default InputImageDefault;
