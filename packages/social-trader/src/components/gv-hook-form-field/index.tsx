import React from "react";
import { FieldError } from "react-hook-form";
import { FormContextValues } from "react-hook-form/dist/contextTypes";

export const GVHookFormField: React.FC<GVHookFormFieldProps> = ({
  component: Component,
  form: {
    setValue,
    triggerValidation,
    watch,
    formState: { touched },
    errors,
    register
  },
  name,
  ...props
}) => {
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
      triggerValidation={triggerValidation}
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
  form: FormContextValues<any>;
  component: React.ComponentType<any>;
  name: string;
  [key: string]: any;
}
