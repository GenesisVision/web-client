import React, { useEffect } from "react";
import { FieldError, useFormContext } from "react-hook-form";

const getErrorMessage = (obj: FieldError) =>
  "message" in obj ? obj.message : obj;

export const GVHookFormField: React.FC<GVHookFormFieldProps> = ({
  onChange = () => {},
  component: Component,
  name,
  ...props
}) => {
  const {
    unregister,
    triggerValidation,
    setValue,
    watch,
    formState: { touched },
    errors,
    register
  } = useFormContext();
  const error = errors[name]
    ? Array.isArray(errors[name])
      ? getErrorMessage((errors[name] as FieldError[])[0])
      : getErrorMessage(errors[name] as FieldError)
    : undefined;
  useEffect(() => {
    register({ name });
    return () => unregister(name);
  }, [register]);
  return (
    <Component
      {...props}
      onChange={onChange}
      triggerValidation={triggerValidation}
      name={name}
      setFieldValue={setValue}
      value={watch()[name]}
      touched={!!touched[name]}
      error={error}
    />
  );
};

interface GVHookFormFieldProps {
  component: React.ComponentType<any>;
  name: string;
  [key: string]: any;
}
