import React from "react";
import { FieldError, useFormContext } from "react-hook-form";

export const GVHookFormField: React.FC<GVHookFormFieldProps> = ({
  component: Component,
  name,
  ...props
}) => {
  const {
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
  return (
    <Component
      {...props}
      name={name}
      setFieldValue={setValue}
      value={watch()[name]}
      touched={!!touched[name]}
      error={error}
      refProp={register({
        name,
        type: "custom"
      })}
    />
  );
};

interface GVHookFormFieldProps {
  component: React.ComponentType<any>;
  name: string;
  [key: string]: any;
}
