import React, { useEffect } from "react";
import { FieldError, useFormContext } from "react-hook-form";

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
      ? (errors[name] as FieldError[])[0].message
      : (errors[name] as FieldError).message
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
