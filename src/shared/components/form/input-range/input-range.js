import React from "react";

const InputRange = ({ touched, error, name, ...props }) => {
  const showError = touched && error;

  return (
    <div>
      <input type="range" name={name} list={`${name}-ticks`} {...props} />
      <datalist id={`${name}-ticks`}>
        <option value="0" label="0" />
        <option value="30" />
        <option value="70" />
        <option value="100" label="100" />
      </datalist>

      {showError && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputRange;
