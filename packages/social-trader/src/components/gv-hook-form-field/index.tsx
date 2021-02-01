import React, { useEffect, useState } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { AnyObjectType } from "utils/types";

const getErrorMessage = (obj: FieldError) =>
  "message" in obj ? obj.message : obj;

export const GVHookFormField: React.FC<GVHookFormFieldProps> = ({
  rules,
  disabled,
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
    formState: { touched, isSubmitting },
    errors,
    register
  } = useFormContext();
  const [error, setError] = useState<any>();
  useEffect(() => {
    const error = errors[name]
      ? Array.isArray(errors[name])
        ? getErrorMessage((errors[name] as FieldError[])[0])
        : getErrorMessage(errors[name] as FieldError)
      : undefined;
    setError(error);
  }, [errors[name], errors, JSON.parse(JSON.stringify(errors))]);
  useEffect(() => {
    register({ name }, rules);
    return () => unregister(name);
  }, [register]);
  return (
    <Component
      {...props}
      disabled={isSubmitting || disabled}
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
  rules?: AnyObjectType;
  [key: string]: any;
}
